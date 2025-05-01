import { Level } from './level';

export class NetworkLoader {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    validateLevel(level: Level): boolean {
        if (!level.name) {
            return false;
        }
        if (
            !level.background.x ||
            !level.background.y ||
            !level.background.assetName ||
            !level.background.backgroundColor
        ) {
            return false;
        }
        if (!level.startPlatform.x || !level.startPlatform.y) {
            return false;
        }
        if (!level.endPlatform.x || !level.endPlatform.y) {
            return false;
        }
        if (
            !level.fuelPickup.x ||
            !level.fuelPickup.y ||
            !level.fuelPickup.startAmount
        ) {
            return false;
        }
        if (!level.ground.x || !level.ground.y) {
            return false;
        }
        if (!level.groundPlatforms) {
            return false;
        }
        return true;
    }

    async loadLevelData() {
        let response: Level[] = await fetch(this.url).then((response) => {
            return response.json();
        });

        let validatedLevels: Level[] = [];
        response.forEach((level) => {
            if (this.validateLevel(level)) {
                validatedLevels.push(level);
            } else {
                console.warn('filtered invalid level');
            }
        });

        return validatedLevels as unknown as Level[];
    }
}
