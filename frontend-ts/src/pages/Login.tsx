import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import server from "../Server/Server";

function Login({ handleUserDataChange }:{handleUserDataChange:(name:string,value:string) => void}) {
  const [userState, SetuserState] = useState({ name: ""});

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target ;
    handleUserDataChange(name, value);
    SetuserState({
      ...userState,
      [name]: value,
    });
  };

//  const vvisibility = "private";
//  const size = 5;
  
  // const handleJoinRoom = () => {
  //   server.emit("joined-room", { roomId: userState.roomId,visibility:vvisibility,size:size,participant: { ...userState, uid: server.id, score: 0 } });
  //   server.off("joined-room");
  // };
  
  


  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-5 text-white bg-zinc-800">
      <input
        type="text"
        onChange={handleChange}
        className="p-1 pl-2+ text-black rounded-md outline-none "
        name="name"
        value={userState.name}
        placeholder="Enter Your Name"
      />
      {/* <input
        type="text"
        onChange={handleChange}
        className="p-1 pl-2 text-black rounded-md outline-none "
        name="roomId"
        placeholder="Enter Room ID"
      /> */}
      <NavLink to={"/home "}>
        <button
          // onClick={handleJoinRoom}
          disabled={userState.name === ""}
          className="w-32 py-1 font-medium text-white rounded-full bg-violet-500"
        >
          Join
        </button>
      </NavLink>
    </div>
  );
}

export default Login;

