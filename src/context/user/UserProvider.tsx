import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export function UserContextProvider({ children }: any) {
  const [token, setToken] = useState(()=>{window.sessionStorage.getItem('token')});
  setToken.bind(setToken);
  
  return (
    <UserContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
