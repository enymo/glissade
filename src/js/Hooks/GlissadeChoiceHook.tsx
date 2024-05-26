import { useDisabled } from "@enymo/react-form-component";
import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckboxList } from "../Components/CheckboxList";
import { useRadioGroup } from "../Components/RadioGroup";
import { GlissadeChoiceProps } from "../types";
import { useError } from "./ErrorContext";

export default function useGlissadeChoice({
    name,
    options,
    value,
    error,
    disabled,
    checked: checkedProp,
    onChange
}: GlissadeChoiceProps) {
    const radioListContext = useRadioGroup();
    const checkboxListContext = useCheckboxList();
    const form = useFormContext();
    const disabledContext = useDisabled();
    const errorContext = useError();

    const { onChange: onChangeForm, ...register } = (name && form && !radioListContext && !checkboxListContext) ? form.register(name, disabled ? undefined : options) : { onChange: undefined };
    
    const checked = useMemo(() => checkedProp ?? ( value !== undefined ? (
        (typeof value !== "boolean" && checkboxListContext?.value.includes(value)) || radioListContext?.value === value
    ) : undefined), [checkboxListContext, radioListContext, checkedProp, value])

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        onChange?.(e.target.checked);
        if (value !== undefined) {
            if (typeof value !== "boolean") {
                checkboxListContext?.toggle(value);
            }
            radioListContext?.onChange(value);
        }
        onChangeForm?.(e);
    }, []);

    return {
        checked,
        onChange: handleChange,
        disabled: disabled ?? disabledContext ?? false,
        error: error ?? errorContext ?? (name !== undefined ? _.get(form.formState.errors, name)?.message as string : undefined),
        ...register
    }
}