'use strict';

const keyMap = {};

onkeydown = onkeyup = function(event) {
    keyMap[event.keyCode] = (event.type === 'keypress' || event.type === 'keydown');
};

window.addEventListener('keypress', (event) => {
    onkeydown(event);
    // movementControl(event, player);
});

window.addEventListener('keyup', (event) => {
    onkeyup(event);
    // movementControl(event, player);
});

export const checkBorderCollision = (x, y, radius) => {
    if (x - radius <= arena.fieldX || x + radius >= arena.fieldX + arena.fieldWidth) {
        return false;
    }
    if (y - radius <= arena.fieldY || y + radius >= arena.fieldY + arena.fieldHeight) {
        return false;
    }
    return true;
};

export const checkBotCollision = (player) => {
    let result = true;
    round.bots.forEach((item) => {
        const dx = item.x - player.x;
        const dy = item.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if ( dist < (item.radius + player.radius) ) {
            result = false;
        }
    });

    return result;
};

export const movementControl = (player) => {

    let x = 0;
    let y = 0;
    if (keyMap[68]) {
        x += player.speed;
    }
    if (keyMap[65]) {
        x -= player.speed;
    }
    if (keyMap[83]) {
        y += player.speed;
    }
    if (keyMap[87]) {
        y -= player.speed;
    }

    if (!checkBorderCollision(player.x + x, player.y + y, player.radius)) {
        player.move(-x, -y);

        return true;
    }

    player.move(x, y);
    return checkBotCollision(player);
};
