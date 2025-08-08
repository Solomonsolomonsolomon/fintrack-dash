"use client";

import { Share, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderBottomProps } from "@/@types";
import { PAGE_CONFIG, AVATARS } from "@/data/pageConfig";

export default function HeaderBottom({
  sidebarOpen = true,
}: HeaderBottomProps) {
  const pathname = usePathname();

  const page =
    PAGE_CONFIG[pathname as keyof typeof PAGE_CONFIG] ?? PAGE_CONFIG["/"];

  return (
    <div
      className={`px-6 pt-10 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "md:pl-[30dvw] lg:pl-[20dvw]" : "md:pl-16"
      }`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] leading-8 font-semibold text-gray-900">
              {page.title}
            </h1>

            {page.showTabs && <ChevronDown className="w-4 h-4 text-gray-500" />}

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button className="flex items-center gap-2 rounded-full bg-[#4B8B9F] hover:bg-[##4B8B9F] text-white px-4">
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

        {page.showTabs && (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((src, idx) => (
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
              ))}
            </div>
            <span className="text-sm text-gray-600">{page.description}</span>
          </div>
        )}

        {page.showTabs && (
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-10">
              {[
                { href: "/dashboard", label: "Overview" },
                { href: "/transactions", label: "Transactions" },
              ].map((tab) => {
                const active =
                  pathname === tab.href ||
                  (tab.href === "/dashboard" && pathname === "/");

                return (
                  <Link key={tab.href} href={tab.href} className="-mb-px">
                    <button
                      className={`relative pb-3 text-sm font-medium transition-colors ${
                        active
                          ? "text-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`absolute left-1/2 -bottom-[2px] h-[3px] rounded-full transition-all duration-300 ${
                          active
                            ? "bg-[#4B8B9F] w-[140%] -translate-x-1/2"
                            : "bg-transparent w-0 group-hover:w-[140%]"
                        }`}
                      ></span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
