import React, { useEffect, useState } from 'react';
import server from '../Server/Server';
import type { UserData, Participant } from '../Types/Type'; // Importing Participant as a type only

function Participants({ userData }: { userData: UserData }): JSX.Element {
  const [participants, setParticipants] = useState<Participant[]>([]); // Explicitly declare participants as Participant[]

  useEffect(() => {
    if (userData.roomId) {
      server.emit('get-participants', userData.roomId);
      server.emit('start-timer', userData.roomId);
      // server.emit('send-room-code',userData.roomId)
    }
  }, [userData.roomId]);

  useEffect(() => {
    const fetchParticipants = (data: Participant[]) => {
      // Sort the array based on the score in descending order
      const sortedParticipants = data.sort((a, b) => b.score - a.score);
      setParticipants(sortedParticipants);
    };

    server.on('participants-data', fetchParticipants);

    return () => {
      server.off('participants-data', fetchParticipants);
    };
  }, []);

  // useEffect(() => {
  //   const fetchRoomCode = (data) => {
  //     
  // }
  // },[participants])

  return (
    <div className="bg-[#0a0a0a] w-[12%]">
      <h1 className="bg-[#1c1c1c] text-center p-3 font-semibold -ml-2">
        Participants{' '}
        <span className="bg-[#555555] p-1 px-2 rounded-md ml-2">{participants.length}</span>
      </h1>
      <div className="px-12 mt-5">
        {participants.map((data, index) => (
          <div
            className="relative before:content-[''] before:absolute before:w-2 before:h-2 before:bg-[#0f7e65]  before:top-[50%]  before:translate-y-[-50%] before:-left-3 before:rounded-full"
            key={index}
          >
            <pre>
              {data.uid === userData.uid
                ? data.name + '(You)' + `  ${data.score}`
                : data.name + `  ${data.score}`}{' '}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Participants;
