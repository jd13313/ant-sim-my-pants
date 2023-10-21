import credits from '../json/credits.json';
import Phaser from 'phaser';

class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        this.cameras.main.setBackgroundColor('#ccc');
        const startY = 50;
        const lineHeight = 30;
        const textStyles = this.game.config.textStyles.default;
        const textConfig = {
            ...textStyles,
            fontSize: '25px',
        }

        this.add.text(10, 10, 'Credits', { ...textConfig, fontSize: '34px' });
        this.add.text(this.game.config.width - 70, 10, '[ close ]', textConfig).setInteractive().on('pointerdown', () => {
           this.scene.switch('Play');
        });

        credits.forEach((credit, index) => {
            this.add.text(10, startY + (lineHeight * index), `${credit.role}: ${credit.name}`, textConfig);
        });
    }

    update() {
    }
}

export default Credits;