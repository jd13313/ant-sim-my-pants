import Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.spritesheet('antRed', '../assets/antRed.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;