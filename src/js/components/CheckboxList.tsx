import useHybridInput from "@enymo/react-hybrid-input-hook";
import React, { createContext, useCallback, useContext } from "react";
import { ErrorProvider } from "../hooks/ErrorContext";
import { CheckboxListProps } from "../types";

type OnChange = (value: (string | number)[]) => void;
type Toggle = (name: string | number) => void;

const Context = createContext<{
    value: (string | number)[],
    onChange: OnChange,
    /** @deprecated */
    toggle: Toggle
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
        <Context.Provider value={{ value, toggle: handleToggle as Toggle, onChange: onChange as OnChange}}>
            <ErrorProvider value={error}>
                {children}
            </ErrorProvider>
        </Context.Provider>
    )
}