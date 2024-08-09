"use client";
import React, {
  createContext,
  ReactNode,
  ReactPortal,
  useContext,
  useState,
} from "react";
import { Song, SongContextType } from "@/app/type/SongType";

const SongContext = createContext<SongContextType | null>(null);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};
