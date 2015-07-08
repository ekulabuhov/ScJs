/// <amd-dependency path="preload" />
define(["require", "exports", "preload"], function (require, exports) {
    var ResourceLoader = (function () {
        function ResourceLoader() {
            this._manifest = [
                "maps/LostTemple.bmp",
                "unit/zerg/avenger.png",
                "unit/thingy/geysmok1.png",
                "unit/thingy/geysmok2.png",
                "unit/thingy/geysmok3.png",
                "unit/neutral/geyser.png",
                "unit/neutral/geyshad.png",
                "game/zconsole.png",
                "maps/LostTemple.png",
                "maps/LostTempleMiniMap.png",
                "wirefram/wirefram.png"
            ];
            this._preload = new createjs.LoadQueue(true, "Resources/");
        }
        ResourceLoader.prototype.get = function (id) {
            return this._preload.getResult(id);
        };
        ResourceLoader.getInstance = function () {
            if (ResourceLoader._instance === null) {
                ResourceLoader._instance = new ResourceLoader();
            }
            return ResourceLoader._instance;
        };
        ResourceLoader.prototype.preload = function (callback) {
            this._preload.on("complete", callback);
            this._preload.loadManifest(this._manifest);
        };
        ResourceLoader.preload = function (callback) {
            var resourceLoader = ResourceLoader.getInstance();
            resourceLoader.preload(callback);
        };
        ResourceLoader.get = function (id) {
            var resourceLoader = ResourceLoader.getInstance();
            return resourceLoader.get(id);
        };
        ResourceLoader._instance = null;
        return ResourceLoader;
    })();
    return ResourceLoader;
});
