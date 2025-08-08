'use client'
import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useAppContext } from "@/context/appContext";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
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
          ref={headerRef as React.Ref<HTMLDivElement>}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />


        <main
          style={{ paddingTop: headerHeight }}
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "md:pl-[30dvw] lg:pl-[20dvw]" : "md:pl-16"
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
