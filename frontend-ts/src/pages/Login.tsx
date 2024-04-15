import React, { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import server from "../Server/Server";
import { BackendStatus, LoginData, UserState, message } from "../Types/Type";
import { TbServerBolt } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import homeBg from "../Images/HB_Bg Final.jpeg.jpg"
function Login({ handleUserDataChange }:{handleUserDataChange:(name:string,value:string) => void}):JSX.Element {
  const [userState, SetuserState] = useState<{email:string, password:string}>({ email:"",password:""});
  const navigate = useNavigate();


  useEffect(() => {

     const handleLoginCompleted = (data:LoginData) => {
      console.log('login completed');
        if(data.message){
          console.log(data.message);
          navigate('/home');
          handleUserDataChange('uid', data.userData?.userId);
          handleUserDataChange('name', data.userData?.userName);
          handleUserDataChange('point', data.userData?.point.toString());
          handleUserDataChange('rank', data.userData?.rank);
          handleUserDataChange('photoURL', data.userData?.photoURL);

        }  

        console.log(data.message);
     }

     server.on('login-completed',handleLoginCompleted)

    return () => {
      server.off('login-completed',handleLoginCompleted)
    }
  },[])

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target ;
    handleUserDataChange(name, value);
    SetuserState({
      ...userState,
      [name]: value,
    });
  };

  const hanldeLogin = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
      e.preventDefault();
      if(userState.email === '' || userState.password === ''){
        console.log('Please fill all the fields');
        return 
      }
      try{
         server.emit('login',{...userState})
      }catch(e){
        console.error((e as Error).message);
      }
  }

//  const vvisibility = "private";
//  const size = 5;
  
  // const handleJoinRoom = () => {
  //   server.emit("joined-room", { roomId: userState.roomId,visibility:vvisibility,size:size,participant: { ...userState, uid: server.id, score: 0 } });
  //   server.off("joined-room");
  // };
  
  


  return (
    <>
    {/* <div className="flex flex-col items-center justify-center h-screen space-y-5 text-white bg-[#5d3323]">
      <div className="flex flex-col items-center space-y-10 h-[30vh] w-[15vw] bg-slate-500 p-6 rounded">
        <input
          type="text"
          onChange={handleChange}
          className="p-1 pl-2 text-black rounded-md outline-none"
          name="email"
          value={userState.email}
          placeholder="Enter Your Email"
        />
        <input
          type="password"
          onChange={handleChange}
          className="p-1 pl-2 text-black rounded-md outline-none"
          name="password"
          value={userState.password}
          placeholder="Enter Your Password"
        />
          <NavLink to={"/home "}>
            <button
              onClick={hanldeLogin}
              disabled={userState.email === ""}
              className="w-32 py-1 font-medium text-white rounded-full bg-[#edcfae]"
            >
              Login
            </button>
          </NavLink>
      </div>
    </div> */}
            <div className="flex items-center justify-center h-screen signupPageDiv bg-stone-700">
           <div className="bg-white w-[50rem] h-[30rem] overflow-auto rounded-md flex z-10 ">
              {/* signup part */}
              <div className="w-1/2 p-3 bg-rose">
                
                <h1 className="mb-[5rem] text-xl font-semibold mt-5 font-[roboto] text-center text-[#e3ba88]">Login </h1>
                         <div className="flex flex-col items-center justify-center space-y-5">
                                 <div className="relative flex space-x-2">
                                     {/* <label htmlFor="email">Email:</label> */}
                                     <MdEmail className="absolute -translate-y-1/2 top-1/2 left-6 text-[#5d3323] text-[0.8rem]"/>
                                     <input 
                                     className="bg-[#f6ca6a] placeholder-[#5d3323] font-semibold text-[0.8rem]  rounded-full p-1 pl-9 px-5 font-sans outline-[#e3ba88] outline-1  " 
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
                                     className="bg-[#f6ca6a]  placeholder-[#5d3323] font-semibold text-[0.8rem] rounded-full p-1 pl-9 px-5 font-sans outline-[#e3ba88] outline-1  " 
                                     name="password" 
                                     type="password" 
                                     placeholder="Enter your password"
                                     value={userState.password}
                                     onChange={handleChange}/>
                                 </div>
                              <div className="pt-8">
                             <button className="bg-[#b25b2d] text-[1rem] font-semibold px-5 rounded-full  p-1  text-white " onClick={hanldeLogin}>Login</button>

                              </div>
                             <p className="pt-8 font-semibold text-center text-[#d36a10] text-[0.9rem] cursor-pointer hover:text-[#b25b2d] ">Haven't Sign up yet?<NavLink to={"/"}> Sign up</NavLink></p>
                        
                             {/* <button onClick={signIn}>Sign in with Google</button> */}
                      </div>
               </div>
              {/* image div */}
              <div className="w-1/2 bg-purple-500">
                  <img src={homeBg} className="w-full h-full bg-cover" alt="signupImage" />
              </div>
           </div>
        </div>

    </>
  );
}

export default Login;

