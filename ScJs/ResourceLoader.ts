/// <amd-dependency path="preload" />

class ResourceLoader {
    private static _instance: ResourceLoader = null;
    private _preload: createjs.LoadQueue;

    private _manifest = [
        "maps/LostTemple.bmp",
        "unit/zerg/avenger.png",
        "unit/thingy/geysmok1.png",
        "unit/thingy/geysmok2.png",
        "unit/thingy/geysmok3.png",
        "unit/neutral/geyser.png",
        "unit/neutral/geyshad.png",
        "game/zconsole.png",
        "maps/LostTemple.png"
    ];

    constructor() {
        this._preload = new createjs.LoadQueue(true, "Resources/");
    }

    get(id: string) {
        return this._preload.getResult(id);
    }

    public static getInstance(): ResourceLoader {
        if (ResourceLoader._instance === null) {
            ResourceLoader._instance = new ResourceLoader();
        }
        return ResourceLoader._instance;
    }

    preload(callback: () => void) {
        this._preload.on("complete", callback);
        this._preload.loadManifest(this._manifest);
    }

    public static preload(callback: () => void) {
        var resourceLoader = ResourceLoader.getInstance();
        resourceLoader.preload(callback);
    }

    public static get(id:string) {
        var resourceLoader = ResourceLoader.getInstance();
        return resourceLoader.get(id);
    }
}

export = ResourceLoader;