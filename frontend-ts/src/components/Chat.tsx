import React, { ChangeEvent, useEffect, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import server from '../Server/Server';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { UserData, message, JoinRoomData } from '../Types/Type';

function Chat({ userData }: { userData: UserData }) {
  const [receivedMessages, setReceivedMessages] = useState<message[]>([]);
  const [message, setMessage] = useState('');
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);

  useEffect(() => {
    const fetchMessage = (msg: message) => {
      setReceivedMessages((prev) => [...prev, msg]);
    };

    server.on('receive-message', fetchMessage);

    return () => {
      server.off('receive-message', fetchMessage);
    };
  }, []);

  const handleSendMessage = (message: string) => {
    if (userData.participant && userData.participant.name) {
      server.emit('send-message', {
        name: userData.participant?.name,
        roomId: userData.roomId,
        message: message,
        uid: userData.uid,
      });
    }
  };

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji);
  };

  const toggleIcon = () => {
    setIsEmojiOpened((prev) => !prev);
  };

  useEffect(() => {
    console.log('Received Message');
    console.log(receivedMessages);
  }, [receivedMessages]);

 
  return (
    <div className="bg-[#ffdc9b] text-gray-50  w-[20%]">
      <div className="h-screen">
        <div className="h-[92%]">
         <div className="flex flex-col h-full p-3 overflow-hidden overflow-y-scroll chatArea">

          {receivedMessages.map((msg, index) => (
            <div key={index} className={`bg-[#5d3323] flex flex-col space-y-[1px] p-2 px-4 rounded-md font-normal h-fit ${msg.id === userData.uid?'self-end':'self-start'}`}>
               <h1 className='text-[0.8rem] font-semibold text-[#e3ba88]'>{msg.sender}</h1>
              <p className='text-[0.8rem]'>{msg.message}</p>
              </div>
            ))}
           </div>
        </div>
        <div className="bg-[#5d3323] h-[8%] flex justify-around items-center relative">
          <div className={`absolute left-0 w-full h-[27rem]   -top-[27rem] overflow-hidden ${isEmojiOpened ? 'block' : 'hidden'}`}>
            <Picker data={data} onEmojiSelect={(e: any) => handleEmojiSelect(e.native)} />
          </div>
          <button onClick={toggleIcon}>
            <HiOutlineEmojiHappy className='text-[#e3ba88] text-xl' />
          </button>
          <input
            placeholder="Type your message"
            className="outline-none w-[18rem] bg-[#e3ba88] text-gray-50 placeholder-gray-50 p-1 rounded-md pl-2"
            onChange={handleMessage}
            value={message}
            onFocus={() => setIsEmojiOpened(false)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(message);
                setMessage('');
              }
            }}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
