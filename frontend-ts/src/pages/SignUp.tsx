import React,{ChangeEvent,useEffect,useState} from "react";
import { useGoogleLogin,hasGrantedAnyScopeGoogle, GoogleLogin, GoogleCredentialResponse, CodeResponse, TokenResponse } from '@react-oauth/google';
import { NavLink, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import server from "../Server/Server";
import { createCanvas } from 'canvas';
import { v4 as uuidv4 } from 'uuid';
import { BackendStatus, UserState, message } from '../Types/Type';
import { useNavigate } from "react-router-dom";   
import homeBg from '../Images/HB_Bg Final.jpeg.jpg'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

const socket = io('http://localhost:3000');



interface ProfileData extends UserState {
  photoURL:string,
  uid:string,
  rank:string,
  point:number,
}

function SignUp({handleUserDataChange}:{handleUserDataChange:(name:string,value:string) => void}){
    const [userState, SetuserState] = useState<UserState>({ name: "",email:"",password:""});
    const clientId = "911320807195-ss24bj45q43tkav84cctudacmlbti1m9.apps.googleusercontent.com";
    const navigate = useNavigate();
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target ;
    handleUserDataChange(name, value);
    SetuserState({  
      ...userState,
      [name]: value,
    });
  };

  useEffect(() => {
    
    const handleSignUpSuccess = (data: BackendStatus<message>) => {
      console.log('signup completed');
       console.log(data);
       if (data.success) {  
          navigate('/login');
          console.log(data.message);
       }  
    }

    server.on('signup-completed', handleSignUpSuccess);
    
    return () => {
      server.off('signup-completed', handleSignUpSuccess);
    }
}, []);

  const generateRandomColor = () => {
    const letter = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
       color += letter[Math.floor(Math.random() * 16)];      
    }
    return color;
  }
 
  const generateUserProfilePic = ():string => {
    const canvas = createCanvas(200,200);
    const ctx = canvas.getContext('2d');
    
    const backgroundColor = generateRandomColor();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.font = '80px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    ctx.fillText(userState.name.charAt(0), canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
  }

  const handleSignUp = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    e.preventDefault();
    if(userState.email === "" || userState.password === "" || userState.name === ""){
      console.log("Please fill all the fields");
      return 
    }
    try{
      // *Structuring the data before sending it to the backend  
      let userId = uuidv4();
      const profileData:ProfileData = {
         ...userState,
         photoURL:generateUserProfilePic(),
         uid:userId,
         rank:'soldier',
         point:0
      }
      console.log(userId);
      handleUserDataChange('email',userState.email)
      handleUserDataChange('password',userState.password)
      handleUserDataChange('uid',userId.toString())
       server.emit('sign-up',profileData);
       console.log('Sending user data to backend');
    }catch(e){
      console.error((e as Error).message);
    }
  }


  
  

//   const onSuccessGoogleLogin = (tokenResponse: TokenResponse) => {
//     // if (tokenResponse && tokenResponse.credential !== undefined)  {
//         console.log('Login successful:', tokenResponse);

//         // Extract and decode the JWT token
//         const idToken = tokenResponse.credential;
//         const decodedToken: { email: string; name: string; picture: string } = jwtDecode(idToken);
//         console.log(decodedToken)
//         // Access the decoded profile data
//         // let userId = uuidv4();
//         const profileData = {
//             UserId:'',
//             email: decodedToken.email,
//             name: decodedToken.name,
//             picture: decodedToken.picture,
//             // Add other profile data as needed
//         };

//         console.log('Profile data:', profileData);
//         Cookies.set('userEmail', decodedToken.email);
//         console.log(document.cookie)
//         // You can use or store the profile data as needed
//         fetch('http://localhost:3002/storeProfileData', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(profileData),
//         })
//         .then(response => response.json())
//         .then(result => {
//             console.log('ProfileData stored successfully:', result);
//             // You can redirect or perform other actions as needed
//             window.location.href = `/temp`;
//         })
//         .catch(error => {
//             console.error('Failed to store profileData:', error);
//         });
//     }



  const onFailureGoogleLogin = (error:any) => {
    console.error('Login failed:', error);
  };

        // const signIn = useGoogleLogin({
        //     clientId: clientId,
        //     onSuccess: onSuccessGoogleLogin ,
        //     onFailure: onFailureGoogleLogin ,
        //     cookiePolicy: 'single_host_origin',
        // });
    return(
        // <>
        //      <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
        //         <div className="flex flex-col justify-center items-center bg-zinc-500 h-[22rem] rounded">
        //             <div className="flex flex-col p-8 space-y-5">
        //                 <h1 className="text-center">SignUp</h1>
        //                 <div className="flex flex-col items-center justify-center space-y-5">
        //                     <div className="flex flex-row">
        //                             <label htmlFor="name">Name:</label>
        //                             <input 
        //                             className="bg-transparent" 
        //                             name="name" 
        //                             type="text" 
        //                             placeholder="Enter your Name"
        //                             value={userState.name}
        //                             onChange={handleChange}/>
        //                         </div>
        //                         <div className="flex flex-row">
        //                             <label htmlFor="email">Email:</label>
        //                             <input 
        //                             className="bg-transparent" 
        //                             name="email" 
        //                             type="email" 
        //                             placeholder="Enter your email"
        //                             value={userState.email}
        //                             onChange={handleChange}/>
        //                         </div>
        //                         <div className="flex flex-row mt-2">
        //                             <label htmlFor="password">Password:</label>
        //                             <input 
        //                             className="bg-transparent" 
        //                             name="password" 
        //                             type="password" 
        //                             placeholder="Enter your password"
        //                             value={userState.password}
        //                             onChange={handleChange}/>
        //                         </div>
        //                     <button className="bg-purple-500 rounded-full mt-4 w-[100px] text-white p-2" onClick={handleSignUp}>Sign Up</button>
        //                     <p className="mt-4 text-center">Already registered?<NavLink to={"/login"}>Login</NavLink></p>
        //                     {/* <button onClick={signIn}>Sign in with Google</button> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </div> 
        // </>
        // main website 
        <div className="flex items-center justify-center h-screen signupPageDiv bg-stone-700">
           <div className="bg-white w-[50rem] h-[30rem] overflow-auto rounded-md flex z-10 ">
              {/* signup part */}
              <div className="w-1/2 p-3 bg-rose">
                
                <h1 className="mb-[4.5rem] text-xl font-semibold mt-5 font-[roboto] text-center text-[#e3ba88]">Sign Up</h1>
                         <div className="flex flex-col items-center justify-center space-y-5">
                             <div className="relative flex space-x-3 ">
                                 <FaUser className="absolute -translate-y-1/2 top-1/2 left-6 text-[#5d3323] text-[0.8rem]"/>
                                     {/* <label htmlFor="name">Name:</label> */}
                                     <input 
                                     className="bg-[#f6ca6a] placeholder-[#5d3323] font-semibold text-[0.8rem] rounded-full p-1 pl-9 px-5 font-sans outline-[#e3ba88] outline-1" 
                                     name="name" 
                                     type="text" 
                                     placeholder="Enter your Name"
                                     value={userState.name}
                                     onChange={handleChange}/>
                                 </div>
                                 <div className="relative flex space-x-2">
                                     {/* <label htmlFor="email">Email:</label> */}
                                     <MdEmail className="absolute -translate-y-1/2 top-1/2 left-6 text-[#5d3323] text-[0.8rem]"/>
                                     <input 
                                     className="bg-[#f6ca6a] placeholder-[#5d3323] font-semibold text-[0.8rem] rounded-full p-1 pl-9 px-5 font-sans outline-[#e3ba88] outline-1" 
                                     name="email" 
                                     type="email" 
                                     placeholder="Enter your email"
                                     value={userState.email}
                                     onChange={handleChange}/>
                                 </div>
                                 <div className="relative flex space-x-2">
                                     {/* <label htmlFor="password">Password:</label> */}
                                     <PiPasswordBold className="absolute -translate-y-1/2 top-1/2 left-6 text-[#5d3323] text-[0.8rem]"/>

                                     <input 
                                     className="bg-[#f6ca6a]  placeholder-[#5d3323] font-semibold text-[0.8rem] rounded-full p-1 pl-9 px-5 font-sans outline-[#e3ba88] outline-1" 
                                     name="password" 
                                     type="password" 
                                     placeholder="Enter your password"
                                     value={userState.password}
                                     onChange={handleChange}/>
                                 </div>
                              <div className="pt-8">
                             <button className="bg-[#b25b2d] text-[1rem] font-semibold px-5 rounded-full  p-1  text-white " onClick={handleSignUp}>Sign Up</button>

                              </div>
                             <p className="pt-8 font-semibold text-center text-[#d36a10] text-[0.9rem] cursor-pointer hover:text-[#b25b2d] ">Already registered?<NavLink to={"/login"}> Login</NavLink></p>
                        
                             {/* <button onClick={signIn}>Sign in with Google</button> */}
                      </div>
               </div>
              {/* image div */}
              <div className="w-1/2 bg-purple-500">
                  <img src={homeBg} className="w-full h-full bg-cover" alt="signupImage" />
              </div>
           </div>
        </div>
    )
}

export default SignUp;