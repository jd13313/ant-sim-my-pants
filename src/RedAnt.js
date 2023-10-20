class RedAnt extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'antRed2');
        this.scene.add.existing(this);
        this.setInteractive();

        this.setData('stats', {
            health: 100,
            intelligence: 1,
            strength: 1,
            dexterity: 1,
            constitution: 1
        });

        this.setData('activeEffects', {
            speedBoost: false,
            healthBoost: false,
            attackBoost: false
        });

        this.animsList = this.getAnimations();
        this.prepareAnimations();
    }

    getAnimations() {
        const animations = [
            {
                key: 'redAntWalk',
                frames: this.anims.generateFrameNumbers('antRed', { start: 0, end: 1 }),
                framerate: 10,
                repeat: -1
            }
        ];

        return animations;
    }

    prepareAnimations() {
        this.animsList.forEach(animation => {
            this.anims.create(animation);
        });
    }

    calculateMoveDistance() {
        const speed = this.getData('stats')?.dexterity;
        // todo: Eventually do some math here

        return speed;
    }

    moveInDirection(direction) {
        const distance = this.calculateMoveDistance();

        switch (direction) {
            case 'up':
                this.y -= distance;
                this.rotation = 0;
                this.anims.play('redAntWalk', true);
                break;
            case 'down':
                this.y += distance;
                this.rotation = Math.PI;
                this.anims.play('redAntWalk', true);
                break;
            case 'left':
                this.x -= distance;
                this.rotation = -Math.PI / 2;
                this.anims.play('redAntWalk', true);
                break;
            case 'right':
                this.x += distance;
                this.rotation = Math.PI / 2;
                this.anims.play('redAntWalk', true);
                break;
            default:
                this.anims.play('redAntWalk', false);
                break;
        }
    }

    addHealth(amount) {
        const currentHealth = this.getData('stats').health;

        this.setData('stats.health', currentHealth + amount);
    }

    removeHealth(amount) {
        this.addHealth(-amount)
    }
}

export default RedAnt;