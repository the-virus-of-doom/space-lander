import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Win extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    winText: Phaser.GameObjects.Text;
    extraFuel: number;
    fuelText: Phaser.GameObjects.Text;

    constructor() {
        super('Win');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xb46017);

        this.background = this.add.image(400, 300, 'NASA_background');
        this.background.setAlpha(0.5);

        this.winText = this.add
            .text(400, 200, 'You Win!', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.extraFuel = this.registry.get('extraFuel');

        this.fuelText = this.add
            .text(400, 300, `Total Extra Fuel: ${this.extraFuel.toFixed(2)}`, {
                fontFamily: 'Arial Black',
                fontSize: 20,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6,
                align: 'center',
            })
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}
