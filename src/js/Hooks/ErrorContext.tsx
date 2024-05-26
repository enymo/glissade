import { createContext, useContext } from "react";

const Context = createContext<string | undefined>(undefined);
export const ErrorProvider = Context.Provider;
export const useError = () => useContext(Context);