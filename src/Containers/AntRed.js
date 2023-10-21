class AntRed extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setInteractive();
        this.setupData();
        this.setupSprites();
        
        this.ANT_BODY_PARTS = {
            HEAD: 0,
            THORAX: 1,
            ABDOMEN: 2,
            LEGS: 3
        };
    }

    setupData() {
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
    }

    setupSprites() {
        const head = this.scene.add.sprite(0, 0, 'antRedHead');
        const thorax = this.scene.add.sprite(0, 19, 'antRedThorax');
        const abdomen = this.scene.add.sprite(0, 39, 'antRedAbdomen');

        head.anims.create({
            key: 'antRedHeadBite',
            frames: head.anims.generateFrameNumbers('antRedHead', { start: 0, end: 1 }),
            framerate: 10,
            repeat: 7
        });

        abdomen.anims.create({
            key: 'antRedButtWiggle',
            frames: abdomen.anims.generateFrameNumbers('antRedAbdomen', { start: 0, end: 1 }),
            framerate: 10,
            repeat: 1
        });

        this.add([head, thorax, abdomen]);
    }

    playAnimation(antBodyPartIndex = 0, animationName = 'antRedHeadBite') {
        const sprite = this.getAt(antBodyPartIndex);
        sprite.anims.play(animationName, true);
    }

    bite() {
        this.playAnimation(this.ANT_BODY_PARTS.HEAD, 'antRedHeadBite');
    }

    moveInDirection(direction) {
        const distance = 1;

        switch (direction) {
            case 'up':
            case 'down':
            case 'left':
            case 'right':
                this.playAnimation(this.ANT_BODY_PARTS.ABDOMEN, 'antRedButtWiggle');
            
                switch(direction) {
                    case 'up':
                        this.y -= distance;
                        this.rotation = 0;
                        break;
                    case 'down':
                        this.y += distance;
                        this.rotation = Math.PI;
                        break;
                    case 'left':
                        this.x -= distance;
                        this.rotation = -Math.PI / 2;
                        break;
                    case 'right':
                        this.x += distance;
                        this.rotation = Math.PI / 2;
                        break;
                }
            default:
                break;
        }
    }
}

export default AntRed;