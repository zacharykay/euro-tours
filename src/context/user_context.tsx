import React, { FC, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = React.createContext<any>({} as any);

export const UserProvider: FC = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useAuth0();
  const [ myUser, setMyUser ] = useState<any>(null);

  useEffect(
    () => {
      setMyUser(user);
    },
    [ user ]
  );

  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, myUser, isLoading, error, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
