import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    lander: Phaser.Physics.Arcade.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    groundObjects: Phaser.Physics.Arcade.StaticGroup;

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
        this.groundObjects = this.physics.add.staticGroup();
        const ground = this.groundObjects.create(
            400,
            575,
            'ground'
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();
        this.groundObjects.create(600, 400, 'ground');
        this.groundObjects.create(50, 250, 'ground');
        this.groundObjects.create(750, 220, 'ground');

        // Lander
        this.lander = this.physics.add.sprite(200, 400, 'lander');
        this.lander.setBounce(0.2);
        this.lander.setCollideWorldBounds(true);
        this.lander.setScale(2);

        // Physics Collisions
        this.physics.add.collider(this.lander, this.groundObjects);

        EventBus.emit('current-scene-ready', this);
    }

    override update(time: number, delta: number): void {
        this.landerMovementManager();
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    landerMovementManager() {
        // temporary implementation
        // TODO: add physics with primary thruster. only directly control rotation.

        // let isLanded = this.lander.body?.touching.down;

        // vertical
        if (this.cursorKeys.up.isDown) {
            this.lander.setVelocityY(-160);
        } else if (this.cursorKeys.down.isDown) {
            this.lander.setVelocityY(160);
        } else {
            this.lander.setVelocityY(0);
        }

        // horizontal
        if (this.cursorKeys.left.isDown) {
            this.lander.setVelocityX(-160);
        } else if (this.cursorKeys.right.isDown) {
            this.lander.setVelocityX(160);
        } else {
            this.lander.setVelocityX(0);
        }
    }
}
