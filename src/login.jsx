import React from 'react'; 
//import { useState } from "react";
//import { useNavigate } from "react-router-dom";

function Login(){
 /*{const [username,setUsername]=useState ('');
 const [password,setPasswrd]=useState ('');
 const navigate=useNavigate ();

 const handleLogin = (e) =>{
    e.preventDefault();
 if (username === 'user' && password ==='pasword' ){

    navigate('/dashboard');
 }else {
    alert('invalid credentials')
}*/
 
return(
   <div className="p-4 max-w-md mx-auto bg-red-100">
       {/*main context*/}
       <div className=" flex justify-center items-Center bg-blue-200">
            <h1 className="text-red-400">Welcome please log in below</h1>
       </div>
   </div>

)
};

export default Login;