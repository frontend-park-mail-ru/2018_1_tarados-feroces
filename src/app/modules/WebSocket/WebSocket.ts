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
            FINISH_GAME: 'FinishGame',
            SERVER_SNAP: 'ServerSnap',
            CLIENT_SNAP: 'ClientSnap',
            INTERRUPT_GAME: 'InterruptGame',
            EMPTY_PARTY: 'EmptyPartyView'
        };
    }

    open() {
        this.address = HttpConstants.WS_ADDRESS;
        this.ws = new WebSocket(this.address);
        this.ws.onopen = () => {
            console.log(`WS on ${this.address} was opened`);
            this.ws.onmessage = (message) => {
                const data = JSON.parse(message.data);
                // data.cls !== 'ServerSnap' && data.cls !== 'ClientSnap' && console.log(data);
                console.log(data);
                bus.emit(data.cls, data);
            };
            this.ws.onclose = () => {
                console.log(`WS on ${this.address} was closed`);
                // this.open();
            };
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