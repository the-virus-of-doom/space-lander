export class Level {
    name: string;
    background: {
        x: number;
        y: number;
        assetName: string;
        backgroundColor:
            | string
            | number
            | Phaser.Types.Display.InputColorObject;
    };
    startPlatform: { x: number; y: number }; // lander starts 50px above
    endPlatform: { x: number; y: number }; // endPlatformLights placed 48px above
    fuelPickup: { x: number; y: number; startAmount: number };
    ground: { x: number; y: number; assetName: string };
    groundPlatforms: { x: number; y: number; assetName: string }[];

    constructor(levelName: string = 'Default Level') {
        this.name = levelName;
        this.background = {
            x: 400,
            y: 300,
            assetName: 'NASA_background',
            backgroundColor: 0xb46017,
        };
        this.startPlatform = { x: 300, y: 300 };
        this.endPlatform = { x: 500, y: 300 };
        this.fuelPickup = { x: 200, y: 300, startAmount: 100 };
        this.ground = { x: 400, y: 575, assetName: 'ground' };
        this.groundPlatforms = [];
    }
}
