export default class Ws {
    constructor(address) {
        self.address = address;
        this.ws = new WebSocket(self.address);
        this.ws.onopen = (event) => {
            console.log(`WS on ${self.address} is opened`);
            this.ws.onmessage = (event) => console.log(event.data);
            this.ws.onclose = (event) => console.log(`WS closed`);
        };
    }

    sendMessage(message) {
        if (message !== null && typeof message === 'object') {
            this.ws.send(JSON.stringify(message));
        } else {
            this.ws.send(JSON.stringify({message}));
        }
    }
}