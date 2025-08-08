"use client";

import { Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderBottomProps } from "@/@types";
export default function HeaderBottom({ 
  sidebarOpen = true
}: HeaderBottomProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return "Dashboard Overview";
      case "/transactions":
        return "Transaction History";
      case "/reports":
        return "Financial Reports";
      case "/settings":
        return "Account Settings";
      default:
        return "Dashboard";
    }
  };

  const getPageDescription = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return "Monitor your financial health and key metrics";
      case "/transactions":
        return "View and manage all your financial transactions";
      case "/reports":
        return "Generate detailed financial reports and analytics";
      case "/settings":
        return "Manage your account preferences and settings";
      default:
        return "Welcome to your financial dashboard";
    }
  };

  const isDashboardOrTransactions = pathname === "/" || 
    pathname === "/dashboard" || 
    pathname === "/transactions";

  return (
    <div className={
      `px-6 pt-10 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ` +
      (sidebarOpen ? 'md:pl-64' : 'md:pl-16')
    }>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <div className="flex flex-col gap-4">
        
          <div className="flex items-center gap-3">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Active</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {getPageDescription()}
          </p>

          {isDashboardOrTransactions && (
            <div className="flex items-center   gap-4 lg:gap-8">
              <Link href="/dashboard">
                <button 
                  className={`font-medium pb-3 border-b-2 transition-colors ${
                    pathname === "/" || pathname === "/dashboard"
                      ? "text-blue-600 border-blue-600" 
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
              </Link>
              <Link href="/transactions">
                <button 
                  className={`font-medium pb-3 border-b-2 transition-colors ${
                    pathname === "/transactions"
                      ? "text-blue-600 border-blue-600" 
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Transactions
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
