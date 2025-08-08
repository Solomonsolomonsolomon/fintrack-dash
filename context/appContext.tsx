"use client";

import { PageType } from "@/@types";
import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  pageType: PageType;
  setPageType: (page: PageType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [pageType, setPageType] = useState<PageType>(PageType.OVERVIEW);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const value: AppContextType = {
    pageType,
    setPageType,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
