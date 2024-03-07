import React from 'react';
import pagenotfound from '../Images/404.png'; // Adjust the path as needed
import { NavLink } from 'react-router-dom';

function Error404() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#5d3323] '>
       <img src={pagenotfound} className='' alt="" />
       <div className="flex flex-col items-center justify-center mt-10 space-y-3 ">
        <h1 className='text-[#1c2d35] font-semibold text-xl '>Page not found </h1>
        <NavLink to={'/'}>
        <button className='bg-[#e3ba88] text-white w-[8rem] rounded-full p-1  capitalize font-sans'>go  home</button>
        </NavLink>
       </div>
    </div>
  )
}

export default Error404;
