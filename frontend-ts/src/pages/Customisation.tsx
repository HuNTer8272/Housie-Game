import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { ProfileData, UserData } from '../Types/Type';
import server from '../Server/Server';


const insertRandomNumbers = (arr:any[], numOfNumbers:number) => {
  const newArray = arr.slice();
  const zeroIndices = newArray.reduce((indices, val, index) => (val === 0 ? [...indices, index] : indices), []);

  // Shuffle the zeroIndices array
  for (let i = zeroIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [zeroIndices[i], zeroIndices[j]] = [zeroIndices[j], zeroIndices[i]];
  }

  const randomNumSet = new Set();

  // Take the first numOfNumbers elements
  const indicesToReplace = zeroIndices.slice(0, numOfNumbers);

  // Replace the selected indices with unique random numbers between 1 and 100
  indicesToReplace.forEach((index:number) => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 100) + 1;
    } while (randomNumSet.has(randomNumber));

    randomNumSet.add(randomNumber);
    newArray[index] = randomNumber;
  });

  return newArray;
};


function Customisation({userData}:{userData:UserData})  {
  const [profileData, setProfileData] = useState<ProfileData | undefined>(undefined);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [font,setFont] = useState('Times Roman');
  const fileInputRef = useRef<HTMLInputElement>(null);

   // array for creating housie tickets 
   const [arr, setArr] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);


  // when the page loads change the arr state to the housie ticket format
  useEffect(() => {
    const updatedArr = arr.map(innerArr => insertRandomNumbers(innerArr, 5));
    console.log(updatedArr);
    setArr(updatedArr);
  }, []);


 
  useEffect(() => {
    const fetchUserData = (data:any) => {
      console.log("seting user data", data);
      setProfileData(data.data);
    };
    server.on("profile-data", fetchUserData);

    server.emit("fetch-profile-data", {
      email: userData?.email,
      userId: userData?.uid,
    });
    return () => {
      server.off("profile-data", fetchUserData);
    };
  }, []);

  const handleDrop = async (e:any) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // const imageUrl = URL.createObjectURL(file);
      const imageUrl = await createImageUrl(file);
      console.log("imageURL", imageUrl);
      setUrl(imageUrl);
      setImage(file);
    }
  };

  const createImageUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const aspectRatio = image.width / image.height;
          const newHeight = image.height;
          const newWidth = newHeight * aspectRatio;
  
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
  
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
            resolve(canvas.toDataURL("image/jpeg"));
          } else {
            reject("Error creating canvas context");
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };


  const handleDragOver = (e:any) => {
    e.preventDefault();
  };

  const handleFileInputChange = async (e:any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // const imageUrl = URL.createObjectURL(file);
      const imageUrl = await createImageUrl(file);
      // console.log(imageUrl);
      setUrl(imageUrl);
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setUrl('');
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e:any) =>{
    setFont(e.target.value);
  }

  const handleSubmit = () => {
    if(image === ''){
      alert("Please upload an image");
      return ;
    }
    console.log(url);
    server.emit("store-customisation", {
      email: profileData?.email,
      userId: profileData?.userId,
      name: profileData?.userName,
      ticketImage: url,
      fontStyle:font
    });

  }

  return (
    <div className="flex items-center relative justify-center py-20 bg-[#5d3323] customisationBg text-gray-50">
      <form className='p-10'>
        {/* Image upload section */}
        {image === '' ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleOpenFileDialog}
            className="bg-[#e3ba88]  flex justify-center space-x-3 items-center  w-[50rem] h-[30rem] rounded-md"
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <IoMdPhotos /> <span className="text-sm">Upload your Image</span>
          </div>
        ) : (
          <div className="relative border-[1px] border-solid border-[#eee] overflow-hidden text-slate-600 flex justify-center space-x-3 items-center w-[30rem] h-[20rem] rounded-md ">
            <div className="absolute w-full h-full ease-in-out duration-200 transition-all cursor-pointer text-white bg-slate-950 opacity-0 hover:opacity-[0.4] flex justify-center items-center">
              <MdModeEditOutline
                onClick={handleRemoveImage}
                className="text-2xl hover:scale-[1.05] ease-in-out duration-150"
              />
            </div>
            <img className="object-cover w-full h-full" src={url} alt="uploadedImage" />
          </div>
        )}
        {/* font div */}
        <div className="flex mt-10 space-x-3">
            <h1 className='text-xl font-semibold'>Font:</h1> 
            <select onChange={handleChange} className='text-[1rem] bg-[#e3ba88] rounded-md p-1 outline-none '>
                 <option value="Times Roman">Times Roman</option>
                 <option value="Calibri">Calibri</option>
                 <option value="Arial">Arial</option>
            </select>
        </div>
        {/* Image preview */} 
        <h1 className='mt-5 text-xl font-semibold'>Preview</h1>
        {image !==""? (
           <div className="relative mt-5 overflow-hidden rounded-md ">
                <img src={url} className='absolute inset-0 w-full h-full bg-cover' alt="preview" />
                <div className="z-10 flex flex-col items-center justify-around p-3 ">
                   <div className="flex my-2 w-fit">
                    {arr[0].map((square,index) => (
                      <div key={index} className={`w-20 h-20 m-1 text-white rounded-md shadow-lg drop-shadow-sm grid place-items-center ${square !== 0 ? "bg-slate-900" : "bg-slate-800"}`} >
                          <pre>{square === 0?"  ":square}</pre>
                      </div>
                    ))}
                    </div>
                   <div className="flex my-2 w-fit ">
                    {arr[1].map((square,index) => (
                      <div key={index} className={`w-20 h-20 m-1 text-white rounded-md shadow-lg drop-shadow-sm grid place-items-center  ${square !== 0 ? "bg-slate-900" : "bg-slate-800"}`} >
                          <pre>{square === 0?"  ":square}</pre>
                      </div>
                    ))}
                    </div>
                   <div className="flex my-2 w-fit ">
                    {arr[2].map((square,index) => (
                      <div key={index} className={`w-20 h-20 m-1 text-white rounded-md shadow-lg drop-shadow-sm grid place-items-center ${square !== 0 ? "bg-slate-900" : "bg-slate-800"}`} >
                          <pre>{square === 0?"  ":square}</pre>
                      </div>
                    ))}
                    </div>
                    
                </div>
           </div>
        ):(
          <div className="bg-[#e3ba88] w-[100vh] h-[25vh] mt-3 mb-3 rounded-md"></div>
        )}
        <button onClick={handleSubmit} className='bg-[#e3ba88] absolute top-0 right-3 px-8 mt-3 p-1  rounded-full'>Save</button>
      </form>
    </div>
  );
}

export default Customisation;
