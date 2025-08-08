"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchContextType } from "@/@types";


const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (debouncedSearchTerm && pathname !== "/transactions") {

      router.push("/dashboard");
    }
  }, [debouncedSearchTerm, pathname, router]);


  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
    } else {
      localStorage.removeItem("searchTerm");
    }
  }, [searchTerm]);


  useEffect(() => {
    const savedSearch = localStorage.getItem("searchTerm");
    if (savedSearch) {
      setSearchTerm(savedSearch);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
} 