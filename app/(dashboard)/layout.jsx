"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { WardrobeProvider } from "@/context/WardrobeContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-paper-300 border-t-denim rounded-full animate-spin" />
          <p className="font-hand text-paper-500 text-base">Loading your closet...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <WardrobeProvider>
      <div className="min-h-screen bg-paper-100"
        style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(107,85,64,0.06) 27px, rgba(107,85,64,0.06) 28px)" }}
      >
        <Sidebar />
        <div className="flex flex-col min-h-screen md:ml-56">
          <Header />
          <main className="flex-1 p-5 md:p-7 pb-24 md:pb-7">{children}</main>
        </div>
      </div>
    </WardrobeProvider>
  );
}