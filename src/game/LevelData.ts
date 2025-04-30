import { Level } from './level';

const tutorial: Level = {
    name: 'Tutorial',
    background: {
        x: 400,
        y: 300,
        assetName: 'NASA_background',
        backgroundColor: 0xb46017,
    },
    startPlatform: {
        x: 100,
        y: 275,
    },
    endPlatform: {
        x: 700,
        y: 540,
    },
    fuelPickup: {
        x: 650,
        y: 150,
        startAmount: 100,
    },
    ground: {
        x: 400,
        y: 575,
        assetName: 'ground',
    },
    groundPlatforms: [
        {
            x: 200,
            y: 300,
            assetName: 'ground',
        },
        {
            x: 400,
            y: 375,
            assetName: 'ground-vertical',
        },
        {
            x: 400,
            y: 500,
            assetName: 'ground-vertical',
        },
    ],
};

const zigZag: Level = {
    name: 'Zig-Zag',
    background: {
        x: 400,
        y: 300,
        assetName: 'NASA_background',
        backgroundColor: 0xb46017,
    },
    startPlatform: {
        x: 100,
        y: 550,
    },
    endPlatform: {
        x: 700,
        y: 230,
    },
    fuelPickup: {
        x: 600,
        y: 375,
        startAmount: 100,
    },
    ground: {
        x: 400,
        y: 575,
        assetName: 'ground',
    },
    groundPlatforms: [
        {
            x: 350,
            y: 220,
            assetName: 'ground',
        },
        {
            x: 200,
            y: 400,
            assetName: 'ground',
        },
        {
            x: 750,
            y: 250,
            assetName: 'ground',
        },
    ],
};

const threadTheNeedle: Level = {
    name: 'Thread the Needle',
    background: {
        x: 400,
        y: 300,
        assetName: 'NASA_background',
        backgroundColor: 0xb46017,
    },
    startPlatform: {
        x: 100,
        y: 550,
    },
    endPlatform: {
        x: 700,
        y: 225,
    },
    fuelPickup: {
        x: 400,
        y: 325,
        startAmount: 100,
    },
    ground: {
        x: 400,
        y: 575,
        assetName: 'ground',
    },
    groundPlatforms: [
        {
            x: 140,
            y: 250,
            assetName: 'ground',
        },
        {
            x: 660,
            y: 250,
            assetName: 'ground',
        },
        {
            x: 510,
            y: 325,
            assetName: 'ground-vertical',
        },
        {
            x: 290,
            y: 325,
            assetName: 'ground-vertical',
        },
        {
            x: 95,
            y: 400,
            assetName: 'ground',
        },
        {
            x: 705,
            y: 400,
            assetName: 'ground',
        },
    ],
};

const flappyLander = {
    name: 'Flappy Lander',
    background: {
        x: 400,
        y: 300,
        assetName: 'NASA_background',
        backgroundColor: 0xb46017,
    },
    startPlatform: {
        x: 64,
        y: 450,
    },
    endPlatform: {
        x: 736,
        y: 200,
    },
    fuelPickup: {
        x: 500,
        y: 350,
        startAmount: 100,
    },
    ground: {
        x: 400,
        y: 575,
        assetName: 'ground',
    },
    groundPlatforms: [
        {
            x: 225,
            y: 450,
            assetName: 'ground-vertical',
        },
        {
            x: 225,
            y: 200,
            assetName: 'ground-vertical',
        },
        {
            x: 375,
            y: 350,
            assetName: 'ground-vertical',
        },
        {
            x: 375,
            y: 100,
            assetName: 'ground-vertical',
        },
        {
            x: 500,
            y: 425,
            assetName: 'ground-vertical',
        },
        {
            x: 500,
            y: 175,
            assetName: 'ground-vertical',
        },
    ],
};

const zigZagZigZag = {
    name: 'Zig-Zag Zig-Zag',
    background: {
        x: 400,
        y: 300,
        assetName: 'NASA_background',
        backgroundColor: 0xb46017,
    },
    startPlatform: {
        x: 300,
        y: 550,
    },
    endPlatform: {
        x: 500,
        y: 550,
    },
    fuelPickup: {
        x: 500,
        y: 150,
        startAmount: 100,
    },
    ground: {
        x: 400,
        y: 575,
        assetName: 'ground',
    },
    groundPlatforms: [
        {
            x: 400,
            y: 480,
            assetName: 'ground-vertical',
        },
        {
            x: 400,
            y: 352,
            assetName: 'ground-vertical',
        },
        {
            x: 400,
            y: 224,
            assetName: 'ground-vertical',
        },
        {
            x: 400,
            y: 400,
            assetName: 'ground',
        },
        {
            x: 400,
            y: 160,
            assetName: 'ground',
        },
        {
            x: -100,
            y: 290,
            assetName: 'ground',
        },
        {
            x: 900,
            y: 290,
            assetName: 'ground',
        },
    ],
};

export const levelData: Level[] = [
    tutorial,
    zigZag,
    threadTheNeedle,
    flappyLander,
    zigZagZigZag,
];
