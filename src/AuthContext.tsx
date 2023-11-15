import React, { ReactNode, useEffect, useState } from "react";
import { env } from "./env";

interface AuthContextType {
  authorization: boolean;
  login: VoidFunction;
  logout: VoidFunction;
}

export const AuthorizationContext = React.createContext<AuthContextType>({
  authorization: false,
  login: () => {},
  logout: () => {},
});

type AuthProviderPropsType = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [authorization, setAuthorization] = useState(false);
  const apiUrl = env.SKYCHART_API_URL;
  useEffect(() => {
    async function autoLogin() {
      const response = await fetch(
        `${apiUrl}/api/authentication/auth-verification`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setAuthorization(true);
      } else {
        setAuthorization(false);
      }
    }
    autoLogin();
  }, []);

  const login = () => {
    setAuthorization(true);
  };

  const logout = () => {
    setAuthorization(false);
    console.log("logout", authorization);
  };

  return (
    <AuthorizationContext.Provider value={{ authorization, login, logout }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
