import { createContext } from "react";
import type { User } from "./types";

export interface AuthContextType {
  user: User | null;
  pendingUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  verifyMfa: (code: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);