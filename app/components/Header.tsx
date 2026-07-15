"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Upload,
  LayoutDashboard,
  LogOut,
  UserCircle2,
  Video,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Upload",
      href: "/upload",
      icon: Upload,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 p-2">
            <Video className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">ReelsPro</h1>

            <p className="text-xs text-slate-500">AI Video Platform</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
           <ThemeToggle />
           
          {session ? (
            <>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-slate-800">
                  {session.user?.email?.split("@")[0]}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">{session.user?.email}</p>
              </div>

              <div className="rounded-full bg-violet-100 dark:bg-violet-900/40 p-2">
                <UserCircle2 className="text-violet-600" />
              </div>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
