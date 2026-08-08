import {
    createContext
} from "react";


import type {
    PexelsClient,
    MediaEvent,
    MediaEventType,
    EventEmitter
} from "@media-sdk/core";


export interface MediaNativeContextValue {

    client: PexelsClient;

    emitter: EventEmitter;

}


export const MediaNativeContext =
    createContext<
        MediaNativeContextValue | undefined
    >(undefined);