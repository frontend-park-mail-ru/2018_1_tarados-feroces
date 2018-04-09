'use strict';

const KEYS = {
    LEFT: [],
    RIGHT: [],
    UP: [],
    DOWN: []
};

export default class GameCore {
    constructor() {}

    start() {}

    _pressed() {
        return KEYS[name].some((key) => data[key]);
    }
}
