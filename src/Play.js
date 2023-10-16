import Phaser from 'phaser';
import foodItems from './json/foodItems.json';

class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    // Core Functions
    create() {
        this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'grass').setOrigin(0, 0);
        this.add.text(10, 10, '🐜 Ant Sim My Pants 👖', { fontSize: '34px', fill: '#fff' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.prepareFoodItems();
        this.preparePlayerCharacter();    
    };

    update() {
        this.handlePlayerMovement();
    }

    
    // Secondary Functions

    handleFoodItemCollision (ant, foodItem) {
        console.log(
            `Ant collided with ${foodItem.getData('foodValue')} food value item.`
        );
        foodItem.destroy();
    }

    prepareFoodItems() {
        const foodItemCount = Phaser.Math.Between(3, 15);
        const foodItemsTotal = foodItems.length;
        this.foodItemGroup = this.add.group();

        for (let i = 0; i < foodItemCount; i++) {
            const coords = this.getRandomCoords(50, 50, 50, 50);
            const randomFoodIndex = Phaser.Math.Between(0, foodItemsTotal - 1);
            const foodSprite = this.add.sprite(coords.x, coords.y, foodItems[randomFoodIndex].sprite);
            foodSprite.setOrigin(0, 0);
            foodSprite.setData('foodValue', foodItems[randomFoodIndex].foodValue);
            this.foodItemGroup.add(foodSprite);
        }

        console.log(this.foodItemGroup);

        this.physics.add.collider(this.ant, this.foodItemGroup, (ant, foodItem) => {
            console.log(
                `Ant collided with ${foodItem.getData('foodValue')} food value item.`
            );
        });
    }

    /**
     * Picks a random location on the screen.
     * Optionally accounts for clearance on the top Top and Bottom.
     * @param {integer} clearanceTopX 
     * @param {integer} clearanceTopY 
     * @param {integer} clearanceBottomX 
     * @param {integer} clearanceBottomY 
     * @returns 
     */
    getRandomCoords(clearanceTopX = 0, clearanceTopY = 0, clearanceBottomX = 0, clearanceBottomY = 0) {
        return {
            x: Phaser.Math.Between(0 + clearanceTopX, this.game.config.width - clearanceBottomX),
            y: Phaser.Math.Between(0 + clearanceTopY, this.game.config.height - clearanceBottomY)
        }
    }

    /**
     * Create player sprite, animations, and data.
     */
    preparePlayerCharacter() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('antRed', { start: 0, end: 1 }),
            framerate: 10,
            repeat: -1
        });

        this.ant = this.add.sprite(100, 300, 'antRed');
        this.ant.setInteractive();
        this.ant.setData('health', 100);
        this.ant.setData('food', 100);
        this.ant.setData('speed', 1.25)
        this.ant.setData('effects', {
            speedBoost: false,
            healthBoost: false
        });
    }

    /**
     * Setup player movement, animation enabling, and controls.
     */
    handlePlayerMovement() {
        const speed = this.ant.getData('speed');
        if (this.cursors.up.isDown) {
            this.ant.y -= speed;
            this.ant.rotation = 0;
            this.ant.anims.play('walk', true);
        } else if (this.cursors.down.isDown) {
            this.ant.y += speed;
            this.ant.rotation = Math.PI;
            this.ant.anims.play('walk', true);
        } else if (this.cursors.left.isDown) {
            this.ant.x -= speed;
            this.ant.rotation = -Math.PI / 2;
            this.ant.anims.play('walk', true);
        } else if (this.cursors.right.isDown) {
            this.ant.x += speed;
            this.ant.rotation = Math.PI / 2;
            this.ant.anims.play('walk', true);
        } else {
            this.ant.anims.play('walk', false);
        }
    }
}

export default Play;