import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Level } from '../level';
import { levelData } from '../LevelData';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    userInterfaceText: Phaser.GameObjects.Text;
    levelCompleteText: Phaser.GameObjects.Text;
    extraFuelText: Phaser.GameObjects.Text;
    lander: Phaser.Physics.Matter.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    groundObjects: Phaser.Physics.Matter.Image[] = [];
    startPlatform: Phaser.Physics.Matter.Sprite;
    endPlatform: Phaser.Physics.Matter.Sprite;
    endPlatformLights: Phaser.Physics.Matter.Sprite;
    fuelAmount: number = 100;
    extraFuel: number = 0;
    fuelPickup: Phaser.Physics.Matter.Sprite;
    collisionThreshold: number = 8;
    isGameOver: boolean = false;
    currentLevel: number = 0;
    debug: boolean = false;

    levels: Level[] = levelData;

    constructor() {
        super('Game');
    }

    create() {
        if (this.input.keyboard) {
            this.cursorKeys = this.input.keyboard.createCursorKeys();
        } else {
            throw new Error('no keyboard input detected');
        }

        // show debug options when physics debug is enabled
        // (or if config exists)
        if (this.game.config.physics.matter?.debug) {
            this.debug = true;
        }

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xb46017);

        this.background = this.add.image(400, 300, 'NASA_background');
        this.background.setAlpha(0.5);

        // set extra fuel to 0
        this.registry.set('extraFuel', 0);

        // Init Text objects
        this.initUI();

        // Init game objects
        this.initGameObjects();

        // DEBUG ONLY
        // TODO: REMOVE WHEN DONE ADDING LEVELS
        if (this.debug) {
            this.loadTestLevel();
        }

        this.loadLevel(0);

        // Physics Collisions
        this.lander.setOnCollideWith(this.groundObjects, (e: any) =>
            this.onLanderCollide(e)
        );
        this.lander.setOnCollideWith(this.fuelPickup, (e: any) =>
            this.onFuelPickup(e)
        );
        this.lander.setOnCollideActive((e: any) => this.landingZoneCheck(e));

        EventBus.emit('current-scene-ready', this);
    }

    override update(time: number, delta: number): void {
        if (!this.isGameOver) {
            this.landerMovementManager();
            this.landerExploder();
            this.updateUI();
        }
    }

    changeScene() {
        this.scene.start('MainMenu');
    }

    resetLevel() {
        this.loadLevel(this.currentLevel);
    }

    landerMovementManager() {
        // let isLanded = this.lander.body?.touching.down;

        const landerThrust = 3;
        const landerRotationSpeed = 0.002;
        let angularVelocity = this.lander.getAngularVelocity();
        let landerRotation = this.lander.rotation;
        let shouldThrust = this.cursorKeys.up.isDown && this.fuelAmount > 0;

        // thrust
        if (this.cursorKeys.up.isDown && this.fuelAmount > 0) {
            // apply forces on x and y axis based on angle
            let forceX = landerThrust * Math.sin(landerRotation);
            let forceY = -landerThrust * Math.cos(landerRotation);
            this.lander.applyForce(new Phaser.Math.Vector2(forceX, forceY));

            // burn fuel during thrust
            this.fuelAmount -= 0.1;

            this.lander.setTexture('lander-thrust');
        } else {
            this.lander.setTexture('lander');
        }

        // rotation
        // TODO: implement rotational inertia / momentum
        if (this.cursorKeys.left.isDown) {
            this.lander.setAngularVelocity(
                angularVelocity - landerRotationSpeed
            );

            shouldThrust
                ? this.lander.setTexture('lander-thrust-CW')
                : this.lander.setTexture('lander-CW');
        }
        if (this.cursorKeys.right.isDown) {
            this.lander.setAngularVelocity(
                angularVelocity + landerRotationSpeed
            );
            shouldThrust
                ? this.lander.setTexture('lander-thrust-CCW')
                : this.lander.setTexture('lander-CCW');
        }
    }

    onFuelPickup(data: any) {
        this.debugLog('refueled!');
        this.fuelPickup.setActive(false);
        this.fuelPickup.setVisible(false);
        this.fuelPickup.setPosition(-100, -100); // go to jail since you won't disable
        // TODO: play refuel sound?
        this.fuelAmount += 50;
    }

    landingZoneCheck(data: {
        bodyA: { gameObject: { name: string } };
        bodyB: any;
    }) {
        if (!this.isGameOver) {
            let speed = this.getSpeed();
            //  TODO: add check for being in endPlatformLights to make sure player is on top of platform
            if (speed <= 0.0 && data.bodyA.gameObject?.name === 'endPlatform') {
                this.debugLog('Lander is stopped!');
                this.levelWin();
                return;
            }
        }
    }

    onLanderCollide(data: any) {
        let speed = this.getSpeed();
        // this.debugLog('Lander speed at collision: ', speed);

        // LOSE CASE: landed too hard
        if (speed > this.collisionThreshold) {
            this.isGameOver = true;
            this.gameOver('Lander smashed to pieces!');
            return;
        }
        // LOSE CASE: crashed (hit sides or top)
    }

    landerExploder() {
        let speed = this.getSpeed();

        // LOSE CASE: out of fuel
        if (this.fuelAmount <= 0) {
            this.fuelAmount = 0;
            this.debugLog('Out of Fuel!');
            // start checking if lander is stationary
            if (speed <= 0.0) {
                this.isGameOver = true;
                this.debugLog('Lander is stopped!');
                this.gameOver('Out of Fuel!');
                return;
            }
        }
    }

    getSpeed() {
        let velocity = this.lander.getVelocity();
        let speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        speed = Math.round(speed * 1e5) / 1e5; // round to 5 decimal places
        return speed;
    }

    gameOver(reason: string) {
        this.debugLog('GAME OVER!\nReason: ', reason);
        this.registry.set('loseReason', reason);

        this.lander.setTexture('explode');

        setTimeout(() => {
            this.debugLog('Changing Scene to Game Over...');
            this.scene.start('GameOver');
        }, 3000);
    }

    levelWin() {
        this.isGameOver = true;
        this.debugLog('YOU WIN!');

        // TODO: play win sfx here

        // update fuel score on win
        this.extraFuel += this.fuelAmount;
        this.registry.set('extraFuel', this.extraFuel);
        this.debugLog('Total Extra Fuel: ', this.extraFuel.toFixed(2));

        this.levelCompleteText.text = 'Level Complete!';
        this.levelCompleteText.setVisible(true);

        this.extraFuelText.text = `Extra Fuel: ${this.fuelAmount.toFixed(2)}`;
        this.extraFuelText.setVisible(true);

        setTimeout(() => {
            const nextLevel = (this.currentLevel += 1);
            this.debugLog('Loading next level...', nextLevel);
            this.loadLevel(nextLevel);
        }, 3000);
    }

    initUI() {
        // Scene Title
        this.gameText = this.add
            .text(150, 25, 'Loading Level...', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);

        // User Interface
        this.userInterfaceText = this.add
            .text(10, 50, `Fuel Remaining: ${this.fuelAmount}`, {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6,
                align: 'left',
            })
            .setDepth(100);

        // Level Complete Text
        this.levelCompleteText = this.add
            .text(400, 200, 'Level Complete!', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);

        this.extraFuelText = this.add
            .text(400, 300, `Extra Fuel: ${this.extraFuel.toFixed(2)}`, {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);
    }

    initGameObjects() {
        // Start Platform (moved on level load)
        this.startPlatform = this.matter.add.sprite(100, 500, 'platformStart');
        this.startPlatform.setScale(2);
        this.startPlatform.setStatic(true);
        this.startPlatform.setName('startPlatform');
        this.startPlatform.setDepth(1);

        // End Platform (moved on level load)
        this.endPlatform = this.matter.add.sprite(700, 200, 'platformEnd');
        this.endPlatform.setScale(2);
        this.endPlatform.setStatic(true);
        this.endPlatform.setName('endPlatform');
        this.endPlatform.setDepth(1);

        // End Platform Lights (moved on level load)
        this.endPlatformLights = this.matter.add.sprite(
            700,
            152,
            'platformLights'
        );
        this.endPlatformLights.setScale(2);
        this.endPlatformLights.setSensor(true);
        this.endPlatformLights.setStatic(true);
        this.endPlatformLights.setName('endPlatformLights');
        this.endPlatformLights.setDepth(1);

        // Fuel pickup (moved on level load)
        this.fuelPickup = this.matter.add.sprite(700, 350, 'fuel');
        this.fuelPickup.setScale(2);
        this.fuelPickup.setSensor(true);
        this.fuelPickup.setStatic(true);
        this.fuelPickup.setName('fuelPickup');
        this.fuelPickup.setDepth(1);

        // Lander (moved on level load)
        this.lander = this.matter.add.sprite(100, 450, 'lander');
        this.lander.setFrictionAir(0.01);
        this.lander.setFriction(0.8);
        this.lander.setFrictionStatic(1);
        this.lander.setMass(1000);
        this.lander.setBounce(0.2);
        this.lander.setScale(2);
        this.lander.setName('lander');
        this.lander.setDepth(2);
    }

    loadLevel(levelNumber: number) {
        if (!this.levels.at(levelNumber)) {
            // final win screen if no next level
            this.debugLog('No next level found. Loading final win screen.');
            this.scene.start('Win');
            return;
        }

        this.currentLevel = levelNumber;
        const newLevel = this.levels.at(levelNumber);
        const clearX = -100;
        const clearY = -100;
        const errorPos = 100;

        this.debugLog('loading level: ', newLevel?.name);

        // clear positions
        this.lander.setPosition(clearX, clearY);
        this.startPlatform.setPosition(clearX, clearY);
        this.endPlatform.setPosition(clearX, clearY);
        this.endPlatformLights.setPosition(clearX, clearY);
        this.fuelPickup.setPosition(clearX, clearY);

        this.groundObjects.forEach((platform) => platform.destroy());
        this.groundObjects.length = 0;

        // reset game state
        this.fuelAmount = newLevel?.fuelPickup.startAmount || 100;
        this.fuelPickup.setActive(true);
        this.fuelPickup.setVisible(true);
        this.extraFuelText.setVisible(false);
        this.levelCompleteText.setVisible(false);

        // set extra fuel to stored value to prevent improper persistance
        this.extraFuel = this.registry.get('extraFuel');

        this.isGameOver = false; // maybe change this at the end

        // set background
        this.camera.setBackgroundColor(newLevel?.background.backgroundColor);
        this.background = this.add.image(
            newLevel?.background.x || 400,
            newLevel?.background.y || 300,
            newLevel?.background.assetName || 'NASA_background'
        );
        this.background.setAlpha(0);

        // update UI with level name
        this.gameText.text = `${newLevel?.name || 'error loading level name'}`;

        // set positions

        // init new ground objects and positions
        let ground = this.matter.add.image(
            newLevel?.ground.x || 400,
            newLevel?.ground.y || 575,
            newLevel?.ground.assetName || 'ground'
        );
        ground.setScale(2);
        this.groundObjects.push(ground);

        newLevel?.groundPlatforms.forEach((newPlatform) => {
            let groundObject = this.matter.add.image(
                newPlatform.x,
                newPlatform.y,
                newPlatform.assetName
            );
            this.groundObjects.push(groundObject);
        });

        this.groundObjects.forEach((groundObject) => {
            groundObject.setStatic(true);
            groundObject.setName('ground');
        });

        // set platform positions
        this.startPlatform.setPosition(
            newLevel?.startPlatform.x || errorPos,
            newLevel?.startPlatform.y || errorPos
        );

        this.endPlatform.setPosition(
            newLevel?.endPlatform.x || errorPos,
            newLevel?.endPlatform.y || errorPos
        );
        this.endPlatformLights.setPosition(
            newLevel?.endPlatform.x || errorPos,
            (newLevel?.endPlatform.y || errorPos) - 48
        );

        // set lander position
        this.lander.setPosition(
            newLevel?.startPlatform.x || errorPos,
            (newLevel?.startPlatform.y || errorPos) - 50
        );
        this.lander.setAngle(0);

        // set fuel position
        this.fuelPickup.setPosition(
            newLevel?.fuelPickup.x || errorPos,
            (newLevel?.fuelPickup.y || errorPos) - 50
        );
    }

    updateUI() {
        // update Fuel
        this.userInterfaceText.setText(
            `Fuel Remaining: ${this.fuelAmount.toFixed(2)}`
        );
    }

    debugLog(message: string, object?: any) {
        if (this.debug) {
            if (!!object) {
                console.log(message, object);
            } else {
                console.log(message);
            }
        }
    }

    loadTestLevel() {
        const skipTest = false;
        if (skipTest) {
            return;
        }
        console.warn('Injecting Test Level...');

        let testLevel = {
            name: 'Test Level',
            background: {
                x: 400,
                y: 300,
                assetName: 'NASA_background',
                backgroundColor: 0xb46017,
            },
            startPlatform: {
                x: 100,
                y: 500,
            },
            endPlatform: {
                x: 700,
                y: 200,
            },
            fuelPickup: {
                x: 700,
                y: 400,
                startAmount: 100,
            },
            ground: {
                x: 400,
                y: 575,
                assetName: 'ground',
            },
            groundPlatforms: [
                {
                    x: 600,
                    y: 400,
                    assetName: 'ground',
                },
                {
                    x: 50,
                    y: 250,
                    assetName: 'ground',
                },
                {
                    x: 750,
                    y: 220,
                    assetName: 'ground',
                },
            ],
        };

        this.levels = [testLevel];
    }
}
