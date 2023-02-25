export default class PHFetcher {
    static readonly base_url = "https://phfetcher.ducng.dev";

    static async getInfo(id: string): Promise<string[]> {
        let _response = await fetch(`${this.base_url}/info/${id}`);
        const response = (await _response.json()) as InfoQualities;

        return response.qualities;
    }

    static getVideo(id: string, quality: string) {
        window.open(`${this.base_url}/dl/${id}/${quality}`, "_blank");
    }
}

interface InfoQualities {
    qualities: string[];
}