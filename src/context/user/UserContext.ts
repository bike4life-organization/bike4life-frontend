import { createContext } from "react";

export interface UserContextProps {
    token: any
    //Methods
    setToken: React.Dispatch<React.SetStateAction<any>>
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);