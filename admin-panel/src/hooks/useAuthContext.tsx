import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types/Auth";
import { useContext } from "react";

export function useAuth(): AuthContextType {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}
