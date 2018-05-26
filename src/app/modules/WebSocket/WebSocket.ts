class Ws {
    public address: string;
    public ws: any;
    open(address, onmessage, onclose) {
        this.address = address;
        this.ws = new WebSocket(this.address);
        this.ws.onopen = () => {
            console.log(`WS on ${this.address} is opened`);
            this.ws.onmessage = onmessage;
            this.ws.onclose = onclose;
        };
    }

    sendMessage(cls, message) {
        message['cls'] = cls;
        console.log(message);

        if (message !== null && typeof message === 'object') {
            this.ws.send(JSON.stringify(message));
        } else {
            this.ws.send(JSON.stringify({message}));
        }
    }

    close(code, reason) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close(code, reason);
        }
    }
}

const ws = new Ws();
export default ws;