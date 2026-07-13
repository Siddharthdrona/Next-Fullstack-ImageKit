"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect:false,
    })

    if(result?.error) {
      console.log(result.error)
    } else {
      router.push("/")
    }
  }

  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input 
  //       type="email" 
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input 
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button type="submit">Login</button>
  //     </form>

  //     {/* <div>
  //       <button onClick={() => signIn("google")}>
  //         Sign in with Google
  //       </button>
  //     </div> */}

  //     <div>
  //       Don&apos;t have an account ?
  //       <button onClick={() => router.push('/register')}>Register</button>
  //     </div>
      
  //   </div>
  // )







  
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>

      {/* Uncomment if you want Google Sign In */}
      {/* 
      <div className="mt-6">
        <button
          onClick={() => signIn("google")}
          className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>
      */}

      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => router.push("/register")}
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  </div>
);



}

export default LoginPage
