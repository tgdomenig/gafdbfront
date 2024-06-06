import { createContext } from "react";

export interface ContextInterface {
  datastoreSynced: boolean,
  setDatastoreSynced: Function,
  isAuthenticated: boolean,
  setIsAuthenticated: Function
}

export const Context = createContext<ContextInterface>(
  {
    datastoreSynced: false,
    setDatastoreSynced:  () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
  
  }
);
