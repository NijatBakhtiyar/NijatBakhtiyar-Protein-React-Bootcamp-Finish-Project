import { createContext, useContext } from "react";
import { useQuery } from "react-query";

import { queryKeys, Service } from "../data/service";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const { data: user, ...rest } = useQuery([queryKeys.me], Service.me);

  return (
    <UserContext.Provider
      value={{ ...rest, user: rest.isSuccess ? user : null }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
