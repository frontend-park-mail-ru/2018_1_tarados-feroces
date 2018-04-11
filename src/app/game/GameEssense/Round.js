import Wave from './Wave';

export default class Round {
    constructor(ctx, scene, waves) {
        this.scene = scene;
        this.waves = [];
        this.waveCounter = 0;
        waves.forEach((item) => {
            const wave = new Wave(ctx, this.scene, item);
            this.waves.push(wave);
        });

        // bus.on('WAVE')
    }

    iterateWave() {
        return this.waves[this.waveCounter].moveBots();
    }

    nextWave() {
        ++this.waveCounter;
        console.log(this.waveCounter);
        return this.waveCounter < this.waves.length;
    }
}
