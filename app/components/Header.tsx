"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Home, Upload, LayoutDashboard, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session, status } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
      });

      showNotification("Signed out successfully.", "success");
    } catch {
      showNotification("Failed to sign out.", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl font-bold gap-2"
            onClick={() => showNotification("Welcome to Video with AI", "info")}
          >
            <Home size={20} />
            Video with AI
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex gap-2">
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>

          {session && (
            <>
              <Link href="/dashboard" className="btn btn-ghost">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link href="/upload" className="btn btn-primary">
                <Upload size={18} />
                Upload
              </Link>
            </>
          )}
        </div>

        {/* User */}
        <div className="flex-none">
          {status === "loading" ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <div className="dropdown dropdown-end">
              <button className="btn btn-circle btn-ghost">
                <User size={20} />
              </button>

              <ul className="menu dropdown-content mt-3 w-72 rounded-box bg-base-100 shadow-lg border p-2">
                {session ? (
                  <>
                    <li className="pointer-events-none">
                      <span className="font-semibold">
                        {session.user?.email}
                      </span>
                    </li>

                    <li>
                      <Link href="/dashboard">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link href="/upload">
                        <Upload size={18} />
                        Upload Video
                      </Link>
                    </li>

                    <div className="divider my-1"></div>

                    <li>
                      <button onClick={handleSignOut} className="text-error">
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      onClick={() =>
                        showNotification("Please sign in to continue.", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
