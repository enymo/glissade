import useHybridInput from "@enymo/react-hybrid-input-hook";
import React, { createContext, useContext } from "react";
import { ErrorProvider } from "../hooks/ErrorContext";
import { RadioGroupProps } from "../types";

const Context = createContext<{
    value: string | number | boolean | null,
    onChange: (value: string | number | boolean | null) => void
} | undefined>(undefined);

export const useRadioGroup = () => useContext(Context);
export default function RadioGroup<T extends string | number | boolean>({
    name,
    value: externalValue,
    onChange: externalOnChange,
    options,
    error: externalError,
    children
}: RadioGroupProps<T>) {
    const {value, onChange, error} = useHybridInput({name, externalValue, externalOnChange, externalError, options, defaultValue: null});

    return (
        <Context.Provider value={{ value, onChange: onChange as any }}>
            <ErrorProvider value={error}>
                {children}
            </ErrorProvider>
        </Context.Provider>
    )
}