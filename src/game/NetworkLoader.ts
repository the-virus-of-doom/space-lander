import { Level } from './level';

export class NetworkLoader {
    url: string;
    constructor(url: string) {
        this.url = url;
    }

    async loadLevelData() {
        let response = await fetch(this.url).then((response) => {
            console.log('raw response:, ', response);
            return response.json;
        });
        return response as unknown as Level;
    }
}
