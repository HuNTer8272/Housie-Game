import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import server from "../Server/Server";

function Login({ handleUserDataChange }:{handleUserDataChange:(name:string,value:string) => void}):JSX.Element {
  const [userState, SetuserState] = useState({ email:"",password:""});

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
    <>
    <div className="flex flex-col items-center justify-center h-screen space-y-5 text-white bg-[#5d3323]">
      <div className="flex flex-col items-center space-y-10 h-[30vh] w-[15vw] bg-slate-500 p-6 rounded">
        <input
          type="text"
          onChange={handleChange}
          className="p-1 pl-2 text-black rounded-md outline-none"
          name="email"
          value={userState.email}
          placeholder="Enter Your Email"
        />
        <input
          type="password"
          onChange={handleChange}
          className="p-1 pl-2 text-black rounded-md outline-none"
          name="password"
          value={userState.password}
          placeholder="Enter Your Password"
        />
          <NavLink to={"/home "}>
            <button
              // onClick={handleJoinRoom}
              disabled={userState.email === ""}
              className="w-32 py-1 font-medium text-white rounded-full bg-[#edcfae]"
            >
              Join
            </button>
          </NavLink>
      </div>
    </div>
    </>
  );
}

export default Login;

