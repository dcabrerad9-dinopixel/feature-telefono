import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: string;
  saveUser: (user: string) => void;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

