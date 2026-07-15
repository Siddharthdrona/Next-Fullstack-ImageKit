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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 p-2 shadow-lg shadow-violet-500/20">
            <Video className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 transition-colors dark:text-white">
              ReelsPro
            </h1>

            <p className="text-xs text-slate-500 transition-colors dark:text-slate-400">
              AI Video Platform
            </p>
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
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-violet-100 text-violet-700 shadow-sm dark:bg-violet-900/40 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session ? (
            <>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {session.user?.email?.split("@")[0]}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {session.user?.email}
                </p>
              </div>

              <div className="rounded-full bg-violet-100 p-2 transition-colors dark:bg-violet-900/40">
                <UserCircle2 className="h-6 w-6 text-violet-600 dark:text-violet-300" />
              </div>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-violet-700 hover:shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
