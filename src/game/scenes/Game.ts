import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    lander: Phaser.GameObjects.Sprite;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

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
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add
            .text(512, 384, 'Game Scene', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.lander = this.add.sprite(512, 512, 'lander');

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

        // vertical
        if (this.cursorKeys.up.isDown) {
            this.lander.y -= 1;
        }
        if (this.cursorKeys.down.isDown) {
            this.lander.y += 1;
        }

        // horizontal
        if (this.cursorKeys.left.isDown) {
            this.lander.x -= 1;
        }
        if (this.cursorKeys.right.isDown) {
            this.lander.x += 1;
        }
    }
}
