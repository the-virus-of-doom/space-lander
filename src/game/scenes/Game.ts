import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    userInterfaceText: Phaser.GameObjects.Text;
    lander: Phaser.Physics.Matter.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    groundObjects: Phaser.Physics.Matter.Image[] = [];
    ground: Phaser.Physics.Matter.Sprite;
    startPlatform: Phaser.Physics.Matter.Sprite;
    endPlatform: Phaser.Physics.Matter.Sprite;
    fuelAmount: number = 100;
    fuelPickup: Phaser.Physics.Matter.Sprite;
    collisionThreshold: number = 8;
    isGameOver: boolean = false;

    constructor() {
        super('Game');
    }

    create() {
        if (this.input.keyboard) {
            this.cursorKeys = this.input.keyboard.createCursorKeys();
        } else {
            throw new Error('no keyboard input detected');
        }

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xb46017);

        this.background = this.add.image(400, 300, 'NASA_background');
        this.background.setAlpha(0.5);

        // Scene Title
        this.gameText = this.add
            .text(150, 25, 'Game Scene', {
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
        this.userInterfaceText = this.add.text(
            10,
            50,
            `Fuel Remaining: ${this.fuelAmount}`,
            {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6,
                align: 'left',
            }
        );

        // Ground Objects
        // LATER: pass in image settings to a foreach to populate array
        let groundObject1 = this.matter.add.image(600, 400, 'ground');
        let groundObject2 = this.matter.add.image(50, 250, 'ground');
        let groundObject3 = this.matter.add.image(750, 220, 'ground');
        this.groundObjects.push(groundObject1);
        this.groundObjects.push(groundObject2);
        this.groundObjects.push(groundObject3);

        this.groundObjects.forEach((groundObject) => {
            groundObject.setStatic(true);
        });

        // Ground (special Ground Object)
        this.ground = this.matter.add.sprite(400, 575, 'ground');
        this.ground.setScale(2);
        this.ground.setStatic(true);
        this.groundObjects.push(this.ground);

        // Start Platform
        this.startPlatform = this.matter.add.sprite(100, 500, 'platformStart');
        this.startPlatform.setScale(2);
        this.startPlatform.setStatic(true);

        // End Platform
        this.endPlatform = this.matter.add.sprite(700, 200, 'platformEnd');
        this.endPlatform.setScale(2);
        this.endPlatform.setStatic(true);

        // Fuel pickup
        this.fuelPickup = this.matter.add.sprite(700, 350, 'fuel');
        this.fuelPickup.setScale(2);
        this.fuelPickup.setSensor(true);
        this.fuelPickup.setStatic(true);

        // Lander
        this.lander = this.matter.add.sprite(100, 450, 'lander');
        this.lander.setFrictionAir(0.01);
        this.lander.setFriction(0.8);
        this.lander.setFrictionStatic(1);
        this.lander.setMass(1000);
        this.lander.setBounce(0.2);
        this.lander.setScale(2);

        // Physics Collisions
        this.lander.setOnCollideWith(this.groundObjects, (e: any) =>
            this.onLanderCollide(e)
        );
        this.lander.setOnCollideWith(this.fuelPickup, (e: any) =>
            this.onFuelPickup(e)
        );

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
        this.scene.start('GameOver');
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
        console.log('refueled!');
        this.fuelPickup.setActive(false);
        this.fuelPickup.setVisible(false);
        this.fuelPickup.setPosition(-100, -100); // go to jail since you won't disable
        // TODO: play refuel sound?
        this.fuelAmount += 50;
    }

    onLanderCollide(data: any) {
        let velocity = this.lander.getVelocity();
        let speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        speed = Math.round(speed * 1e5) / 1e5; // round to 5 decimal places
        // console.log('Lander speed at collision: ', speed);

        // LOSE CASE: landed too hard
        if (speed > this.collisionThreshold) {
            this.isGameOver = true;
            this.gameOver('Lander smashed to pieces!');
            return;
        }
        // LOSE CASE: crashed (hit sides or top)
    }

    landerExploder() {
        let velocity = this.lander.getVelocity();
        let speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        speed = Math.round(speed * 1e5) / 1e5; // round to 5 decimal places

        // LOSE CASE: out of fuel
        if (this.fuelAmount <= 0) {
            this.fuelAmount = 0;
            console.log('Out of Fuel!');
            // start checking if lander is stationary
            if (speed <= 0.0) {
                this.isGameOver = true;
                console.log('Lander is stopped!');
                this.gameOver('Out of Fuel!');
                return;
            }
        }
    }

    gameOver(reason: string) {
        console.log('GAME OVER!\nReason: ', reason);

        // TODO: change this to explode texture
        this.lander.setTexture('explode');

        setTimeout(() => {
            console.log('Changing Scene to Game Over...');
            this.scene.start('GameOver');
        }, 3000);
    }

    updateUI() {
        // update Fuel
        this.userInterfaceText.setText(
            `Fuel Remaining: ${this.fuelAmount.toFixed(2)}`
        );
    }
}
