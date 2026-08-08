import {
    useCallback,
    useEffect
} from "react";


import type {
    MouseEvent
} from "react";


export interface UseLightboxOptions {

    open: boolean;

    onClose: () => void;

}


export function useLightbox({

    open,

    onClose

}: UseLightboxOptions) {


    const handleKeyDown =
    useCallback(

        (event: KeyboardEvent) => {

            if (
                event.key === "Escape" &&
                open
            ) {

                onClose();

            }

        },

        [
            open,
            onClose
        ]

    );


    useEffect(() => {

        if (!open) {

            return;

        }


        document.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [
        open,
        handleKeyDown
    ]);


    const getBackdropProps =
    useCallback(() => ({

        role: "presentation" as const,

        onMouseDown: (
            event: MouseEvent
        ) => {

            if (
                event.target ===
                event.currentTarget
            ) {

                onClose();

            }

        }

    }), [
        onClose
    ]);


    const getCloseButtonProps =
    useCallback(() => ({

        type: "button" as const,

        "aria-label":
            "Close lightbox",

        onClick: onClose

    }), [
        onClose
    ]);


    return {

        getBackdropProps,

        getCloseButtonProps

    };

}