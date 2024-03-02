import React, { ChangeEvent, useEffect, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import server from '../Server/Server';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { UserData, message } from '../Types/Type';

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
    <div className="bg-[#121212] w-[20%]">
      <div className="h-screen">
        <div className="h-[92%]">
          Chat area
          {receivedMessages.map((msg, index) => (
            <li key={index}>{`${msg.sender}: ${msg.message}`}</li>
          ))}
        </div>
        <div className="bg-zinc-800 h-[8%] flex justify-around items-center relative">
          <div className={`absolute left-0 w-full h-[27rem]   -top-[27rem] overflow-hidden ${isEmojiOpened ? 'block' : 'hidden'}`}>
            <Picker data={data} onEmojiSelect={(e: any) => handleEmojiSelect(e.native)} />
          </div>
          <button onClick={toggleIcon}>
            <HiOutlineEmojiHappy />
          </button>
          <input
            placeholder="Type your message"
            className="outline-none w-[18rem] bg-zinc-700 p-1 rounded-md pl-2"
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
