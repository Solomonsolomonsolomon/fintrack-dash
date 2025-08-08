"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface HeaderTopProps {
  onMenuClick?: () => void;
}
export default function HeaderTop({ onMenuClick }: HeaderTopProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const searchBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        searchOpen &&
        overlayRef.current &&
        !overlayRef.current.contains(target) &&
        !searchBtnRef.current?.contains(target)
      ) {
        setSearchOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [searchOpen]);
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    console.log("search:", searchValue);

    // setSearchOpen(false);
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className=""
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Image
            alt="FinTrack Logo"
            src="/logo.svg"
            width={110}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSearchOpen((s) => !s)}
            ref={searchBtnRef as any}
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>

          <Button size="icon" variant="ghost">
            <LayoutGrid className="w-5 h-5" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar1.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {searchOpen && (
        <div
          ref={overlayRef}
          className="absolute left-0 right-0 top-full z-50 px-4 py-3 md:px-0"
        >
          <div className="mx-auto w-full md:max-w-lg">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-md border bg-white px-2 py-1 shadow"
            >
              <input
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="flex-1 min-w-0 bg-transparent outline-none px-2 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                aria-label="Clear"
              >
                Clear
              </button>
              <button
                type="submit"
                className="ml-1 rounded px-3 py-1 text-sm border bg-gray-50 hover:bg-gray-100"
              >
                Go
              </button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSearchOpen(false)}
                className="ml-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
