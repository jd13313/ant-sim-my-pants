import Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.spritesheet('antRed', '../assets/antRed.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('foodStrawberry', '../assets/food/foodStrawberry.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('flowerBlue', '../assets/plants/flowerBlue.png');
        this.load.image('flowerRed', '../assets/plants/flowerRed.png');
        this.load.image('flowerYellow', '../assets/plants/flowerYellow.png');
        this.load.image('flowerGreen', '../assets/plants/flowerGreen.png');
        this.load.image('grass', '../assets/plants/grass.png');

        this.load.audio('eatSound', '../assets/sounds/eating.mp3');
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;