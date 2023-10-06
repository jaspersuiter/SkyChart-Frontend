import React, { ReactNode, useState } from "react";

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
