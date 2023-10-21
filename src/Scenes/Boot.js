import Phaser from 'phaser';

class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.spritesheet('antRed', 'assets/antRed2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('foodStrawberry', 'assets/food/foodStrawberry.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('foodMeat', 'assets/food/foodMeat.png', { frameWidth: 32, frameHeight: 32 });

        // Load Red Ant Sprite
        this.load.spritesheet('antRedHead', 'assets/antRed/antRedHead.png', { frameWidth: 27, frameHeight: 24 });
        this.load.image('antRedThorax', 'assets/antRed/antRedThorax.png');
        this.load.spritesheet('antRedAbdomen', 'assets/antRed/antRedAbdomen.png', { frameWidth: 19, frameHeight: 26 });
        this.load.spritesheet('antRedLegs', 'assets/antRed/antRedLegs.png', { frameWidth: 26, frameHeight: 43 });

        this.load.image('flowerBlue', 'assets/plants/flowerBlue.png');
        this.load.image('flowerRed', 'assets/plants/flowerRed.png');
        this.load.image('flowerYellow', 'assets/plants/flowerYellow.png');
        this.load.image('flowerGreen', 'assets/plants/flowerGreen.png');
        this.load.image('grass', 'assets/plants/grass.png');

        this.load.audio('eatSound', 'assets/sounds/eating.mp3');
        
        this.game.config.textStyles = {
            default: {
                fontFamily: 'Amatic SC',
                fill: '#fff'
            },
            dropShadow: {
                stroke: '#000',
                strokeThickness: 1,
                shadow: {
                    offsetX: 1,
                    offsetY: 1,
                    color: '#000',
                    blur: 10,
                    stroke: true,
                    faill: true
                }
            }
        };
    }

    create() {
        this.scene.start('Play');
    }
}

export default Boot;