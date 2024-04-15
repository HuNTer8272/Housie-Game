import React, { useEffect, useState } from 'react'
import "./App.css"
import {  useAtom } from 'jotai'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import server from './Server/Server';
import Error404 from './pages/Error404';
import Chatroom from './pages/Chatroom';
import { UserData } from './Types/Type';
import Home from './pages/Home';
import Room from './components/Room';
import Customisation from './pages/Customisation';
import Payment from './pages/Payment';
import SignUp from './pages/SignUp'
import { MdEmail } from "react-icons/md";


// interface HandleUserDataChange 

const App:React.FC = () => {

  // const [userData,setUserData] = useState<UserData>(
  const [userData,setUserData] =useState<UserData>(() => {
    const data = localStorage.getItem('userData');
    return data? JSON.parse(data) : {name:"", point:0, rank: "",email:"",password:"", roomId:"",uid:"", photoURL:'',participant:{name:'',uid:'',roomId:'',score:0}};
  })
  // whenever the userData state changes save it to local storage 
  

  // set the uid
  // useEffect(() => {
  //   setUserData(prev =>  ({...prev,uid:server?.id || ''}))
  // },[userData.email])

  useEffect(() => {
    // console.log('userData before stringifying:', userData);
    localStorage.setItem('userData',JSON.stringify(userData));
    console.log('Saved Succefully....',userData);
 },[userData]);


  const handleUserDataChange = (name: string, value: string): void => {
    console.log(name,value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  




  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp handleUserDataChange={handleUserDataChange}/>} />
        <Route path='/login' element={<Login handleUserDataChange={handleUserDataChange}/>}/>
        <Route path='/chatroom' element={<Chatroom userData={userData} />} />
        <Route path='/home' element={<Home userData={userData} />} />
        <Route path='/room' element={<Room userData={userData} setUserData={setUserData} />} />
        <Route path='/custom' element={<Customisation userData={userData} />} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App