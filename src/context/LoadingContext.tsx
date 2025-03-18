"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isPageLoading: boolean;
  setIsPageLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isPageLoading: true,
  setIsPageLoading: () => {}
});

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}