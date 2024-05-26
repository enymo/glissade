import useHybridInput from "@enymo/react-hybrid-input-hook";
import React, { createContext, useCallback, useContext } from "react";
import { ErrorProvider } from "../Hooks/ErrorContext";
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
    error,
    children
}: CheckboxListProps<T>) {
    const {value, onChange, error: formError} = useHybridInput({name, externalValue, externalOnChange, options, defaultValue: []})

    const handleToggle = useCallback((name: T) => {
        onChange(value.includes(name) ? value.filter(value => value !== name) : [...value, name]);
    }, [value, onChange])

    return (
        <Context.Provider value={{ value, toggle: handleToggle as any }}>
            <ErrorProvider value={error ?? formError?.message}>
                {children}
            </ErrorProvider>
        </Context.Provider>
    )
}