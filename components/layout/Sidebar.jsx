"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import toast from "react-hot-toast";
import { LayoutDashboard, Shirt, Wand2, Sparkles, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard",      icon: LayoutDashboard, label: "Dashboard" },
  { href: "/wardrobe",       icon: Shirt,           label: "Wardrobe"  },
  { href: "/outfit-builder", icon: Wand2,           label: "Builder"   },
  { href: "/ai-stylist",     icon: Sparkles,        label: "Stylist"   },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Signed out.");
    router.push("/");
  };

  const initial = (profile?.displayName || user?.email || "?")[0].toUpperCase();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-paper-200 border-r border-paper-300 flex-col z-40 hidden md:flex"
        style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(107,85,64,0.07) 27px, rgba(107,85,64,0.07) 28px)" }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-paper-300">
          <span className="font-typewriter text-xl text-paper-900">FitCheck</span>
          <p className="text-paper-500 text-xs font-light mt-0.5">Your digital closet</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 px-3 flex flex-col gap-0.5">
          <p className="label text-paper-400 px-3 mb-3 text-[10px]">Menu</p>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-light transition-all duration-150 group",
                  active
                    ? "bg-white text-paper-900 shadow-paper border border-paper-300"
                    : "text-paper-600 hover:text-paper-900 hover:bg-white/60"
                )}
              >
                <Icon size={15} className={active ? "text-denim" : "text-paper-400 group-hover:text-paper-600"} />
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-denim" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-paper-300 px-3 py-4 flex flex-col gap-2">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-7 h-7 rounded-sm bg-denim flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-paper-900 text-xs font-medium truncate leading-tight">
                {profile?.displayName || "User"}
              </p>
              <p className="text-paper-400 text-[10px] truncate font-light leading-tight mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-paper-500
                       hover:text-rose hover:bg-white/60 text-xs font-light transition-all duration-150"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <div className="bottom-nav md:hidden">
        <div className="flex items-stretch">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all duration-150",
                  active ? "text-denim" : "text-paper-500 hover:text-paper-800"
                )}
              >
                <Icon size={18} />
                <span className="text-[9px] font-medium tracking-wide uppercase">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}