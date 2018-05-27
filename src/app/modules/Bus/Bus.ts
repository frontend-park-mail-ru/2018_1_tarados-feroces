class Bus {
    private listeners: any;

    constructor() {
        this.listeners = {};
    }

    on(event, listener) {
        (this.listeners[event] || (this.listeners[event] = [])).push(listener);
        return this;
    }

    off(event, listener) {
        if (listener) {
            this.listeners[event] = (this.listeners[event] || []).filter((item) => item !== listener);
        } else {
            this.listeners[event] = [];
        }
        return this;
    }

    emit(event, data) {
        (this.listeners[event] || (this.listeners[event] = [])).forEach((item) => item(data));
        return this;
    }
}

const bus = new Bus();
export default bus;
