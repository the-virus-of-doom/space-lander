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

    // constructor(){
    //     this.ground = {x: 400, y: 575, assetName: 'ground'}
    // }
}
