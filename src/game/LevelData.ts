import { Level } from './Level';

export const levelData: Level[] = [
    {
        name: 'Tutorial',
        background: {
            x: 400,
            y: 300,
            assetName: 'NASA_background',
            backgroundColor: 0xb46017,
        },
        startPlatform: {
            x: 100,
            y: 500,
        },
        endPlatform: {
            x: 700,
            y: 200,
        },
        fuelPickup: {
            x: 700,
            y: 400,
            startAmount: 100,
        },
        ground: {
            x: 400,
            y: 575,
            assetName: 'ground',
        },
        groundPlatforms: [
            {
                x: 600,
                y: 400,
                assetName: 'ground',
            },
            {
                x: 50,
                y: 250,
                assetName: 'ground',
            },
            {
                x: 750,
                y: 220,
                assetName: 'ground',
            },
        ],
    },
    {
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
    },
];
