"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e)=>{
    e.preventDefault();
    let paylod ={
      name,
      email,
      password
    }
    let res = await axios.post("http://localhost:5000/auth/signup",paylod);
    if(res.status=201){
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-black">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-7">Sign Up</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div>
            <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              onChange={(e)=>{setName(e.target.value)}}
              id='name'
              placeholder='Name'
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50"
            />
          </div>
          <div>
            <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              id='email'
              type='email'
              placeholder='Email'
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50"
            />
          </div>
          <div>
            <label htmlFor='pass' className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e)=>{setPassword(e.target.value)}}
              id='pass'
              type='password'
              placeholder='Password'
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50"
            />
          </div>
          <button
            type="submit"
            className="mt-2 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page;