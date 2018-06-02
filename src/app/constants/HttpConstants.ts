const HTTP_DOMEN: string = exports.HTTP_DOMEN = '/api';
const WS_ADDRESS: string = exports.WS_ADDRESS = `ws${location.protocol === 'https:' ? 's' : ''}://deadlinez.net/ws`;
// export const HTTP_DOMEN: string = 'http://api.deadlinez.net:8080/api';
// export const WS_ADDRESS: string = 'ws://api.deadlinez.net:8080/session';
export const POST: string = 'POST';
export const GET: string = 'GET';
export const HEADER_CONTENT_TYPE: string = 'Content-Type';
export const JSON_CONTENT_TYPE: string = 'application/json;charset=UTF-8';

export const GET_USER: string = '/user';
export const SIGNUP: string = '/signup';
export const LOGIN: string = '/signin';
export const UPDATE_USER: string = '/user/update';
export const LOGOUT: string = '/signout';

export const GET_LEADERS: string = '/leaderboard';

export const GET_NEWS: string = '/news';

export const GET_PEOPLE: string = '/allusers';
export const GET_FRIENDS: string = '/user/friend/all';

export const GET_PARTY: string = '/party/get';

export const SEND_FRIENDS_INVITE: string = '/user/friend/add';
export const SEND_PARTY_INVITE: string = '/party/invite';

export const ACCEPT_PARTY_INVITE: string = '/party/join';
export const ACCEPT_FRIENDS_INVITE: string = '/user/friend/response';

export const START_GAME: string = '/game/party';

export const LEAVE_PARTY: string = '/party/leave';



