import React from 'react'
import goldStar from "../Images/gold star.png"
import {TbStarsFilled} from "react-icons/tb";
import {RiStarSFill} from "react-icons/ri";
import { Ranker } from '../Types/Type';

function LeaderBoard({rankers}:{rankers:Ranker[]}) {
  // const rankers = [
  //   {
  //     name: 'Hassaan',
  //     roomId: '1',
  //     uid: 'P0WfTY92dGdXJ8RFAAAB',
  //     score: 100
  //   },
  //   { name: 'XYZ', roomId: '1', uid: 'Pc9VBUh8kwPKA45rAAAL', score: 60 },
  //   { name: 'ABC', roomId: '1', uid: '8ajfG5DprCdo_ZX6AAAH', score: 50 }
  // ];


  return (
    <>
     {rankers.length>1 && (
       <div className="bg-[#404040] w-[68%] flex-col justify-center items-end  text-white font-semibold relative">
              <div className="bg-red-600 bg-transparent h-1/2 w-[50vw] flex justify-center items-center text-xl">
            <h1 className='gameover'>Game Over</h1>
         </div>

       <div className=" w-[50vw] h-[50vh] flex">

         <div className="w-[33.33%] bg-blue-200 bg-transparent  h-full relative">
          {/* user info */}
           <div className="w-32 h-32 rounded-full bg-[#90a3bc] absolute left-[60%] translate-x-[-60%] top-14 flex justify-center items-center ">
             <h1 className='text-[4rem] font-[poppins] uppercase'>{rankers[1].name.slice(0,1)}</h1>
           </div>
           <h1 className='absolute uppercase top-[11.6rem] left-[56%] translate-x-[-56%] font-bold text-2xl'>{rankers[1].name}</h1>
           <h1 className='absolute uppercase top-[13.3rem] left-[55%] translate-x-[-55%] font-semibold text-xl'>{rankers[1].score}</h1>

           {/* trophy stage */}
           <div className="absolute bottom-0 w-[85%] right-0 h-[10rem] bg-[#193d6d] border-black  "></div>
           <div className="absolute w-[88%] borders right-0 rounded-l-sm bottom-[10rem] border border-black h-3 bg-[#0a2445]"></div>
           <div className="w-28 h-28 bg-[#d0d8e3] border-[#90a3bc] border-[10px]  absolute  rounded-full translate-x-[-65%] left-[65%] bottom-[1.5rem] ">
           <div className="w-full h-full  rounded-full border-[3.5px] border-[#9daec4] shadow-sm flex justify-center items-center ">
                      {/* <img src={goldStar} alt="goldStar" className='absolute left-[50%] translate-x-[-50%] top-[43%] translate-y-[-50%] w-40 ' /> */}
                        <RiStarSFill className='text-[#8196b3] text-[2.2rem]'/>
                        <RiStarSFill className='text-[#8196b3] text-[2.2rem]'/>

                </div>
           </div>
            {/* reflection */}
            <div className="bg-[#dce1e6] w-16 rounded-t-md rounded-r-md h-1 absolute bottom-[8.9rem] left-[4rem]"></div>
            <div className="bg-[#dce1e6] h-6  w-1 absolute bottom-[7.5rem] rounded-b-md left-[4rem]"></div>
            <div className="bg-[#dce1e6] h-8  w-1 absolute rounded-full bottom-[4.8rem]  left-[4rem]"></div>

         </div>
         <div className="w-[33.33%]  bg-transparent h-full relative">
           {/* user info */}
           <div className="w-32 h-32 rounded-full bg-[#fbcb21] absolute left-[50%] translate-x-[-50%] top-10 flex justify-center items-center ">
             <h1 className='text-[4rem] font-[poppins] uppercase'>{rankers[0].name.slice(0,1)}</h1>
           </div>
           <h1 className='absolute uppercase top-[10.8rem] left-[50%] translate-x-[-50%] font-bold text-2xl'>{rankers[0].name}</h1>
           <h1 className='absolute uppercase top-[12.8rem] left-[50%] translate-x-[-50%] font-semibold text-xl'>{rankers[0].score}</h1>

           {/*  */}
           <div className="absolute bottom-0 w-full  h-44 bg-[#0a2445] "></div>
           <div className="absolute w-full borders  bottom-44  h-3 bg-[#193d6d]"></div>
           <div className="w-32 h-32 bg-[#feedb5] shadow-md border-[#fbcb21] border-[10px]  absolute  rounded-full translate-x-[-50%] left-[50%] bottom-[1.5rem] ">
                <div className="w-full h-full  rounded-full border-[3.5px] border-[#eda806] relative">
                      <img src={goldStar} alt="goldStar" className='absolute left-[50%] translate-x-[-50%] top-[43%] translate-y-[-50%] w-40 ' />
                </div>
           </div>
           {/* relfection */}
            <div className="bg-[#dce1e6] w-16 rounded-t-md rounded-r-md h-1 absolute bottom-[9.7rem] left-3"></div>
            <div className="bg-[#dce1e6] h-6  w-1 absolute bottom-[8.2rem] rounded-b-md left-3"></div>
            <div className="bg-[#dce1e6] h-8  w-1 absolute rounded-full bottom-[5.5rem]  left-3"></div>
         </div>
         <div className="w-[33.33%] bg-stone-800 bg-transparent h-full relative">
           {/* user info  */}
           <div className="w-32 h-32 rounded-full bg-[#b86f58] absolute left-[35%] translate-x-[-35%] top-20 flex justify-center items-center ">
             <h1 className='text-[4rem] font-[poppins] uppercase'>{rankers[2].name.slice(0,1)}</h1>
           </div>
           <h1 className='absolute uppercase top-[13.3rem] left-[40%] translate-x-[-45%] font-bold text-2xl'>{rankers[2].name}</h1>
           <h1 className='absolute uppercase top-[15rem] left-[40%] translate-x-[-45%] font-semibold text-xl'>{rankers[2].score}</h1>

           {/*  */}
           <div className="absolute bottom-0 w-[80%] left-0 h-[9rem] bg-[#193d6d] "></div>
           <div className="absolute w-[83%] borders left-0 rounded-l-sm bottom-[9rem] border border-black h-3 bg-[#0a2445]"></div>
           <div className="w-24 h-24 bg-[#dcb2a4] border-[#b86f58] border-[10px]  absolute  rounded-full translate-x-[-35%] left-[35%] bottom-[1.5rem] ">
           <div className="w-full h-full  rounded-full border-[3px] border-[#b06950] flex justify-center items-center">
                      {/* <img src={goldStar} alt="goldStar" className='absolute left-[50%] translate-x-[-50%] top-[43%] translate-y-[-50%] w-40 ' /> */}
                      <TbStarsFilled className='text-[#c0765e] text-[2rem]'/>
                </div>
           </div>
           {/* reflection */}
           <div className="bg-[#dce1e6] w-16 rounded-t-md rounded-r-md h-1 absolute bottom-[7.7rem] left-3"></div>
            <div className="bg-[#dce1e6] h-6  w-1 absolute bottom-[6.2rem] rounded-b-md left-3"></div>
            <div className="bg-[#dce1e6] h-6  w-1 absolute rounded-full bottom-[3.9rem]  left-3"></div>

         </div>
       </div>
     </div>
     ) }
    </>
  )
}

export default LeaderBoard