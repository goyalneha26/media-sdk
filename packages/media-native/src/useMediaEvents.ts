import {
    useContext,
    useEffect
} from "react";


import type {
    MediaEvent,
    MediaEventType
} from "@media-sdk/core";


import {
    MediaNativeContext
} from "./context.js";


export function useMediaEvents(

    eventType: MediaEventType,

    listener: (
        event: MediaEvent
    ) => void

): void {


    const context =
        useContext(
            MediaNativeContext
        );


    if (!context) {

        throw new Error(
            "useMediaEvents must be used inside MediaProvider"
        );

    }


    const {
        emitter
    } = context;


    useEffect(() => {

        emitter.on(
            eventType,
            listener
        );


        return () => {

            emitter.off(
                eventType,
                listener
            );

        };

    }, [

        emitter,

        eventType,

        listener

    ]);

}