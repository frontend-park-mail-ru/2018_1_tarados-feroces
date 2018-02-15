'use strict';

class ObjectParser {
    constructor(object) {
        this.object = object;
    }

    parse(object = this.object) {
        if (!object || !object.object) {
            return object;
        }

        const str = object.object.split(' ');
        object["name"] = str[0];

        for (let i = 1; i < str.length; ++i) {
            const currentProp = str[i].split('=');
            object[currentProp[0]] = currentProp[1].slice(1, -1);
        }

        if (!object.children) {
            return object;
        }

        for (let i = 0; i < object.children.length; ++i) {
            object.children[i] = this.parse(object.children[i]);
        }

        return object;
    }
}

const obj = {object: 'lol class="cool"', children: [
        { object: 'kek class="Vlad" id="great"' },
        { object: 'super class="Vlad-Mentor" id="thebest"', children: [
                { object: 'star class="Sanya" id="backend"' }
            ] } ]
};
