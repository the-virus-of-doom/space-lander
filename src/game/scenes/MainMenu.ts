import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(400, 300, 'NASA_background');

        this.logo = this.add.image(400, 250, 'logo').setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    startGame() {
        // set extra fuel to 0 when starting new game
        this.registry.set('extraFuel', 0);

        this.scene.start('Game');
    }
}
