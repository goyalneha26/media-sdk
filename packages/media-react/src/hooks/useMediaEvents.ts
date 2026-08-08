import {
    useContext,
    useEffect
} from "react";

import {
    MediaContext
} from "../context.js";

import type {
    MediaEvent,
    MediaEventType
} from "@media-sdk/core";


export function useMediaEvents(
    event: MediaEventType,
    callback: (event: MediaEvent) => void
): void {

    const context = useContext(MediaContext);

    if (!context) {
        throw new Error(
            "useMediaEvents must be used inside MediaProvider"
        );
    }

    const {
        emitter
    } = context;


    useEffect(() => {

        const listener = (
            eventData: MediaEvent
        ) => {

            callback(eventData);

        };


        emitter.on(
            event,
            listener
        );


        return () => {

            emitter.off(
                event,
                listener
            );

        };

    }, [
        emitter,
        event,
        callback
    ]);

}