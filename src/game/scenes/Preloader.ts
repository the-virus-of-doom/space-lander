import { Scene } from 'phaser';

export class Preloader extends Scene {
    debug: boolean = false;
    constructor() {
        super('Preloader');
    }

    init() {
        // show debug options when physics debug is enabled
        // (or if config exists)
        if (this.game.config.physics.matter?.debug) {
            this.debug = true;
        }
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(400, 400, 'background');

        this.add.text(300, 300, 'L o a d i n g . . . ', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
        });

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(400, 400, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(400 - 230, 400, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');

        this.load.image('NASA_background', 'NASA_IotW_Sol01412.jpg');
        this.load.image('platformStart', 'platform-start.png');
        this.load.image('platformEnd', 'platform-end.png');
        this.load.image('platformLights', 'platform-lights.png');
        this.load.image('ground', 'ground.png');
        this.load.image('lander', 'space-lander.png');
        this.load.image('lander-thrust', 'space-lander-thrust.png');
        this.load.image('lander-thrust-CW', 'space-lander-thrust-CW.png');
        this.load.image('lander-thrust-CCW', 'space-lander-thrust-CCW.png');
        this.load.image('lander-CW', 'space-lander-CW.png');
        this.load.image('lander-CCW', 'space-lander-CCW.png');
        this.load.image('explode', 'explode.png');
        this.load.image('fuel', 'fuel.png');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        if (this.debug) {
            console.warn('Skipping to Game scene');
            this.scene.start('Game');
        } else {
            this.scene.start('MainMenu');
        }
    }
}
