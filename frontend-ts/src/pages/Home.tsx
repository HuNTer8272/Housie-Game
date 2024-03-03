import React, { useEffect, useState } from 'react'
import { UserData } from '../Types/Type';
import { NavLink } from 'react-router-dom'
import coin from "../Images/Coin Image.png"
import store from '../Images/Store icon.png'
import soundIcon from "../Images/sound icon.png"
import customizationIcon from '../Images/cistomization icon.png'
import leaderBoardIcon from '../Images/Leaderboard icon.png'
import { TbSettingsFilled } from "react-icons/tb";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import homeImg from '../Images/game background .png';
import Customisation from './Customisation';
import LeaderBoard from '../components/LeaderBoard';
import event1 from "../Images/HALF TIME HUSTLE.jpg"
import event2 from "../Images/DOUBLE- UP DASH.jpg"
import Draggable from 'react-draggable';
import underconsruct from "../Images/undercontruct.png"

interface HomeProps{
    userData:UserData
}

const Home = ({userData}:HomeProps) => {

  const banner: string[] = [event1, event2];
  const [bannerPointer, setBannerPointer] = useState(0);
  const [isDailogueOpen, setIsDailogueOpen] = useState(false);
  
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
      setIsDailogueOpen(!isDailogueOpen)
   } 

    
  return (
    <div className='relative h-screen text-gray-100 '>
    {/* upper section */}
    <div className="absolute w-full bg-blue-300 homeNavbar" >
      {/* user profile */}
      <div className="flex justify-between">
      <div className="flex items-center justify-center h-24 500 w-fit ">
          <div className="flex items-center justify-center h-full space-x-1 border-2 border-t-0 border-b-0 border-l-0 border-[#e3ba88] ">

         <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full profile-border">
            <div className="flex items-center justify-center font-semibold bg-white rounded-full h-11 w-11" style={{ backgroundColor: generateRandomBg() }}>
                {userData.name.charAt(0)}
            </div>
         </div>
         <div className="flex flex-col space-y-[0.5px] ">
             <div className=" h-fit font-semibold w-fit p-[0.1rem] text-[0.8rem] text-[#e3ba88]  capitalize">{userData.name}</div>
             <div className=" w-16 capitalize text-[0.8rem]  h-fit ">soldier</div>
         </div>
          </div>

         {/* points section */}
      <div className="flex h-full ">
           <div className="flex w-full h-full border-2 border-t-0 border-b-0 border-l-0 border-[#e3ba88] ">
              <div className="flex items-center justify-center h-full pl-2 space-x-2 text-xl font-semibold ">
                <h1>100</h1>
              <div className="grid h-full place-items-center">
                 {/* <div className="w-8 h-8 rounded-full bg-amber-400"></div> */}
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
            
            {/* customization */}
            {/* <NavLink to={'/payment'}> */}
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
            {/* </NavLink> */}
            
          </div>
        </div>
        
      <div className="absolute bottom-3 right-3">
      <NavLink to={'/room'}>   
        <div className="w-[18rem] p-2 h-[18rem] overflow-hidden  border-[0.21rem] border-[#e3ba88] hover:border-[#b98d5f]   rounded-md bg-[#5d3323] hover:shadow-md">
           <div className=" h-[80%] flex justify-center items-center ">
            <img src={''} className='w-full h-full bg-[#e3ba88] rounded-md ' alt="" />
            {/* <img src={leaderBoardIcon} className='bg' alt="" /> */}
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
     {/* bottom section */}
    {/* <div className="flex items-center justify-between h-24 p-1 px-3 bg-gray-800 ">
       <button className='flex items-center justify-center w-16 h-16 text-3xl text-white bg-gray-500 rounded-md'>
        <TbSettingsFilled/>
       </button>
       <button className='flex items-center justify-center w-16 h-16 text-3xl text-white bg-gray-500 rounded-md'>
        <HiMiniSpeakerWave/>
       </button>
    </div> */}
  </div>  )
}

export default Home