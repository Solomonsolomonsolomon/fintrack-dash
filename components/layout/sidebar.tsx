"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { name: "Dashboard", id: "dashboard", href: "/dashboard" },
  { name: "Transactions", id: "transactions", href: "/transactions" },
  { name: "Reports", id: "reports", href: "/reports" },
  { name: "Settings", id: "settings", href: "/settings" },
];

export function Sidebar({ className, isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!onToggle) return;
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile && isOpen) {
      onToggle();
    }
  }, [pathname]);

  return (
    <>
      <aside
        className={cn(
          
          "fixed left-0 top-36 md:top-16 h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] bg-white z-[999999] overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/dashboard" && pathname === "/");

                return (
                  <li key={item.id}>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all",
                          isOpen ? "px-3" : "px-2 md:justify-center"
                        )}
                      >
                        {isOpen && <span>{item.name}</span>}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            {isOpen && (
              <div className="text-xs text-gray-500">&copy; 2024 FinTrack</div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
