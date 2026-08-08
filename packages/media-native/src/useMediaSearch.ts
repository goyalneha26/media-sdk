import {
    useCallback,
    useContext,
    useState
} from "react";

import type {
    PexelsClient
} from "@media-sdk/core";

import {
    MediaNativeContext
} from "./context.js";


type SearchResponse =
    Awaited<
        ReturnType<
            PexelsClient["searchPhotos"]
        >
    >;


export interface UseMediaSearchResult {

    data: SearchResponse | null;

    loading: boolean;

    error: Error | null;

    search: (
        query: string,
        page?: number
    ) => Promise<void>;

}


export function useMediaSearch():
    UseMediaSearchResult {


    const context =
        useContext(
            MediaNativeContext
        );


    if (!context) {

        throw new Error(
            "useMediaSearch must be used inside MediaProvider"
        );

    }


    const {
        client
    } = context;


    const [
        data,
        setData
    ] = useState<
        SearchResponse | null
    >(null);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState<Error | null>(null);


    const search =
        useCallback(

            async (
                query: string,
                page = 1
            ) => {

                setLoading(true);

                setError(null);


                try {

                    const result =
                        await client.searchPhotos(
                            query,
                            page
                        );


                    setData(result);

                }
                catch (err) {

                    const normalizedError =
                        err instanceof Error
                            ? err
                            : new Error(
                                String(err)
                            );


                    setError(
                        normalizedError
                    );

                }
                finally {

                    setLoading(false);

                }

            },

            [
                client
            ]

        );


    return {

        data,

        loading,

        error,

        search

    };

}