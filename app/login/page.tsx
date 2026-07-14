"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center">
            Sign In
          </h1>

          <p className="mt-2 text-slate-500 flex justify-center items-center">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Card */}
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
              <div className="mb-2 flex justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-violet-600 hover:text-violet-700"
                >
                  Forgot?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Sign In
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
          Don&apost have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
