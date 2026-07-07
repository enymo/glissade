import classNames from "classnames";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { GlissadeInputProps, isInputChoiceValue } from "../types";

export default function GlissadeInput<T extends string = string>({
    ref,
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
}: GlissadeInputProps<T>) {
    const form = useFormContext();
    const onChange = useMemo(() => onChangeProp && ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChangeProp(e.target.value as T)), [onChangeProp]);
    const {ref: registerRef, ...register} = name !== undefined ? form?.register(name, options) : {};

    const handleSetRef = (node: HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement | null) => {
        registerRef?.(node);
        if (ref instanceof Function) {
            ref(node);
        }
        else if (ref !== undefined && ref !== null) {
            ref.current = node;
        }
    }
    
    switch (type) {
        case "textarea":
            return (
                <textarea
                    ref={handleSetRef}
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
                    ref={handleSetRef}
                    className={classNames(className, selectClassName)}
                    onChange={onChange}
                    {...props}
                    {...register}
                >
                    {props.placeholder && <option value="" hidden>{props.placeholder}</option>}
                    {choices?.map(choice => isInputChoiceValue(choice) ? (
                        <option key={choice.value} value={choice.value} disabled={choice.disabled ?? false}>{choice.label}</option>
                    ) : (
                        <optgroup key={choice.label} label={choice.label} disabled={choice.disabled ?? false}>
                            {choice.value.map(({label, value, disabled}) => (
                                <option key={value} value={value} disabled={disabled}>{label}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            )
        default:
            return (
                <input
                    ref={handleSetRef}
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