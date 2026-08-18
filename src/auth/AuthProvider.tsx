import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { mockUsers, MOCK_MFA_CODE } from "./mockUsers";
import type { User } from "./types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const matchedUser = mockUsers.find(
      (mockUser) =>
        mockUser.email === email && mockUser.password === password,
    );

    if (!matchedUser) {
      return false;
    }

    setPendingUser(matchedUser);
    return true;
  };

  const verifyMfa = (code: string) => {
    if (!pendingUser || code !== MOCK_MFA_CODE) {
      return false;
    }

    setUser(pendingUser);
    setPendingUser(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingUser,
        isAuthenticated: user !== null,
        login,
        verifyMfa,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}