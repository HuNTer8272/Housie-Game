import React, { useEffect, useRef, useState } from 'react';
import { ProfileData, UserData } from '../Types/Type';
import { NavLink } from 'react-router-dom';
import coin from "../Images/Coin Image.png";
import store from '../Images/Store icon.png';
import soundIcon from "../Images/sound icon.png";
import customizationIcon from '../Images/cistomization icon.png';
import leaderBoardIcon from '../Images/Leaderboard icon.png';
import { TbSettingsFilled } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import homeImg from '../Images/game background .png';
import Customisation from './Customisation';
import LeaderBoard from '../components/LeaderBoard';
import event1 from "../Images/HALF TIME HUSTLE.jpg";
import event2 from "../Images/DOUBLE- UP DASH.jpg";
import Draggable from 'react-draggable';
import underconsruct from "../Images/undercontruct.png";
import roomIcon from "../Images/roomIcon.png";
import data from '@emoji-mart/data';
import server from '../Server/Server';
import charityIcon from "../Images/charity.png";
import { MdModeEditOutline } from 'react-icons/md';
import { IoMdPhotos } from 'react-icons/io';
import { createCanvas } from 'canvas'; 


const Home = ({userData}:{userData:UserData}) => {
  const [profileData,setProfileData] = useState<ProfileData|undefined>();

  useEffect(() =>{
    const fetchUserData = (data) =>{
      console.log('seting user data',data);
      setProfileData(data.data);
    };
    server.on('profile-data',fetchUserData);

    server.emit('fetch-profile-data',{email:userData.email,userId:userData.uid});
    return () => {
      server.off('profile-data',fetchUserData);
    };
  },[]);

  const banner: string[] = [event1, event2];
  const [bannerPointer, setBannerPointer] = useState(0);
  const [isDailogueOpen, setIsDailogueOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName,setUserName] = useState('');

  const generateRandomBg = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerPointer((prevPointer) => (prevPointer + 1) % banner.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banner.length]);

  const handleToggleDialogue = () => {
    setIsDailogueOpen(!isDailogueOpen);
  };

  const handleToggleChangeProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      console.log("imageURL",imageUrl);
      setUrl(imageUrl);
      setImage(file);
    }
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
  };

  const handleFileInputChange = async(e:any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = await createImageUrl(file);
      console.log("imageURL",imageUrl);
      setUrl(imageUrl);
      setImage(file);
    }
  };
  const createImageUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image: any = new Image(); // Create an Image object using the canvas library's Image class
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = createCanvas(image.width, image.height);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(image, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
          } else {
            reject("Error creating canvas context");
          }
        };
      };
      reader.readAsDataURL(file);
    });
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

  const handleProfileChange = () =>{
    if(userName === ''){
      console.log('username is null');
      return;
    }
    console.log({email:userData.email,userId:userData.uid,name:userName,photoURL:url});
    server.emit('change-profile',{email:userData.email,userId:userData.uid,name:userName,photoURL:url});
    
  }

  useEffect(() => {
    console.log("profileData",profileData);
  },[profileData])

  return (
    <div className='relative h-screen text-gray-100 '>
      {/* upper section */}
      <div className="absolute w-full bg-blue-300 homeNavbar" >
        {/* user profile */}
        <div className="flex justify-between">
          <div className="flex items-center justify-center h-24 500 w-fit ">
            <div className="flex items-center justify-center h-full space-x-1 border-2 border-t-0 border-b-0 border-l-0 border-[#e3ba88] ">
              <div onClick={handleToggleChangeProfile} className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full profile-border">
                <div className="flex items-center justify-center overflow-hidden bg-white bg-cover rounded-full h-11 w-11 " >
                  {/* {profileData?.userName.charAt(0) || userData?.name.charAt(0)} */}
                  <img src={profileData?.photoURL } className='w-full h-full bg-white bg-cover ' alt="" />
                </div>
              </div>
              <div className="flex flex-col space-y-[0.5px] ">
                <div className=" h-fit font-semibold w-fit p-[0.1rem] text-[0.8rem] text-[#e3ba88]  capitalize">{profileData?.userName }</div>
                <div className=" w-16 capitalize text-[0.8rem]  h-fit ">{profileData?.rank }</div>
              </div>
            </div>
            {/* points section */}
            <div className="flex h-full ">
              <div className="flex w-full h-full border-2 border-t-0 border-b-0 border-l-0 border-[#e3ba88] ">
                <div className="flex items-center justify-center h-full pl-2 space-x-2 text-xl font-semibold ">
                  <h1>{profileData?.point }</h1>
                  <div className="grid h-full place-items-center">
                    <img src={coin} className='w-10 h-10 bg-cover' alt="coin" />
                  </div>
                </div>  
                <div className="flex items-center justify-center pr-3 text-2xl font-semibold ">
                  +
                </div>
              </div>
            </div>
          </div>
          <div onClick={handleToggleDialogue} className="flex items-center justify-center p-2">
            <button className='flex items-center justify-center w-12 h-12 text-2xl text-[#e3ba88] rounded-md bg-[#5d3323]'>
              <TbSettingsFilled/>
            </button>
          </div>
        </div>
      </div>
      {/* main section */}
      <div className="homeImgArea  h-[calc(100%)] pt-28 ">
        {/* room div */}
        <div className="h-[calc(100%)] relative  p-3">
          {/* dialogue */}
          {isDailogueOpen && (
            <Draggable>
              <div className="bg-[#5d3323] overflow-hidden absolute top-[30%] left-[40%] cursor-grab -translate-x-1/2 -translate-y-1/2 rounded-md w-[26rem] h-[25rem]">
                {/* upper section */}
                <div className="bg-[#e3ba88] p-1 flex justify-end">
                  <div className="w-6 h-6 font-semibold text-[0.8rem] flex justify-center mr-3 items-center cursor-pointer text-[#e3ba88] bg-[#5d3323] rounded-full">
                    <button onClick={handleToggleDialogue}>X</button>
                  </div>
                </div>
                {/* lower section */}
                <div className=" h-[calc(100%-1.5rem)] flex justify-center items-center">
                  <div className=" w-[90%] flex flex-col justify-center items-center space-y-3 ">
                    <img src={underconsruct} alt="" />
                    <h1 className='font-semibold text-[#e3ba88]'>This section is under construction</h1>
                  </div>
                </div>
              </div>
            </Draggable>
          )}
          {isProfileOpen && (
            <Draggable>
              <div className="bg-[#5d3323] overflow-hidden absolute top-[30%] left-[40%] cursor-grab -translate-x-1/2 -translate-y-1/2 rounded-md w-[26rem] h-[25rem]">
                {/* upper section */}
                <div className="bg-[#e3ba88] p-1 flex justify-end ">
                  <div className="w-6 h-6 font-semibold text-[0.8rem] flex justify-center mr-3 items-center cursor-pointer text-[#e3ba88] bg-[#5d3323] rounded-full">
                    <button onClick={handleToggleChangeProfile}>X</button>
                  </div>
                </div>
                {/* lower section */}
                <div className=" h-[calc(100%-1.5rem)] flex justify-center items-center   ">
                  {/* image div  */}
                  <div className=" w-[20rem] h-[20rem] flex-col flex justify-center items-center ">
                    {image === '' ?(          
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleOpenFileDialog}
                        className="flex flex-col items-center justify-center rounded-full w-28 h-28 bg-[#e3ba88] border-dashed border-2 border-[#5d3323] ">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                        />
                        <IoMdPhotos /> 
                      </div>
                    ):(
                      <div className="relative flex items-center justify-center overflow-hidden rounded-full w-28 h-28 bg-slate-300">
                        <div className="absolute w-full h-full ease-in-out duration-200 transition-all cursor-pointer text-white bg-slate-950 opacity-0 hover:opacity-[0.4] flex justify-center items-center">
                          <MdModeEditOutline
                            onClick={handleRemoveImage}
                            className="text-2xl hover:scale-[1.05] ease-in-out duration-150"
                          />
                        </div>
                        <img src={url} alt="" />
                      </div>          
                    )}
                    <div className="flex flex-col items-center justify-center mt-8 space-y-3" >
                      <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder='Enter your Name ' className='rounded-full outline-none placeholder-gray-50 bg-[#e3ba88] font-semibold text-[0.9rem]  pl-5 p-[0.2rem]  w-[10rem]' />
                      <button onClick={handleProfileChange} className='bg-[#9b5d2c] rounded-full w-24 font-semibold text-[0.8rem] p-1'>Confirm</button>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          )}
          {/* banner */}
          <div className="bg-slate-800 w-[30rem] h-[15rem] rounded-md overflow-hidden ">
            <img src={banner[bannerPointer]} alt="events" className='w-full h-full bg-cover' />
          </div>
          {/* icons */}
          <div className=" w-[30rem] h-[calc(100%-15rem)] mt-1  p-2 py-5">
            <div className="flex flex-col space-y-3">
              {/* customization */}
              <NavLink to={'/custom'}>
                <div className="flex items-center space-x-2 font-semibold w-[18rem] rounded-md overflow-hidden bg-[#5d3323]">
                  {/* icon div */}
                  <div className="w-[8rem] h-[6rem] bg-[#e3ba88]">
                    <img src={customizationIcon} className='w-full h-full bg-cover' />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center text-[0.8rem] ">
                    <h1 className='text-[#e3ba88]'>Customization</h1>
                    <p>Customize your ticket here</p>
                  </div>
                </div>
              </NavLink>
              {/* leaderbaord */}
              <div onClick={handleToggleDialogue} className="flex items-center space-x-2 font-semibold w-[18rem] rounded-md overflow-hidden bg-[#5d3323]">
                {/* icon div */}
                <div className="w-[8rem] h-[6rem] bg-[#e3ba88]">
                  <img src={leaderBoardIcon} className='w-full h-full bg-cover' />
                </div>
                <div className="flex flex-col space-y-1 justify-center text-[0.8rem] ">
                  <h1 className='text-[#e3ba88]'>LeaderBoard</h1>
                  <p>See your ranking here</p>
                </div>
              </div>
              <div onClick={() => handleToggleDialogue()} className="flex items-center space-x-2 font-semibold w-[18rem] rounded-md overflow-hidden bg-[#5d3323]">
                {/* icon div */}
                <div className="w-[8rem] h-[6rem] bg-[#e3ba88]">
                  <img src={store} className='w-full h-full bg-cover' />
                </div>
                <div className="flex flex-col space-y-1 justify-center text-[0.8rem] ">
                  <h1 className='text-[#e3ba88]'>Store</h1>
                  <p>Make  purchases here</p>
                </div>
              </div>
              <div onClick={() => handleToggleDialogue()} className="flex items-center space-x-2 font-semibold w-[18rem] rounded-md overflow-hidden bg-[#5d3323]">
                {/* icon div */}
                <div className="w-[8rem] h-[6rem] bg-[#e3ba88]">
                  <img src={charityIcon} className='w-full h-full bg-cover' />
                </div>
                <div className="flex flex-col space-y-1 justify-center text-[0.8rem] ">
                  <h1 className='text-[#e3ba88]'>Charity</h1>
                  <p>Charity Page</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3">
            <NavLink to={'/room'}>   
              <div className="w-[18rem] p-2 h-[18rem] overflow-hidden  border-[0.21rem] border-[#e3ba88] hover:border-[#b98d5f]   rounded-md bg-[#5d3323] hover:shadow-md">
                <div className=" h-[80%] flex justify-center items-center bg-[#e3ba88] rounded-md p-4 ">
                  <img src={roomIcon} className='w-full bg-cover ' alt="" />
                </div>
                <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
                  <h1 className='text-[1rem] font-semibold font-[roboto] capitalize text-[#e3ba88] '>rooms</h1>
                  <h1 className='text-[0.9rem] '>create or join rooms</h1>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Home;
