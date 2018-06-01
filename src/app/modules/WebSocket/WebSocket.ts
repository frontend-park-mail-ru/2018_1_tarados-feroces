import bus from '../Bus/Bus';
import * as HttpConstants from '../../constants/HttpConstants';

class Ws {
    public address: string;
    public ws: any;
    public messages: any;

    constructor() {
        this.messages = {
            ADD_AS_FRIEND: 'AskForFriendship',
            INVITE_TO_PARTY: 'InviteToParty',
            LEAVE_PARTY: 'LeaveParty',
            JOIN_GAME: 'JoinGame',
            GAME_READY: 'GameReady',
            ASK_FOR_GAME: 'AskForJoinGame',
            PARTY_VIEW: 'PartyView',
            INIT_GAME: 'InitGame',
            GAME_PREPARE: 'GamePrepare',
            LEAVE_GAME: 'LeaveGame',
            SERVER_SNAP: 'ServerSnap',
            CLIENT_SNAP: 'ClientSnap',
            INTERRUPT_GAME: 'InterruptGame',
            EMPTY_PARTY: 'EmptyPartyView',
        };
    }

    open() {
        this.address = HttpConstants.WS_ADDRESS;
        this.ws = new WebSocket(this.address);
        this.ws.onopen = () => {
            console.log(`WS on ${this.address} was opened`);
            this.ws.onmessage = (message) => {
                const data = JSON.parse(message.data);
                console.log(data);
                bus.emit(data.cls, data);
            };
            this.ws.onclose = () => {
                console.log(`WS on ${this.address} was closed`);
            };
        };
    }

    sendMessage(cls, message) {
        console.log('SENDING...');
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            message['cls'] = cls;

            if (message !== null && typeof message === 'object') {
                this.ws.send(JSON.stringify(message));
            } else {
                this.ws.send(JSON.stringify({message}));
            }
        }
        console.log('SENT: ', {cls: cls, data: message});
    }

    close(code, reason) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close(code, reason);
        }
    }
}

const ws = new Ws();
export default ws;
