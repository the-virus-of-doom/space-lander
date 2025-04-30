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

export const levelData: Level[] = [tutorial, zigZag, threadTheNeedle];
