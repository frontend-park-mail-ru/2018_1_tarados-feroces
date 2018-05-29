import Wave from './Wave';

export default class Round {

    public scene: any;
    public waves: any;
    public waveCounter: number;
    public timestamp: any;

    constructor(ctx: any, scene: any, waves: any) {
        this.scene = scene;
        this.waves = [];
        this.waveCounter = 0;
        waves.forEach((item) => {
            const wave = new Wave(ctx, this.scene, item);
            this.waves.push(wave);
        });
        this.timestamp = null;
        // bus.on('WAVE')
    }

    public iterateWave(): void {
        return this.waves[this.waveCounter].moveBots(this.timestamp);
    }

    public nextWave(): boolean {
        this.timestamp = Date.now();
        ++this.waveCounter;
        console.log(this.waveCounter);
        return this.waveCounter < this.waves.length;
    }
}
