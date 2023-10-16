import Phaser from 'phaser';

class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('antRed', { start: 0, end: 1 }),
            framerate: 10,
            repeat: -1
        });

        this.ant = this.add.sprite(200, 500, 'antRed');
        this.ant.anims.play('walk', true);
    };

    update() {
        this.ant.y -= 1;
    }
}

export default Play;