import {
    useCallback
}
from "react";


export interface GridHookOptions {

    onLoadMore?: () => void | Promise<void>;

    hasMore?: boolean;

    loading?: boolean;

}


export function useGrid({

    onLoadMore,

    hasMore = false,

    loading = false

}: GridHookOptions) {


    const getGridProps =
    useCallback(() => ({

        role: "list"

    }), []);



    const getLoadMoreProps =
    useCallback(() => ({

        type: "button" as const,

        disabled:
            loading ||
            !hasMore,

        onClick:
            async () => {

                if (
                    onLoadMore &&
                    hasMore &&
                    !loading
                ) {

                    await onLoadMore();

                }

            }

    }), [

        onLoadMore,

        hasMore,

        loading

    ]);



    return {

        getGridProps,

        getLoadMoreProps

    };

}