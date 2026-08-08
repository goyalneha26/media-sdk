export class EventEmitter {
    listeners = new Map();
    on(event, listener) {
        const listeners = this.listeners.get(event) || [];
        listeners.push(listener);
        this.listeners.set(event, listeners);
    }
    emit(event, data) {
        const listeners = this.listeners.get(event);
        if (!listeners) {
            return;
        }
        listeners.forEach((listener) => listener(data));
    }
    off(event, listener) {
        const listeners = this.listeners.get(event);
        if (!listeners) {
            return;
        }
        this.listeners.set(event, listeners.filter((l) => l !== listener));
    }
}
//# sourceMappingURL=EventEmitter.js.map