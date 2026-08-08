import type { MediaEvent, MediaEventType } from "../types/events.js";
type EventListener = (event: MediaEvent) => void;
export declare class EventEmitter {
    private listeners;
    on(event: MediaEventType, listener: EventListener): void;
    emit(event: MediaEventType, data: MediaEvent): void;
    off(event: MediaEventType, listener: EventListener): void;
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map