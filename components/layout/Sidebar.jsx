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
  { href: "/ai-stylist",     icon: Sparkles,        label: "AI Stylist"},
];

export default function Sidebar() {
  const pathname    = usePathname();
  const { user, profile } = useAuth();
  const router      = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Signed out.");
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-ink-900 border-r border-ink-800 flex flex-col z-40 hidden md:flex">

      {/* Logo */}
      <div className="px-7 py-7 ruled-b">
        <span className="display text-2xl text-cream">Fitcheck</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-0.5">
        <p className="label-xs text-ink-600 px-3 mb-4">Navigation</p>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-3 text-sm font-light transition-all duration-150 group",
                active
                  ? "text-cream border-l-2 border-gold pl-[10px]"
                  : "text-ink-400 hover:text-cream border-l-2 border-transparent pl-[10px]"
              )}
            >
              <Icon
                size={15}
                className={clsx(
                  "transition-colors",
                  active ? "text-gold" : "text-ink-500 group-hover:text-ink-200"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="ruled px-4 py-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-3">
          <div className="w-7 h-7 bg-gold flex items-center justify-center text-ink-950 text-xs font-medium flex-shrink-0">
            {(profile?.displayName || user?.email)?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cream text-xs font-medium truncate leading-tight">
              {profile?.displayName || "User"}
            </p>
            <p className="text-ink-500 text-[10px] truncate font-light leading-tight mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-ink-500 hover:text-red-400
                     text-xs font-light transition-colors duration-150 group w-full"
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}