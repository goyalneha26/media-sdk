import {
    useMemo
} from "react";


import type {
    ReactNode
} from "react";


import {
    AuthManager,
    CacheManager,
    EventEmitter,
    PexelsClient
} from "@media-sdk/core";


import {
    MediaNativeContext
} from "./context.js";


export interface MediaProviderProps {

    apiKey: string;

    children: ReactNode;

}


export function MediaProvider({

    apiKey,

    children

}: MediaProviderProps) {


    const value =
        useMemo(() => {

            const auth =
                new AuthManager({
                    apiKey
                });


            const cache =
                new CacheManager();


            const client =
                new PexelsClient(
                    auth,
                    cache
                );


            const emitter =
                new EventEmitter();


            return {

                client,

                emitter

            };

        }, [
            apiKey
        ]);


    return (

        <MediaNativeContext.Provider
            value={value}
        >

            {children}

        </MediaNativeContext.Provider>

    );

}