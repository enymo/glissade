import useHybridInput from "@enymo/react-hybrid-input-hook";
import React, { createContext, useContext } from "react";
import { ErrorProvider } from "../Hooks/ErrorContext";
import { RadioGroupProps } from "../types";

const Context = createContext<{
    value: string | number | boolean,
    onChange: (value: string | number | boolean) => void
} | undefined>(undefined);

export const useRadioGroup = () => useContext(Context);
export default function RadioGroup<T extends string | number | boolean>({
    name,
    value: externalValue,
    onChange: externalOnChange,
    options,
    error,
    children
}: RadioGroupProps<T>) {
    const {value, onChange, error: formError} = useHybridInput({name, externalValue, externalOnChange, options});

    return (
        <Context.Provider value={{ value, onChange: onChange as any }}>
            <ErrorProvider value={error ?? formError?.message}>
                {children}
            </ErrorProvider>
        </Context.Provider>
    )
}