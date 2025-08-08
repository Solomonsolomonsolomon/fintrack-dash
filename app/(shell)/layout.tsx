"use client";

import Header from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useEffect } from "react";
import { useAppContext } from "@/context/appContext";
export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen text-sm text-gray-800">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main
          className={`flex-1 pt-[30dvh] md:pt-[33dvh] transition-all duration-300 ${
            sidebarOpen ? "md:pl-64" : "md:pl-16"
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
