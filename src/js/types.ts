import type React from "react";
import { RegisterOptions } from "react-hook-form";

export interface InputChoice {
    label: React.ReactNode,
    value: string,
    disabled?: boolean
}

export interface GlissadeInputProps {
    className?: string,
    type?: React.HTMLInputTypeAttribute | "textarea" | "select",
    name?: string,
    options?: RegisterOptions,
    value?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    disabled?: boolean,
    choices?: InputChoice[],
    rows?: number,
    min?: number,
    max?: number,
    step?: number
}

export interface GlissadeChoiceProps {
    name?: string,
    options?: RegisterOptions,
    value?: string | number | boolean,
    error?: string,
    disabled?: boolean,
    checked?: boolean,
    onChange?: (value: boolean) => void
}

export interface CheckboxListProps<T extends string | number> {
    name?: string,
    value?: T[],
    onChange?: (value: T[]) => void,
    options?: RegisterOptions,
    error?: string
    children: React.ReactNode,
}

export interface RadioGroupProps<T extends string | number | boolean> {
    name?: string,
    value?: T,
    onChange?: (value: T) => void,
    options?: RegisterOptions,
    error?: string,
    children: React.ReactNode
}