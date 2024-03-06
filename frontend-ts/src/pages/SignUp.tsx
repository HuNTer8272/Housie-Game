import React,{ChangeEvent,useState} from "react";
import { useGoogleLogin,hasGrantedAnyScopeGoogle, GoogleLogin, GoogleCredentialResponse, CodeResponse, TokenResponse } from '@react-oauth/google';
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

function SignUp({handleUserDataChange}:{handleUserDataChange:(name:string,value:string) => void}){
    const [userState, SetuserState] = useState({ name: "",email:"",password:""});
    const clientId = "911320807195-ss24bj45q43tkav84cctudacmlbti1m9.apps.googleusercontent.com";

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target ;
    handleUserDataChange(name, value);
    SetuserState({
      ...userState,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      console.log("hello");
      // Emit 'sign-up' event with user data
      socket.emit('sign-up', {
        name: userState.name,
        email: userState.email,
        password: userState.password,
        // Add other data as needed
      });
    } catch (error) {
      console.error(error);
    }
  };


  
  

//   const onSuccessGoogleLogin = (tokenResponse: TokenResponse) => {
//     // if (tokenResponse && tokenResponse.credential !== undefined)  {
//         console.log('Login successful:', tokenResponse);

//         // Extract and decode the JWT token
//         const idToken = tokenResponse.credential;
//         const decodedToken: { email: string; name: string; picture: string } = jwtDecode(idToken);
//         console.log(decodedToken)
//         // Access the decoded profile data
//         // let userId = uuidv4();
//         const profileData = {
//             UserId:'',
//             email: decodedToken.email,
//             name: decodedToken.name,
//             picture: decodedToken.picture,
//             // Add other profile data as needed
//         };

//         console.log('Profile data:', profileData);
//         Cookies.set('userEmail', decodedToken.email);
//         console.log(document.cookie)
//         // You can use or store the profile data as needed
//         fetch('http://localhost:3002/storeProfileData', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(profileData),
//         })
//         .then(response => response.json())
//         .then(result => {
//             console.log('ProfileData stored successfully:', result);
//             // You can redirect or perform other actions as needed
//             window.location.href = `/temp`;
//         })
//         .catch(error => {
//             console.error('Failed to store profileData:', error);
//         });
//     }



  const onFailureGoogleLogin = (error:any) => {
    console.error('Login failed:', error);
  };

        // const signIn = useGoogleLogin({
        //     clientId: clientId,
        //     onSuccess: onSuccessGoogleLogin ,
        //     onFailure: onFailureGoogleLogin ,
        //     cookiePolicy: 'single_host_origin',
        // });
    return(
        <>
             <div className="flex flex-col justify-center items-center h-screen bg-zinc-800">
                <div className="flex flex-col justify-center items-center bg-zinc-500 h-[22rem] rounded">
                    <div className="flex flex-col p-8 space-y-5">
                        <h1 className="text-center">SignUp</h1>
                        <div className="flex flex-col justify-center items-center space-y-5">
                            <div className="flex flex-row">
                                    <label htmlFor="name">Name:</label>
                                    <input 
                                    className="bg-transparent" 
                                    name="name" 
                                    type="text" 
                                    placeholder="Enter your Name"
                                    value={userState.name}
                                    onChange={handleChange}/>
                                </div>
                                <div className="flex flex-row">
                                    <label htmlFor="email">Email:</label>
                                    <input 
                                    className="bg-transparent" 
                                    name="email" 
                                    type="email" 
                                    placeholder="Enter your email"
                                    value={userState.email}
                                    onChange={handleChange}/>
                                </div>
                                <div className="flex flex-row mt-2">
                                    <label htmlFor="password">Password:</label>
                                    <input 
                                    className="bg-transparent" 
                                    name="password" 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={userState.password}
                                    onChange={handleChange}/>
                                </div>
                            <button className="bg-purple-500 rounded-full mt-4 w-[100px] text-white p-2" onClick={handleSignUp}>Sign Up</button>
                            <p className="text-center mt-4">Already registered?<NavLink to={"/signup"}>Login</NavLink></p>
                            {/* <button onClick={signIn}>Sign in with Google</button> */}
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default SignUp;