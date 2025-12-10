import { useContext } from "react";
import { HomeContextType } from "@/types/Home";
import { HomeContext } from "../context/HomeContext";

export function useHome(): HomeContextType {
  const homeContext = useContext(HomeContext);
  if (!homeContext) {
    throw new Error("useHome must be used within an HomeProvider");
  }
  return homeContext;
}
