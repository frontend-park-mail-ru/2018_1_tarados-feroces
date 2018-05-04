class Ws {
    constructor(address, onmessage, onclose) {
        self.address = address;
        this.ws = new WebSocket(self.address);
        this.ws.onopen = (event) => {
            console.log(`WS on ${self.address} is opened`);
            this.ws.onmessage = onmessage;
            this.ws.onclose = onclose;
        };
    }

    sendMessage(message) {
        if (message !== null && typeof message === 'object') {
            this.ws.send(JSON.stringify(message));
        } else {
            this.ws.send(JSON.stringify({message}));
        }
    }
};

export const Ws1 = new Ws(
    'ws://api.deadlinez.net:8080/game',
    (message) => console.log(message),
    (message) => console.log(message)
);