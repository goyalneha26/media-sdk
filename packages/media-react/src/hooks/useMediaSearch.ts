import {
    useCallback,
    useContext,
    useState
} from "react";

import {
    MediaContext
} from "../context.js";

import type {
    PexelsPhoto
} from "@media-sdk/core";


export function useMediaSearch() {

    const context = useContext(MediaContext);

    if (!context) {
        throw new Error(
            "useMediaSearch must be used inside MediaProvider"
        );
    }

    const {
        client
    } = context;

    const [photos, setPhotos] = useState<PexelsPhoto[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<unknown>(null);


    const search = useCallback(
        async (query: string) => {

            setLoading(true);
            setError(null);

            try {

                const response =
                    await client.searchPhotos(query);

                setPhotos(
                    response.photos ?? []
                );

            } catch (err) {

                console.error(
                    "Media search failed:",
                    err
                );

                setError(err);

                setPhotos([]);

            } finally {

                setLoading(false);

            }

        },
        [client]
    );


    return {
        photos,
        loading,
        error,
        search
    };
}