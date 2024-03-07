import React, { useEffect, useState } from 'react'
import server from '../Server/Server';
import Game from './Game'
import Hourglass from '../Images/hour glass .png'
import { UserData } from '../Types/Type';

function GameArea({userData}:{userData:UserData}) {
  const [randomNum, setRandomNum] = useState<number|undefined>(undefined); 
  const [time,setTime] = useState(0)

  useEffect(() => {
    if (userData.roomId) {
      server.emit('start-timer', userData.roomId);
    }
  }, [userData.roomId]);


  // useEffect to fetch randomNumber and Time from backend
  useEffect(()=>{
    // fetch the number from the backend
    const fetchNum = (data:any) => {
      setRandomNum(data);
      console.log("random Number:" + data);
    };
    
    server.on('get-number',fetchNum);

    // Fetch time
    const fetchTime = (data:number) => {
      console.log('time recived by the frontend is : ',data);
      setTime(data);
      // console.log(`Time:${time}`);
    }
    
    server.on('timer',fetchTime);
    
    return () =>{
      server.off('get-number', fetchNum);
      server.off('timer', fetchTime);
    }

  },[])

  // make the backend sends the random number 
  useEffect(() => {
    const emitEvent = () => {
      server.emit('send-number', userData.roomId);
    };  
    emitEvent();  
    const intervalId = setInterval(emitEvent, 10000);  
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  // Temp useEffect for timmer 
  useEffect(()=>{
    console.log(`Time:${time}`);
  },[time])
    


  return (
    <div className="chatroomHomePage bg-[#404040] w-[68%] grid place-items-center text-3xl font-semibold relative">
      {/* hour glass */}

      <div className="absolute inset-5 ">
      <div className="flex justify-center w-28 h-28 ">
        {/* hour div  */}
        <div className="w-[80%]   relative ">
          {/* hour glass css  */}
          <img src={Hourglass} className='w-full h-full bg-cover' />
            {/* time div */}
            <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-20 font-[roboto]">{time}</div>
        </div>
    </div>
      </div>
      {/* backend generated number button */}
      <button className='w-32 h-32 text-white rounded-md backendNumberDiv bg-zinc-900'>{randomNum}</button>
       {/* Housie ticket component */}
        <Game num={randomNum}  userData={userData}  />
    </div>
  )
}

export default GameArea;