
import type {
    ReactNode
} from "react";

import {
    useLightbox
} from "./useLightbox.js";


export interface LightboxProps {

    open: boolean;

    onClose: () => void;

    children: ReactNode;

    className?: string;

    contentClassName?: string;

}


export function Lightbox({

    open,

    onClose,

    children,

    className,

    contentClassName

}: LightboxProps) {


    const {

        getBackdropProps,

        getCloseButtonProps

    } = useLightbox({

        open,

        onClose

    });


    if (!open) {

        return null;

    }


    const backdropProps =
        getBackdropProps();


    const closeButtonProps =
        getCloseButtonProps();


    return (

        <div

            {...backdropProps}

            className={className}

            role="dialog"

            aria-modal="true"

            aria-label="Media lightbox"

            style={{

                position: "fixed",

                top: 0,

                left: 0,

                right: 0,

                bottom: 0,

                width: "100vw",

                height: "100vh",

                zIndex: 99999,

                backgroundColor:
                    "rgba(0, 0, 0, 0.85)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                padding: "20px",

                boxSizing: "border-box"

            }}

        >

            <div

                className={contentClassName}

                style={{

                    position: "relative",

                    maxWidth: "95vw",

                    maxHeight: "95vh",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    flexDirection: "column"

                }}

            >

                <button

                    {...closeButtonProps}

                    style={{

                        position: "absolute",

                        top: "-15px",

                        right: "-15px",

                        width: "40px",

                        height: "40px",

                        border: "none",

                        borderRadius: "50%",

                        backgroundColor: "#ffffff",

                        color: "#000000",

                        fontSize: "24px",

                        fontWeight: "bold",

                        cursor: "pointer",

                        zIndex: 100000

                    }}

                >

                    ×

                </button>


                {children}

            </div>

        </div>

    );

}

