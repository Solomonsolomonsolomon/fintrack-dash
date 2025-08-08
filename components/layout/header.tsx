'use client'
import React from "react";
import HeaderBottom from "../sections/header-bottom";
import HeaderTop from "../sections/header-top";

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ onMenuClick, sidebarOpen = true }, ref) => {
    return (
      <div ref={ref} className="w-full fixed top-0 left-0 z-50 bg-white">
        <HeaderTop onMenuClick={onMenuClick} />
        <HeaderBottom sidebarOpen={sidebarOpen} />
      </div>
    );
  }
);

Header.displayName = "Header";

export default Header;
