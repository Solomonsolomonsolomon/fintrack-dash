"use client";

import { Share, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderBottomProps } from "@/@types";

export default function HeaderBottom({ sidebarOpen = true }: HeaderBottomProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return "Wallet Ledger";
      case "/transactions":
        return "Wallet Ledger"; 
      case "/reports":
        return "Reports";
      case "/settings":
        return "Settings";
      default:
        return "Wallet Ledger";
    }
  };

  const getPageDescription = () => {
    switch (pathname) {
      case "/":
      case "/dashboard":
        return "Ava, Liam, Noah +12 others";
      case "/transactions":
        return "Ava, Liam, Noah +12 others";
      case "/reports":
        return "Generate detailed financial reports and analytics";
      case "/settings":
        return "Manage your account preferences and settings";
      default:
        return "";
    }
  };

  const isOverviewActive = pathname === "/" || pathname === "/dashboard";
  const isTransactionsActive = pathname === "/transactions";
  const showTabs = isOverviewActive || isTransactionsActive;

  return (
    <div
      className={
        `px-6 pt-10 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ` +
        (sidebarOpen ? "md:pl-64" : "md:pl-16")
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] leading-8 font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            {(isOverviewActive || isTransactionsActive) && (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button className="flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white px-4">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-gray-200"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {(isOverviewActive || isTransactionsActive) && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"].map(
                (src, idx) => (
                  <div
                    key={idx}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  >
                    <img
                      src={src}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              )}
            </div>
            <span className="text-sm text-gray-600">
              {getPageDescription()}
            </span>
          </div>
        )}

        {showTabs && (
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-10">
              <Link href="/dashboard" className="-mb-px">
                <button
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    isOverviewActive
                      ? "text-gray-900 border-gray-900"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
              </Link>

              <Link href="/transactions" className="-mb-px">
                <button
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    isTransactionsActive
                      ? "text-gray-900 border-gray-900"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Transactions
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
