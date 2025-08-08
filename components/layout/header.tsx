
import HeaderBottom from "../sections/header-bottom";
import HeaderTop from "../sections/header-top";

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export default function Header({ 
  onMenuClick, 
  sidebarOpen = true
}: HeaderProps) {
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white">
      <HeaderTop onMenuClick={onMenuClick} />
      <HeaderBottom sidebarOpen={sidebarOpen} />
    </div>
  );
}
