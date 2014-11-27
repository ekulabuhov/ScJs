var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ResourceLoader", "easel"], function(require, exports, ResourceLoader) {
    var VespeneGeyser = (function (_super) {
        __extends(VespeneGeyser, _super);
        function VespeneGeyser() {
            _super.call(this);
            var imgGeySmok1 = ResourceLoader.get("unit/thingy/geysmok1.png");
            var imgGeySmok2 = ResourceLoader.get("unit/thingy/geysmok2.png");
            var imgGeySmok3 = ResourceLoader.get("unit/thingy/geysmok3.png");
            var imgGeyser = ResourceLoader.get("unit/neutral/geyser.png");
            var imgGeyshad = ResourceLoader.get("unit/neutral/geyshad.png");
            var sGeySmok1 = new GeyserPuff(imgGeySmok1);
            var sGeySmok2 = new GeyserPuff(imgGeySmok2);
            var sGeySmok3 = new GeyserPuff(imgGeySmok3);
            sGeySmok1.x = 61;
            sGeySmok1.y = -19;
            sGeySmok2.x = 11;
            sGeySmok2.y = -13;
            sGeySmok3.x = 84;
            sGeySmok3.y = 2;
            var ssGeyser = new createjs.SpriteSheet({ images: [imgGeyser], frames: { width: 128, height: 64 } });
            var sGeyser = new createjs.Sprite(ssGeyser);
            var ssGeyShad = new createjs.SpriteSheet({ images: [imgGeyshad], frames: { width: 160, height: 64 } });
            var sGeyShad = new createjs.Sprite(ssGeyShad);
            sGeyShad.x = -15;
            this.addChild(sGeyShad, sGeyser, sGeySmok1, sGeySmok2, sGeySmok3);
        }
        return VespeneGeyser;
    })(createjs.Container);

    

    var GeyserPuff = (function (_super) {
        __extends(GeyserPuff, _super);
        function GeyserPuff(ssImage) {
            var _this = this;
            _super.call(this, new createjs.SpriteSheet({
                images: [ssImage],
                frames: { width: 32, height: 64 },
                framerate: 10,
                animations: { puf: [0, 7, false] }
            }));

            this.visible = false;
            this.on("animationend", function () {
                _this.visible = false;
            });
            this.interval = getRandomInt(2, 5) * 1000;
            createjs.Ticker.on("tick", function (event) {
                _this.tick(event);
            });
        }
        GeyserPuff.prototype.tick = function (event) {
            this.interval -= event.delta;

            if (this.interval < 0) {
                this.visible = true;
                this.gotoAndPlay("puf");
                this.interval = getRandomInt(2, 5) * 1000;
            }
        };
        return GeyserPuff;
    })(createjs.Sprite);

    /**
    * Returns a random integer between min (inclusive) and max (inclusive)
    * Using Math.round() will give you a non-uniform distribution!
    */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return VespeneGeyser;
});
