"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="font-bold">
        ImageKit App
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span>{session.user?.email}</span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
