import Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.spritesheet('antRed', '../assets/antRed.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('flowerBlue', '../assets/plants/flowerBlue.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('flowerRed', '../assets/plants/flowerRed.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('flowerYellow', '../assets/plants/flowerYellow.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('flowerGreen', '../assets/plants/flowerGreen.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('grass', '../assets/plants/grass.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;