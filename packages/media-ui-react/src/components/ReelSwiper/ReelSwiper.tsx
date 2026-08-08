
import type {
    ReactNode
} from "react";

import {
    useReelSwiper
} from "./useReelSwiper.js";


export interface ReelSwiperProps {

    items: ReactNode[];

    onActiveChange?: (
        index: number
    ) => void;

    className?: string;

    itemClassName?: string;

    showControls?: boolean;

}


export function ReelSwiper({

    items,

    onActiveChange,

    className,

    itemClassName,

    showControls = true

}: ReelSwiperProps) {


    const {

        containerRef,

        activeIndex,

        next,

        previous,

        setItemRef,

        getContainerProps,

        getItemProps

    } = useReelSwiper({

        itemCount:
            items.length,

        onActiveChange

    });


    return (

        <div
            style={{
                position: "relative",
                width: "100%"
            }}
        >

            {showControls && (

                <button
                    type="button"

                    onClick={previous}

                    disabled={
                        activeIndex === 0
                    }

                    aria-label="Previous reel"

                    style={{
                        position:
                            "absolute",

                        left: "8px",

                        top: "50%",

                        transform:
                            "translateY(-50%)",

                        zIndex: 2,

                        border: "none",

                        borderRadius:
                            "50%",

                        width: "40px",

                        height: "40px",

                        cursor:
                            activeIndex === 0
                                ? "default"
                                : "pointer",

                        background:
                            "rgba(0,0,0,0.65)",

                        color: "white",

                        fontSize: "20px"
                    }}
                >
                    ‹
                </button>

            )}


            <div
                ref={containerRef}

                {...getContainerProps()}

                className={className}

                data-active-index={
                    activeIndex
                }

                style={{
                    display: "flex",

                    flexDirection: "row",

                    gap: "16px",

                    overflowX: "auto",

                    overflowY: "hidden",

                    scrollSnapType:
                        "x mandatory",

                    scrollBehavior: "smooth",

                    width: "100%",

                    outline: "none"
                }}

            >

                {items.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}

                            ref={
                                setItemRef(index)
                            }

                            {...getItemProps(index)}

                            className={
                                itemClassName
                            }

                            data-active={
                                activeIndex ===
                                index
                            }

                            style={{
                                flex:
                                    "0 0 80%",

                                scrollSnapAlign:
                                    "center"
                            }}

                        >

                            {item}

                        </div>

                    )
                )}

            </div>


            {showControls && (

                <button
                    type="button"

                    onClick={next}

                    disabled={
                        activeIndex >=
                        items.length - 1
                    }

                    aria-label="Next reel"

                    style={{
                        position:
                            "absolute",

                        right: "8px",

                        top: "50%",

                        transform:
                            "translateY(-50%)",

                        zIndex: 2,

                        border: "none",

                        borderRadius:
                            "50%",

                        width: "40px",

                        height: "40px",

                        cursor:
                            activeIndex >=
                            items.length - 1
                                ? "default"
                                : "pointer",

                        background:
                            "rgba(0,0,0,0.65)",

                        color: "white",

                        fontSize: "20px"
                    }}
                >
                    ›
                </button>

            )}

        </div>

    );

}

