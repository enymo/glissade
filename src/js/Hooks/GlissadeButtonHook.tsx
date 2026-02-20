import { useDisabled, useLoading } from "@enymo/react-form-component";
import { useCallback, useState } from "react";

export default function useGlissadeButton<T extends (...args: any[]) => void | Promise<void>>({submit = false, loading: loadingProp, disabled, onClick}: {
    submit?: boolean
    loading?: boolean,
    disabled?: boolean,
    onClick?: T
}) {
    const [loadingState, setLoadingState] = useState(false);
    const loadingContext = useLoading();
    const disabledContext = useDisabled();

    const loading = loadingProp ?? (submit ? loadingContext : undefined) ?? loadingState;

    const handleClick = useCallback(async (...args: any[]) => {
        try {
            setLoadingState(true);
            await onClick?.(...args);
        }
        finally {
            setLoadingState(false);
        }
    }, [setLoadingState, onClick]);

    return {
        loading: loading ?? (submit ? loadingContext : undefined) ?? loadingState,
        disabled: disabled ?? (disabledContext || loading),
        onClick: handleClick as T
    }
}