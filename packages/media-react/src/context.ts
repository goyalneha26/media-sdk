import {
    createContext,
    useContext
} from "react";

import type {
    PexelsClient,
    EventEmitter
}
from "@media-sdk/core";



export interface MediaContextValue {


    client: PexelsClient;


    emitter: EventEmitter;


}
export function useMediaContext() {

    const context =
        useContext(MediaContext);


    if (!context) {

        throw new Error(
            "useMediaContext must be used inside MediaProvider"
        );

    }


    return context;

}


export const MediaContext =
createContext<MediaContextValue | null>(null);