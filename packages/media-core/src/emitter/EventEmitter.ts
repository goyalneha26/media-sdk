import type { MediaEvent, MediaEventType } from "../types/events.js";

type EventListener = (event: MediaEvent) => void;

export class EventEmitter {

    private listeners: Map<MediaEventType, EventListener[]> = new Map();


    public on(
        event: MediaEventType,
        listener: EventListener
    ): void {

        const listeners = this.listeners.get(event) ?? [];

        listeners.push(listener);

        this.listeners.set(event, listeners);
    }


    public emit(
        event: MediaEvent
    ): void {

        const listeners = this.listeners.get(event.type) ?? [];

        listeners.forEach(listener => {
            listener(event);
        });
    }


    public off(
        event: MediaEventType,
        listener: EventListener
    ): void {

        const listeners = this.listeners.get(event) ?? [];

        this.listeners.set(
            event,
            listeners.filter(item => item !== listener)
        );
    }
}