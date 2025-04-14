import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    lander: Phaser.Physics.Matter.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    // groundObjects: Phaser.Physics.Matter.StaticGroup;
    groundObject: Phaser.Physics.Matter.Sprite;
    startPlatform: Phaser.Physics.Matter.Sprite;
    endPlatform: Phaser.Physics.Matter.Sprite;

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

        // Ground Objects
        // this.groundObjects = this.physics.add.staticGroup();
        // const ground = this.groundObjects.create(
        //     400,
        //     575,
        //     'ground'
        // ) as Phaser.Physics.Matter.Sprite;
        // ground.setScale(2).refreshBody();
        // this.groundObjects.create(600, 400, 'ground');
        // this.groundObjects.create(50, 250, 'ground');
        // this.groundObjects.create(750, 220, 'ground');

        // Ground
        this.groundObject = this.matter.add.sprite(400, 575, 'ground');
        this.groundObject.setScale(2);
        this.groundObject.setStatic(true);

        // TODO: widen platforms

        // Start Platform
        this.startPlatform = this.matter.add.sprite(100, 500, 'platformStart');
        this.startPlatform.setScale(2);
        this.startPlatform.setStatic(true);

        // End Platform
        this.endPlatform = this.matter.add.sprite(700, 200, 'platformEnd');
        this.endPlatform.setScale(2);
        this.endPlatform.setStatic(true);

        // Lander
        this.lander = this.matter.add.sprite(100, 450, 'lander');
        this.lander.setFrictionAir(0.01);
        this.lander.setFriction(0.8);
        this.lander.setFrictionStatic(1);
        this.lander.setMass(1000);
        this.lander.setBounce(0.2);
        // this.lander.setCollideWorldBounds(true);
        this.lander.setScale(2);

        // Physics Collisions
        // this.physics.add.collider(this.lander, this.groundObjects);

        EventBus.emit('current-scene-ready', this);
    }

    override update(time: number, delta: number): void {
        this.landerMovementManager();
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    landerMovementManager() {
        // let isLanded = this.lander.body?.touching.down;

        const landerThrust = 2;
        const landerRotationSpeed = 0.002;
        let angularVelocity = this.lander.getAngularVelocity();
        let landerRotation = this.lander.rotation;

        // thrust
        if (this.cursorKeys.up.isDown) {
            // apply forces on x and y axis based on angle
            let forceX = landerThrust * Math.sin(landerRotation);
            let forceY = -landerThrust * Math.cos(landerRotation);
            this.lander.applyForce(new Phaser.Math.Vector2(forceX, forceY));
        }

        // rotation
        // TODO: implement rotational inertia / momentum
        if (this.cursorKeys.left.isDown) {
            this.lander.setAngularVelocity(
                angularVelocity - landerRotationSpeed
            );
        }
        if (this.cursorKeys.right.isDown) {
            this.lander.setAngularVelocity(
                angularVelocity + landerRotationSpeed
            );
        }
    }
}
