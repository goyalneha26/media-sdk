
import {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import type {
    HTMLAttributes
} from "react";


export interface UseReelSwiperOptions {

    itemCount: number;

    onActiveChange?: (
        index: number
    ) => void;

}


export interface ReelItemProps
    extends HTMLAttributes<HTMLDivElement> {

    "data-reel-index": number;

}


export function useReelSwiper({

    itemCount,

    onActiveChange

}: UseReelSwiperOptions) {


    const containerRef =
        useRef<HTMLDivElement | null>(null);


    const itemRefs =
        useRef<
            Array<HTMLDivElement | null>
        >([]);


    const [
        activeIndex,
        setActiveIndex
    ] = useState(0);


    const setItemRef =
        useCallback(
            (
                index: number
            ) => {

                return (
                    element:
                        HTMLDivElement | null
                ) => {

                    itemRefs.current[index] =
                        element;

                };

            },
            []
        );


    const updateActiveIndex =
        useCallback(() => {

            const container =
                containerRef.current;

            if (!container) {
                return;
            }


            const containerRect =
                container.getBoundingClientRect();


            /*
             * ReelSwiper is horizontal.
             *
             * Therefore we compare LEFT/CENTER positions
             * instead of TOP/CENTER positions.
             */

            const containerCenter =
                containerRect.left +
                containerRect.width / 2;


            let closestIndex = 0;

            let closestDistance =
                Number.POSITIVE_INFINITY;


            itemRefs.current
                .slice(0, itemCount)
                .forEach(
                    (
                        item,
                        index
                    ) => {

                        if (!item) {
                            return;
                        }


                        const rect =
                            item.getBoundingClientRect();


                        const itemCenter =
                            rect.left +
                            rect.width / 2;


                        const distance =
                            Math.abs(
                                containerCenter -
                                itemCenter
                            );


                        if (
                            distance <
                            closestDistance
                        ) {

                            closestDistance =
                                distance;

                            closestIndex =
                                index;

                        }

                    }
                );


            setActiveIndex(
                previousIndex => {

                    if (
                        previousIndex !==
                        closestIndex
                    ) {

                        onActiveChange?.(
                            closestIndex
                        );

                    }

                    return closestIndex;

                }
            );


        }, [
            itemCount,
            onActiveChange
        ]);


    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) {
            return;
        }


        container.addEventListener(
            "scroll",
            updateActiveIndex,
            {
                passive: true
            }
        );


        updateActiveIndex();


        return () => {

            container.removeEventListener(
                "scroll",
                updateActiveIndex
            );

        };


    }, [
        updateActiveIndex
    ]);


    const scrollToIndex =
        useCallback(
            (
                index: number
            ) => {

                if (
                    index < 0 ||
                    index >= itemCount
                ) {

                    return;

                }


                const item =
                    itemRefs.current[index];


                if (!item) {
                    return;
                }


                item.scrollIntoView({

                    behavior: "smooth",

                    block: "nearest",

                    inline: "center"

                });

            },
            [
                itemCount
            ]
        );


    const next =
        useCallback(() => {

            scrollToIndex(
                activeIndex + 1
            );

        }, [
            activeIndex,
            scrollToIndex
        ]);


    const previous =
        useCallback(() => {

            scrollToIndex(
                activeIndex - 1
            );

        }, [
            activeIndex,
            scrollToIndex
        ]);


    const handleKeyDown =
        useCallback(
            (
                event: React.KeyboardEvent<HTMLDivElement>
            ) => {

                if (
                    event.key === "ArrowRight"
                ) {

                    event.preventDefault();

                    next();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    event.preventDefault();

                    previous();

                }

            },
            [
                next,
                previous
            ]
        );


    const getContainerProps =
        useCallback(
            (): HTMLAttributes<HTMLDivElement> => ({

                role: "region",

                "aria-label":
                    "Media reels",

                tabIndex: 0,

                onScroll:
                    updateActiveIndex,

                onKeyDown:
                    handleKeyDown

            }),
            [
                updateActiveIndex,
                handleKeyDown
            ]
        );


    const getItemProps =
        useCallback(
            (
                index: number
            ): ReelItemProps => ({

                "data-reel-index":
                    index,

                role: "group",

                "aria-label":
                    `Reel ${index + 1} of ${itemCount}`

            }),
            [
                itemCount
            ]
        );


    return {

        containerRef,

        activeIndex,

        scrollToIndex,

        next,

        previous,

        setItemRef,

        getContainerProps,

        getItemProps

    };

}

