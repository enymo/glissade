import classNames from "classnames";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { GlissadeInputProps } from "../types";

export default function GlissadeInput({
    className,
    textareaClassName,
    selectClassName,
    inputClassName,
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
                    className={classNames(className, textareaClassName)}
                    onChange={onChange}
                    rows={rows}
                    {...props}
                    {...register}
                />
            )
        case "select":
            return (
                <select
                    className={classNames(className, selectClassName)}
                    onChange={onChange}
                    {...props}
                    {...register}
                >
                    {props.placeholder && <option value="" hidden>{props.placeholder}</option>}
                    {choices?.map(({label, value, disabled = false}) => (
                        <option key={value} value={value} disabled={disabled}>{label}</option>
                    ))}
                </select>
            )
        default:
            return (
                <input
                    className={classNames(className, inputClassName)}
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