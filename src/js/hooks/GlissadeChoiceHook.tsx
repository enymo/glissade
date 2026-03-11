import { useDisabled } from "@enymo/react-form-component";
import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useCheckboxList } from "../components/CheckboxList";
import { useRadioGroup } from "../components/RadioGroup";
import { GlissadeChoiceProps } from "../types";
import { diff, isSubset } from "../util";

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

    const { onChange: onChangeForm, ...register } = (name && form && !radioListContext && !checkboxListContext) ? form.register(name, disabled ? undefined : options) : { onChange: undefined };

    const checked = useMemo(() => checkedProp ?? ( value !== undefined ? (
        (
            typeof value !== "boolean" 
            && checkboxListContext 
            && (
                Array.isArray(value) 
                ? isSubset(value, checkboxListContext.value)
                : checkboxListContext.value.includes(value)
            )
        ) || radioListContext?.value === value
    ) : undefined), [checkboxListContext, radioListContext, checkedProp, value])

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        onChange?.(e.target.checked);
        if (value !== undefined) {
            if (typeof value !== "boolean" && checkboxListContext) {
                if (Array.isArray(value)) {
                    checkboxListContext.onChange(
                        isSubset(value, checkboxListContext.value) 
                            ? diff(checkboxListContext.value, value)
                            : [...checkboxListContext.value, ...diff(value, checkboxListContext.value)]
                    );
                }
                else {
                    checkboxListContext.onChange(
                        checkboxListContext.value.includes(value) 
                        ? checkboxListContext.value.filter(listValue => listValue !== value)
                        : [...checkboxListContext.value, value]
                    )
                }
            }
            if (!Array.isArray(value)) {
                radioListContext?.onChange(value);
            }
        }
        onChangeForm?.(e);
    }, [onChange, radioListContext?.onChange, radioListContext?.value, checkboxListContext?.onChange, checkboxListContext?.value, onChangeForm]);

    return {
        checked,
        onChange: handleChange,
        disabled: disabled ?? disabledContext ?? false,
        error: error ?? (name !== undefined ? _.get(form.formState.errors, name)?.message as string : undefined),
        ...register
    }
}