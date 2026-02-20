import { useDisabled } from "@enymo/react-form-component";
import _ from "lodash";
import { useFormContext } from "react-hook-form";

export default function useGlissadeInput({name, error, disabled}: {
    name?: string,
    error?: string,
    disabled?: boolean
}) {
    const form = useFormContext();
    const disabledContext = useDisabled();
    
    return {
        error: error ?? (name !== undefined ? _.get(form?.formState.errors, name)?.message as string : undefined),
        disabled: disabled ?? disabledContext ?? false
    }
}