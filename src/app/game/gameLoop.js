const arena = new Arena(ctx);
arena.draw();

const player = new Player(ctx, arena.fieldX + arena.fieldWidth / 2, arena.fieldY + arena.fieldHeight / 2);
player.draw(ctx);

const gameLoop = () => {
    const animation = requestAnimationFrame(gameLoop);
    arena.clear();
    arena.draw();
    if (!movementControl(player)) {
        cancelAnimationFrame(animation);
        const anotherGame = confirm('You died!!! Do you want to play again?');
        anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
    }

    round.bots.forEach((bot) => {
        if (bot.isActive) {
            bot.movement();
        }

    });
    round.checkBots();
    if (round.bots.length === 0) {
        if (!round.initWave()) {
            cancelAnimationFrame(animation);
            const anotherGame = confirm('You won!!! Do you want to play again?');
            anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
        }
    }
};

setTimeout(() => {
    document.getElementById('header').style.display = 'none';
    requestAnimationFrame(gameLoop);
}, 1000);
