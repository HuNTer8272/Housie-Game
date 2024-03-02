import React from 'react'
import { UserData } from '../Types/Type';
import { NavLink } from 'react-router-dom'
import coin from "../Images/Coin Image.png"
import store from '../Images/Store icon.png'
import soundIcon from "../Images/sound icon.png"
import customizationIcon from '../Images/cistomization icon.png'
import leaderBoardIcon from '../Images/Leaderboard icon.png'
import { TbSettingsFilled } from "react-icons/tb";
import { HiMiniSpeakerWave } from "react-icons/hi2";


interface HomeProps{
    userData:UserData
}

const Home = ({userData}:HomeProps) => {
  
    const generateRandomBg = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
    
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

  return (
    <div className='h-screen text-gray-100 '>
    {/* upper section */}
    <div className="relative flex justify-between bg-blue-300 homeNavbar " >
      {/* user profile */}
      <div className="flex items-center justify-center h-24 p-2 space-x-2 500 w-fit ">
         <div className="flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full profile-border">
            <div className="flex items-center justify-center font-semibold bg-white rounded-full h-11 w-11" style={{ backgroundColor: generateRandomBg() }}>
                {userData.name.charAt(0)}
            </div>
         </div>
         <div className="flex flex-col space-y-1 ">
             <div className="bg-gray-800 h-fits font-semibold w-fit p-[0.1rem] text-[0.8rem] px-[0.5rem]">{userData.name}</div>
             <div className="w-16 h-3 bg-gray-700"></div>
         </div>
      </div>
      {/* points section */}
      <div className="w-32 bg-slate-800">
           <div className="flex w-full h-full ">
             <div className="flex items-center justify-center h-full px-3 text-2xl bg-green-500 w-7">
                 +
              </div> 
              <div className="h-full  flex justify-center items-center  space-x-2  w-[78%] text-xl font-semibold">
                <h1>100</h1>
              <div className="grid h-full place-items-center">
                 {/* <div className="w-8 h-8 rounded-full bg-amber-400"></div> */}
                  <img src={coin} className='w-10 h-10 bg-cover' alt="coin" />
              </div>
              </div>  
               
           </div>
      </div>
    </div>
    {/* main section */}
    <div className="bg-slate-500 h-[calc(100%-12rem)] flex items-center justify-center px-10 space-x-10">
        <NavLink to={'/room'}>   
        <div className="w-[18rem] h-[18rem] overflow-hidden  border-[0.21rem] border-[#8fa4c0] hover:border-[#ffc640]   rounded-md bg-[#010133] hover:shadow-md">
           <div className=" h-[80%] p-2">
            <img src={''} className='w-full h-full bg-[#80809c] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
           </div>
           <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
             <h1 className='text-[1.1rem] font-semibold font-[roboto] capitalize'>rooms</h1>
             <h1 className='text-[0.9rem] '>create or join rooms</h1>
           </div>
        </div>
        </NavLink>
        <div className="w-[18rem] h-[18rem] overflow-hidden  border-[0.21rem] border-[#8fa4c0] hover:border-[#ffc640]   rounded-md bg-[#010133] hover:shadow-md">
           <div className=" h-[80%] p-2">
            <img src={''} className='w-full h-full bg-[#eff5ad] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
           </div>
           <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
             <h1 className='text-[1.1rem] font-semibold font-[roboto] capitalize'>Events</h1>
             <h1 className='text-[0.9rem] '>See all the events here</h1>
           </div>
        </div>
        <NavLink to={'/custom'}>
        <div className="w-[18rem] h-[18rem] overflow-hidden  border-[0.21rem] border-[#8fa4c0] hover:border-[#ffc640]   rounded-md bg-[#010133] hover:shadow-md">
           <div className=" h-[80%] p-2">
            <img src={customizationIcon} className='w-full h-full bg-[#d38f44] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
           </div>
           <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
             <h1 className='text-[1.1rem] font-semibold font-[roboto] capitalize'>Customisation</h1>
             <h1 className='text-[0.9rem] '>customise your ticket here</h1>
           </div>
        </div>
        </NavLink>
        {/* <NavLink to={'/scoreboard'}> */}
        <div className="w-[18rem] h-[18rem] overflow-hidden  border-[0.21rem] border-[#8fa4c0] hover:border-[#ffc640]   rounded-md bg-[#010133] hover:shadow-md">
           <div className=" h-[80%] p-2">
            <img src={leaderBoardIcon} className='w-full h-full bg-[#efe2ab] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
           </div>
           <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
             <h1 className='text-[1.1rem] font-semibold font-[roboto] capitalize'>Leaderboard</h1>
             <h1 className='text-[0.9rem] '>See your ranking</h1>
           </div>
        </div>
        {/* </NavLink> */}
        <NavLink to={'/payment'}>
        <div className="w-[18rem] h-[18rem] overflow-hidden  border-[0.21rem] border-[#8fa4c0] hover:border-[#ffc640]   rounded-md bg-[#010133] hover:shadow-md">
           <div className=" h-[80%] p-2">
            <img src={store} className='w-full h-full bg-[#616798] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
           </div>
           <div className=" h-[calc(100%-79%)] flex flex-col justify-center items-center py-3 space-y- ">
             <h1 className='text-[1.1rem] font-semibold font-[roboto] capitalize'>Store</h1>
             <h1 className='text-[0.9rem] '>make in game purchases here</h1>
           </div>
        </div>
        </NavLink>
      </div>
     {/* bottom section */}
    <div className="flex items-center justify-between h-24 p-1 px-3 bg-gray-800 ">
       <button className='flex items-center justify-center w-16 h-16 text-3xl text-white bg-gray-500 rounded-md'>
        <TbSettingsFilled/>
       </button>
       <button className='flex items-center justify-center w-16 h-16 text-3xl text-white bg-gray-500 rounded-md'>
        <HiMiniSpeakerWave/>
       </button>
    </div>
  </div>  )
}

export default Home