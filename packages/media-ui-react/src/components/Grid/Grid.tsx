
import type {
    ReactNode
} from "react";

import {
    useGrid
} from "./useGrid.js";


export interface GridProps<T> {

    items: T[];

    getKey?: (
        item: T
    ) => string;

    renderItem?: (
        item: T,
        index: number
    ) => ReactNode;

    onItemClick?: (
        item: T,
        index: number
    ) => void;

    onLoadMore?: () => void;

    hasMore?: boolean;

    loading?: boolean;

}


export function Grid<T>({
    items,
    getKey,
    renderItem,
    onItemClick,
    onLoadMore,
    hasMore = false,
    loading = false
}: GridProps<T>) {


    const {
        getGridProps,
        getLoadMoreProps
    } = useGrid({

        onLoadMore,

        hasMore,

        loading

    });


    return (

        <div
            {...getGridProps()}
        >

            {items.map(
                (item, index) => (

                    <div
                        key={
                            getKey
                                ? getKey(item)
                                : index
                        }

                        onClick={() => {

                            if (onItemClick) {

                                onItemClick(
                                    item,
                                    index
                                );

                            }

                        }
                    }
                        style={{
                            cursor:
                                onItemClick
                                    ? "pointer"
                                    : undefined
                        }}

                    >

                        {renderItem
                            ? renderItem(
                                item,
                                index
                            )
                            : null}

                    </div>

                )
            )}


            {hasMore && (

                <button
                    {...getLoadMoreProps()}
                >

                    {loading
                        ? "Loading..."
                        : "Load more"}

                </button>

            )}

        </div>

    );

}

