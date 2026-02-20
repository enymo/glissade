import type React from "react";
import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

export interface InputChoiceValue<T extends string> {
    label: ReactNode,
    value: T,
    disabled?: boolean
}

export interface InputChoiceGroup<T extends string> {
    label: string,
    value: InputChoiceValue<T>[],
    disabled?: boolean
}

export type InputChoice<T extends string> = InputChoiceValue<T> | InputChoiceGroup<T>;

export function isInputChoiceValue<T extends string>(input: InputChoiceValue<T> | InputChoiceGroup<T>): input is InputChoiceValue<T> {
    return typeof input.value === "string";
}

export interface GlissadeInputProps<T extends string = string> {
    id?: string,
    className?: string,
    textareaClassName?: string,
    selectClassName?: string,
    inputClassName?: string,
    type?: React.HTMLInputTypeAttribute | "textarea" | "select",
    name?: string,
    options?: RegisterOptions,
    value?: T,
    onChange?: (value: T) => void,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    placeholder?: string,
    disabled?: boolean,
    choices?: InputChoice<T>[],
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
    value?: T | null,
    onChange?: (value: T | null) => void,
    options?: RegisterOptions,
    error?: string,
    children: React.ReactNode
}