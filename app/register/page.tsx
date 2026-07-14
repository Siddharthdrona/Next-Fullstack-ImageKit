"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Confirm Password"
  //         value={confirmPassword}
  //         onChange={(e) => setConfirmPassword(e.target.value)}
  //       />
  //       <button type="submit">Register</button>
  //     </form>
  //     <div>
  //       <p>
  //         Already have an account? <a href="/login">Login</a>
  //       </p>
  //     </div>
  //   </div>
  // );

  //   return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  //     <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
  //       <div className="mb-8 text-center">
  //         <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
  //         <p className="mt-2 text-sm text-gray-500">
  //           Register to get started
  //         </p>
  //       </div>

  //       <form onSubmit={handleSubmit} className="space-y-5">
  //         <div>
  //           <label className="mb-2 block text-sm font-medium text-gray-700">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             placeholder="Enter your email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className="mb-2 block text-sm font-medium text-gray-700">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="Create a password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className="mb-2 block text-sm font-medium text-gray-700">
  //             Confirm Password
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="Confirm your password"
  //             value={confirmPassword}
  //             onChange={(e) => setConfirmPassword(e.target.value)}
  //             className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  //             required
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
  //         >
  //           Create Account
  //         </button>
  //       </form>

  //       <div className="mt-6 text-center text-sm text-gray-600">
  //         Already have an account?{" "}
  //         <button
  //           type="button"
  //           onClick={() => router.push("/login")}
  //           className="font-semibold text-blue-600 hover:underline"
  //         >
  //           Login
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-slate-500">
            Start managing your images today.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="border-t border-slate-200"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-slate-400">
              OR
            </span>
          </div>

          <button className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100">
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
