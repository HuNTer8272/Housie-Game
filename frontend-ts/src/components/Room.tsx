import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import server from "../Server/Server";
import Draggable from "react-draggable";
import { NavLink } from "react-router-dom";
import { RiFileCopyFill } from "react-icons/ri";
import { JoinRoomData, Participant, Rooms, UserData } from "../Types/Type";
import { SetStateAction } from "jotai";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Socket } from "dgram";
import noChat from "../Images/chat empty.png"

function Room({
  userData,
  setUserData,
}: {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}) {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [joinRoomData, setJoinRoomData] = useState<any>({
    roomId: "",
    visibility: "public",
    roomName: "",
    size: 5,
    code: "",
  });
  const [currentRoomParticipants, setCurrentRoomParticipants] = useState<
    Participant[]
  >([]);
  const [participants, setParticipants] = useState<Rooms[]>([]);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [joinRoomCode, setJoinRoomCode] = useState({
    roomId: "",
    code: "",
    roomName: "",
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchCurrentRoomParticipant = (data: Participant[]) => {
      setCurrentRoomParticipants(data);
    };

    server.on("participants-data", fetchCurrentRoomParticipant);

    const fetchAllRooms = (data: Rooms[]) => {
      setParticipants(data);
    };

    server.on("send-all-rooms", fetchAllRooms);

    server.emit("get-all-rooms");

    const handleCode = (code: string) => {
      console.log("room code: ", code);
      setJoinRoomData({
        ...joinRoomData,
        code: code,
      });
    };

    server.on("send-code", handleCode);

    
    const handleGameJoin = () =>{
        navigate('/chatroom')
    }
    
    server.on('game-join',handleGameJoin)

    return () => {
      server.off("participants-data", fetchCurrentRoomParticipant);
      server.off("send-all-rooms", fetchAllRooms);
    };
  }, []);

  const handleToggle = () => {
    setIsCreateRoomOpen(!isCreateRoomOpen);
  };

  const handleJoinToggle = () => {
    setIsJoinOpen(!isJoinOpen);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVisibility(e.target.value);
  };

  const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinRoomData({
      ...joinRoomData,
      roomName: e.target.value,
    });
  };

  const handleJoin = (roomId: string, visibility: string, roomName: string) => {
    if (visibility === "private") {
      handleJoinToggle();
      setJoinRoomCode({
        ...joinRoomCode,
        roomId: roomId,
        roomName: roomName,
      });
      return;
    }

    const data = {
      roomId: roomId,
      visibility: visibility,
      roomName: roomName,
      participant: {
        name: userData.name,
        uid: userData.uid,
        roomId: roomId,
        score: 0,
      },
    };

    server.emit("joined-room", data);
    fetchParticipant(roomId);
    setUserData({
      ...userData,
      ...data,
    });
    handleToggle();
  };

  const handlePrivateJoin = () => {
    console.log("private join");
    console.log(joinRoomCode);
    const data = {
      roomId: joinRoomCode.roomId,
      visibility: "private",
      roomName: joinRoomCode.roomName,
      size: joinRoomData.size,
      code: joinRoomCode.code,
      participant: {
        name: userData.name,
        uid: userData.uid,
        roomId: joinRoomCode.roomId,
        score: 0,
      },
    };

    server.emit("joined-room", data);
    fetchParticipant(joinRoomCode.roomId);
    setUserData({
      ...userData,
      ...data,
    });
    handleJoinToggle();
    handleToggle();
  };

  const handleCreateRoom = () => {
    console.log("executing the create room code");
    const roomId = uuidv4();
    const data = {
      roomId: roomId,
      roomName: joinRoomData.roomName,
      size: joinRoomData.size,
      visibility: visibility,
      participant: {
        name: userData.name,
        uid: userData.uid,
        roomId: roomId,
        score: 0,
      },
    };

    server.emit("joined-room", data);
    fetchParticipant(roomId);
    setUserData({
      ...userData,
      ...data,
    });
  };

  const fetchParticipant = (roomId: string) => {
    server.emit("get-participants", roomId);
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinRoomCode({
      ...joinRoomCode,
      code: e.target.value,
    });
  };

  const generateRandomBg = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCopy = (code: string) => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code);
        alert("Copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
        alert("Failed to copy to clipboard!");
      }
    };
    copyToClipboard();
  };

  const handleSizeChange = (size: number) => {
    setJoinRoomData({
      ...joinRoomData,
      size: size,
    });
  };

  const handleStartGame = (roomId:string) => {
    console.log('emiting the start-game event');
    server.emit('start-game',roomId);
  }

  useEffect(() => {
    console.log(participants);
  }, [participants]);

  useEffect(() => {
    console.log(currentRoomParticipants);
  }, [currentRoomParticipants]);


  return (
    <div className="relative h-screen bg-[#edcfae]">
      <div className="  absolute bottom-0 left-[51%] rounded-t-md translate-x-[-50%]   h-[calc(100%-12rem)] w-[80vw] ">
        <div className="relative w-full h-full rounded-t-md ">
          {/*chatroom  pop up */}
          <Draggable>
            <div
              className={`bg-gray-100 cursor-grab shadow-lg w-[25vw] h-[60vh] overflow-hidden rounded-md left-[40%] translate-x-[-50%] top-[20%] -translate-y-1/2 absolute ${
                isCreateRoomOpen ? "block" : "hidden"
              } `}
            >
              {/* upper section */}
              <div className="relative flex items-center justify-center h-10 p-5 overflow-hidden bg-[#e3ba88] ">
                {/* close */}
                <div className="absolute right-0 w-6 h-6 font-semibold  text-[0.8rem] flex justify-center mr-3 items-center cursor-pointer   text-[#e3ba88] bg-[#5d3323] rounded-full">
                  <button onClick={handleToggle}> X</button>
                </div>
              </div>
              {currentRoomParticipants.length === 0 ? (
                // create room
                <div className="bg-[#5d3323] text-white h-[calc(100%-2.5rem)] p-5">
                  <div className="flex flex-col space-y-3">
                    <h1 className="font-semibold">Room Name</h1>
                    <input
                      type="text"
                      name="roomName"
                      value={joinRoomData.roomName}
                      onChange={handleRoomNameChange}
                      placeholder="Enter Room Name"
                      className="w-[10rem] pl-2 outline-none placeholder-gray-50  bg-[#e3ba88] rounded-md p-1"
                    />
                    <h1 className="pt-5 font-semibold">Visibility</h1>
                    <select
                      onChange={handleChange}
                      className="w-[10rem] p-1   rounded-md outline-none bg-[#e3ba88] "
                    >
                      <option value="public">public</option>
                      <option value="private">private</option>
                    </select>
                    <div className="flex items-center pt-8 space-x-3 ">
                      <h1 className="font-semibold">Size:</h1>
                      <div className="">
                        <Button
                          size={5}
                          active={joinRoomData.size === 5}
                          onClick={() => handleSizeChange(5)}
                        />
                        <Button
                          size={10}
                          active={joinRoomData.size === 10}
                          onClick={() => handleSizeChange(10)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCreateRoom}
                    className="p-1 px-10 mt-10 font-semibold text-white rounded-full mt bg-[#e3ba88]"
                  >
                    Create
                  </button>
                </div>
              ) : (
                // waiting room
                <div className="h-[calc(93%)] bg-emerald-50 ">
                  {joinRoomData.code !== null && joinRoomData.code !== "" && (
                    <div className="flex items-center justify-between p-3 px-5 text-gray-100 bg-[#5d3323] ">
                      <div className="flex items-center justify-center space-x-3">
                        <h1 className="font-semibold ">Room Code :</h1>
                        <button className="p-2 font-semibold rounded-md w-28 h-9 line-clamp-1 bg-[#e3ba88] ">
                          {joinRoomData.code && joinRoomData.code.slice(0, 8)}
                          ...
                        </button>
                      </div>
                      <button
                        onClick={() => handleCopy(joinRoomData.code)}
                        className="p-2 rounded-md  bg-[#e3ba88] text-[0.9rem] text-[#5d3323] "
                      >
                        <RiFileCopyFill />
                      </button>
                      {/* <pre onClick={() => handleCopy(joinRoomData.code)}>Room code:  {joinRoomData.code && joinRoomData.code}</pre> */}
                    </div>
                  )}
                  <div className=" bg-[#5d3323] h-[calc(100%)] px-5 pt-8  ">
                    <h1 className="font-semibold text-gray-100 ">
                      Room Member
                    </h1>
                    <div className="flex w-full mt-5 ">
                      {currentRoomParticipants.map((member, index) => (
                        <div className="" key={index}>
                          <div className="flex flex-col items-center justify-center w-full p-1 ">
                            <div
                              className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full"
                              style={{ backgroundColor: generateRandomBg() }}
                            >
                              {member?.name?.charAt(0)}
                            </div>
                            <h1 className="text-[1rem] font-semibold text-gray-100 mt-1 ">
                              {member.name}
                            </h1>
                          </div>
                          <div className="w-full ">
                            {member.moderator &&member.moderator === true? (
                              <button
                                className="px-8 font-semibold text-gray-100 bg-[#e3ba88] rounded-full p-[0.2rem] mt-5"
                                onClick={() => handleStartGame(member.roomId)}
                                // disabled={index == 0}
                              >
                                Start
                              </button>
                            ):''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              )}
            </div>
          </Draggable>

          {/* join room pop up */}
          {/* join section */}
          <Draggable>
            <div
              className={`bg-[#5d3323] shadow-lg w-[25vw] h-[25vh] overflow-hidden rounded-md left-[40%] translate-x-[-50%] top-[20%] -translate-y-1/2 absolute ${
                isJoinOpen ? "block" : "hidden"
              } `}
            >
              {/* upper section */}
              <div className="relative flex items-center justify-center h-10 p-5 overflow-hidden bg-[#e3ba88]">
                {/* close */}
                <div className="absolute right-0 w-6 h-6 font-semibold  text-[0.8rem] flex justify-center mr-3 items-center   text-[#e3ba88] bg-[#5d3323] rounded-full">
                  <button onClick={handleJoinToggle}> X</button>
                </div>
              </div>
              {/* info section */}
              <div className="h-[calc(100%-2.5rem)] bg- p-5 ">
                <div className="flex flex-col items-center justify-center mt-6 space-y-3 ">
                  <input
                    type="text"
                    onChange={handleCodeChange}
                    value={joinRoomCode.code}
                    required
                    className="w-64 p-1 rounded-md outline-none "
                    placeholder="Code"
                  />
                  <button
                    onClick={handlePrivateJoin}
                    className="w-64 p-1 font-semibold text-white rounded-full bg-[#e3ba88]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Draggable>

          {/* upper section */}
          <div className="flex items-center justify-between h-16 px-5 bg-[#e3ba88] rounded-t-md">
            <div className=""></div>
            <div className="flex space-x-5 ">
              <button
                onClick={handleToggle}
                className="p-1 px-5 text-gray-100 bg-[#9e603a] rounded-full"
              >
                Create
              </button>
            </div>
          </div>

          {/* room section */}
          <div className="bg-[#9e603a] chatList overflow-hidden overflow-y-scroll pb-3 scroll-smooth h-[calc(100%-4rem)] py-6 flex flex-col space-y-5 items-center">
            {/* <div className="bg-gray-400 w-[98%] h-12 rounded-md"></div>
                        <div className="bg-gray-400 w-[98%] h-12 rounded-md"></div> */}
            {participants.length === 0? (
              <div className=" w-[98%] h-full  ">
                  <div className="flex flex-col items-center justify-center">
                      <img src={noChat} alt="" className="" />
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <h1 className="font-semibold text-[#e3ba88] text-xl ">No rooms found</h1>
                        <p className="font-semibold text-gray-50">No room found, please create a room</p>
                      </div>
                  </div>
              </div>
            ) : (
              <div className=" w-[98%] h-full ">
                {participants.map((room, index) => (
              <div
                className="w-[98%] bg-[#b6815a] p-2 rounded-md text-white font-semibold flex justify-between px-5 mb-4"
                key={index}
                onClick={() =>
                  handleJoin(room.roomId, room.visibility, room.name)
                }
              >
                <h1>
                  <pre>
                    {index + 1} {room.name}
                  </pre>{" "}
                </h1>
                <h1>
                  {room.participants.length}/{room.size}
                </h1>
              </div>
            ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = ({
  size,
  active,
  onClick,
}: {
  size: number;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 mr-4 font-semibold text-white rounded outline-none ${
        active ? "bg-[#e3ba88]" : "bg-[#b98d5f]"
      }`}
    >
      {size}
    </button>
  );
};

export default Room;
