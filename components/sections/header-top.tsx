"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeaderTopProps {
  onMenuClick?: () => void;
}

export default function HeaderTop({ onMenuClick }: HeaderTopProps) {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b">
   
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <Image
          alt="FinTrack Logo"
          src="/logo.svg"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Search className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
