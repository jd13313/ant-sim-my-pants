import Phaser from 'phaser';
import foodItems from './json/foodItems.json';
import antStats from './json/antStats.json';

class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    // Core Functions
    create() {
        this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'grass').setOrigin(0, 0);
        this.add.text(10, 10, '🐜 Ant Sim My Pants 👖', { fontSize: '34px', fill: '#fff' });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sounds = {
            eatSound: this.sound.add('eatSound')
        };
        this.preparePlayerCharacter();    
        this.prepareFoodItems();
        this.prepareAnimations();
        this.collisionActive = false;

        this.physics.add.collider(this.antGroup, this.foodItemsGroup, this.handleFoodItemCollision, null, this);
    };

    update() {
        this.handlePlayerMovement();
        
        const statHealthElement = document.getElementById('stat-health');
        statHealthElement.innerText = this.ant.getData('health');

        const statFoodElement = document.getElementById('stat-food');
        statFoodElement.innerText = this.ant.getData('food');
    }

    
    // Secondary Functions

    handleFoodItemCollision (ant, foodItem) {
        if (this.collisionActive) {
            return;
        }
        this.collisionActive = true;
        this.sounds.eatSound.play();
        const antFoodValue = ant.getData('food');
        const foodValue = foodItem.getData('foodValue');

        if ((antFoodValue + foodValue) <= 100) {
            ant.setData('food', antFoodValue + foodValue);
        } else {
            ant.setData('food', 100);
        }

        // Handle eating animations
        this.setInputStatus(false);
        const foodAnimationName = foodItem.getData('eatAnimation');
        if (this.anims.exists(foodAnimationName)) {    
            foodItem.anims.play(foodAnimationName, true);
            foodItem.once('animationcomplete', () => {
                foodItem.destroy();
                this.setInputStatus(true);
                this.collisionActive = false;
            });
        } else {
            this.collisionActive = false;
        }
    }

    prepareFoodItems() {
        const foodItemCount = Phaser.Math.Between(3, 15);
        const foodItemsTotal = foodItems.length;
        const foodItemGroupMembers = [];

        for (let i = 0; i < foodItemCount; i++) {
            const coords = this.getRandomCoords(50, 50, 50, 50);
            const randomFoodIndex = Phaser.Math.Between(0, foodItemsTotal - 1);
            const foodSprite = this.add.sprite(coords.x, coords.y, foodItems[randomFoodIndex].spriteName);
            foodSprite.setOrigin(0, 0);
            foodSprite.setData('foodValue', foodItems[randomFoodIndex].foodValue);
            foodSprite.setData('eatAnimation', foodItems[randomFoodIndex].spriteName + 'Eat');
            foodItemGroupMembers.push(foodSprite);
        }

        this.foodItemsGroup = this.physics.add.group(foodItemGroupMembers, { key: 'foodItemsGroup' });
    }

    prepareAnimations() {
        this.anims.create({
            key: 'redAntWalk',
            frames: this.anims.generateFrameNumbers('antRed', { start: 0, end: 1 }),
            framerate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'foodStrawberryEat',
            frames: this.anims.generateFrameNumbers('foodStrawberry', { start: 0, end: 3 }),
            repeat: 0
        });
    }

    /**
     * Create player sprite, animations, and data.
     */
    preparePlayerCharacter() {
        this.ant = this.add.sprite(100, 300, 'antRed');
        this.ant.setInteractive();
        
        Object.entries(antStats).forEach(([stat, value]) => {
            this.ant.setData(stat, value);
        });

        this.antGroup = this.physics.add.group(this.ant, { key: 'antGroup' });
    }

    /**
     * Setup player movement, animation enabling, and controls.
     */
    handlePlayerMovement() {
        if (this.collisionActive) {
            return;
        }
        
        const speed = this.ant.getData('speed');
        const moveAnimation = 'redAntWalk';

        if (this.cursors.up.isDown) {
            this.ant.y -= speed;
            this.ant.rotation = 0;
            this.ant.anims.play(moveAnimation, true);
        } else if (this.cursors.down.isDown) {
            this.ant.y += speed;
            this.ant.rotation = Math.PI;
            this.ant.anims.play(moveAnimation, true);
        } else if (this.cursors.left.isDown) {
            this.ant.x -= speed;
            this.ant.rotation = -Math.PI / 2;
            this.ant.anims.play(moveAnimation, true);
        } else if (this.cursors.right.isDown) {
            this.ant.x += speed;
            this.ant.rotation = Math.PI / 2;
            this.ant.anims.play(moveAnimation, true);
        } else {
            this.ant.anims.play(moveAnimation, false);
        }
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

    setInputStatus(status) {
        console.log('If I could, input status would be: ' + status);
    }
}

export default Play;