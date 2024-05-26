import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { GlissadeInputProps } from "../types";

export default function GlissadeInput({
    type,
    name,
    onChange: onChangeProp,
    options,
    rows,
    min,
    max,
    step,
    choices,
    ...props
}: GlissadeInputProps) {
    const form = useFormContext();
    const onChange = useMemo(() => onChangeProp && ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChangeProp(e.target.value)), [onChangeProp]);
    const register = name !== undefined ? form?.register(name, options) : undefined;
    
    switch (type) {
        case "textarea":
            return (
                <textarea
                    onChange={onChange}
                    rows={rows}
                    {...props}
                    {...register}
                />
            )
        case "select":
            return (
                <select
                    onChange={onChange}
                    {...props}
                    {...register}
                >
                    {props.placeholder && <option value="">{props.placeholder}</option>}
                    {choices?.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            )
        default:
            return (
                <input
                    type={type}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    {...props}
                    {...register}
                />
            )
    }
}