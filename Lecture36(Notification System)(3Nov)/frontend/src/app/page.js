"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"
import axios from "axios"

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username,setusername] = useState("");
  const [content,setContent] = useState("");

  // socket client initialise
  useEffect(()=>{
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
  },[])

  // client connection
  useEffect(()=>{
    socket?.on("connect",()=>{
      console.log("user connected",socket.id);
    })
  },[socket])

  const handleSubmit = (e) =>{
    e.preventDefult();
    //form has a default behaviour....like when we submit it..then it will refresh it..so it will stop that
    socket.emit("register",username);
    setIsLoggedIn(true);
  }
  const handlePostCreate = async (e)=>{
  e.preventDefault();
  let payload = {
    username,
    content 
  }
  let res = await axios.post("http://localhost:4000/post/create",payload);
}




  if(!isLoggedIn){
    return(
      <div className="h-screen w-full bg-white text-black flex justify-center items-center">
        <form className="flex flex-col gap2 border rounded-md p-5">
          <label form="username">UserName</label>
          <input onChange={(e)=>setusername(e.target.value)} className="border" id="username" 
          placeholder="Enter username"/>
          <button className="border bg-blue-300 rounded-lg">Register</button>
        </form>
      </div>
    )
  }

 return (
    <div className="h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}!!</h1>

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md p-5">
        <label form="username"
      </form>

    </div>
  );
}