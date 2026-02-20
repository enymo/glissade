import useHybridInput from "@enymo/react-hybrid-input-hook";
import React, { createContext, useCallback, useContext } from "react";
import { ErrorProvider } from "../hooks/ErrorContext";
import { CheckboxListProps } from "../types";

const Context = createContext<{
    value: (string | number)[],
    toggle: (name: string | number) =>void
} | undefined>(undefined);

export const useCheckboxList = () => useContext(Context);
export default function CheckboxList<T extends string | number>({
    name,
    value: externalValue,
    onChange: externalOnChange,
    options,
    error: externalError,
    children
}: CheckboxListProps<T>) {
    const {value, onChange, error} = useHybridInput({name, externalValue, externalOnChange, externalError, options, defaultValue: []})

    const handleToggle = useCallback((name: T) => {
        onChange(value.includes(name) ? value.filter(value => value !== name) : [...value, name]);
    }, [value, onChange])

    return (
        <Context.Provider value={{ value, toggle: handleToggle as any }}>
            <ErrorProvider value={error}>
                {children}
            </ErrorProvider>
        </Context.Provider>
    )
}