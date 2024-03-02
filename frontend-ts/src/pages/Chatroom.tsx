import React, { useEffect, useState } from 'react';
import server from '../Server/Server';
// import Participant from '../components/Participants';
import Participants from '../components/Participants';
import GameArea from '../components/GameArea';
import LeaderBoard from '../components/LeaderBoard';
import Chat from '../components/Chat';
import { Ranker, UserData } from '../Types/Type';


function Chatroom({ userData }:{userData:UserData}) {
  const [isGameOver,setIsGameOver] = useState(false);
  const [rankers, setRankers] = useState<Ranker[]>([])

  // useEffect for handling top 3 players  
  useEffect(() => {
     const handleShowRankers = (arr:Ranker[]) =>{
        setIsGameOver(true);
        setRankers(arr);        
     } 
     server.on("show-rankers",handleShowRankers);

     return () => {
       server.off('show-rankers',handleShowRankers);
     }
  },[])
 
  // useEffect to handle houise Completed 
  useEffect(() => {
     const handleHousieCompleted = () => {
        server.emit("game-over",userData);
     }

     server.on('housie-completed',handleHousieCompleted);

     return () => {
       server.off('housie-completed',handleHousieCompleted);
     }
  },[]);


  useEffect(() => {
   console.log('userData from chatroom');
   console.log(userData);
  },[userData])
  
  return (
    <div className="flex  h-screen text-[#b5b5b5]">
      {/* participant div */}
      <Participants userData={userData}  />
      {/* Game div */}
      {!isGameOver?(
        <GameArea userData={userData}  />
      ):(
        <LeaderBoard rankers={rankers} />
      )}
      {/* Chat area div */}
       <Chat userData={userData}/>
    </div>
  );
}

export default Chatroom;
