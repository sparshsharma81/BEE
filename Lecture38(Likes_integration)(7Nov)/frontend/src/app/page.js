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
  const[posts,setPosts] = useState([]);
  const [refresh,useRefresh] = useState([]);
  //when user render the post..then all the posts are supposed to be shown 
  

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

 //the callback function inside useEffect can never be asynchronous
const getAllPosts = async()=>{
  let res = await axios.get("http://localhost:4000/post/all");
  setPosts(res.data.posts);
}

useEffect(()=>{
  getAllPosts();
},[])

const getAllPosts = async()=>{
  if(isLoggedIn){
    let res = await axios.get("http://localhost:4000/post/all");
    setPosts(res.data.posts);
  }
}

const handlePostLike = async(id)=>{
  try{
  let res = await axios.post(`http://localhost:4000/post/like/${id}`,{username});
  if(res.status == 200){
    setRefresh(prev => prev + 1);
    getAllPosts();

  }
  }catch(error){
    console.log(error.message);
  }

}
//when we need to run  a useEffect again and again..we use refresh counter

  const handleSubmit = (e) =>{
    e.preventDefault();
    //form has a default behaviour....like when we submit it..then it will refresh it..so it will stop that
    socket.emit("register",username);
    setIsLoggedIn(true);
    setRefresh(prev => prev + 1);
  }
  const handlePostCreate = async (e)=>{
  e.preventDefault();
  let payload = {
    username,
    content 
  }
  let res = await axios.post("http://localhost:4000/post/create",payload);
  if(res.status == 201){
    setRefresh(prev => prev + 1);
  }
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
        <label form="content">Create Tweet</label>
       <textarea rows={3} cols={7} onChange={(e)=>setContent(e.target.value)} className="border" 
       id="content"></textarea>

        <button className="border bg-blue-300 rounded-lg">Post</button>
      </form>

      <div className = "p-5 flex flex-col gap-3">
        {posts?.map((post,indx)=>{
          return <div key ={indx} className="p-4 border rounded-lg shadow-md">
            <div className= "flex gap-2 item-center">

              <User className="h-10 w-10 rounded-full"/>
              <h4 className = "text-lg font-semibold">{post.author}</h4> 
            </div>
            <p className = "text-xl">{post.content}</p>
            <p className = "text-sm text-gray-400 float-end">{new Date(post.createdAt).toLocaleString()}</p>
            <div onClick={()=>handlePostLike(post.id)} className={`flex ${post.likes.includes(username)?"opacity-45 cursor-not-allowed":""}`}>
              <div className = "flex">{post.likes.includes(username)?<Heart fill = "red" className = "mr-2"/> : 
              <Heart className = "mr-2"/>} {post.likes.length} Likes</div>
            </div>
            
          </div>
        })}
      </div>

    </div>
  );
}