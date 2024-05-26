import { useDisabled, useLoading } from "@enymo/react-form-component";
import React, { useCallback, useState } from "react";

export default function useGlissadeButton({submit = false, loading, disabled, onClick}: {
    submit?: boolean
    loading?: boolean,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent) => void | Promise<void>
}) {
    const [loadingState, setLoadingState] = useState(false);
    const loadingContext = useLoading();
    const disabledContext = useDisabled();

    const handleClick: React.MouseEventHandler = useCallback(async e => {
        try {
            setLoadingState(true);
            await onClick?.(e);
        }
        finally {
            setLoadingState(false);
        }
    }, [setLoadingState, onClick]);

    return {
        loading: loading ?? (submit ? loadingContext : undefined) ?? loadingState,
        disabled: disabled ?? disabledContext ?? loading ?? false,
        onClick: handleClick
    }
}