/// <amd-dependency path="easel" />
import ResourceLoader = require("ResourceLoader");

class VespeneGeyser extends createjs.Container {

    constructor() {
        super();
        var imgGeySmok1 = <HTMLImageElement>ResourceLoader.get("unit/thingy/geysmok1.png");
        var imgGeySmok2 = <HTMLImageElement>ResourceLoader.get("unit/thingy/geysmok2.png");
        var imgGeySmok3 = <HTMLImageElement>ResourceLoader.get("unit/thingy/geysmok3.png");
        var imgGeyser = <HTMLImageElement>ResourceLoader.get("unit/neutral/geyser.png");
        var imgGeyshad = <HTMLImageElement>ResourceLoader.get("unit/neutral/geyshad.png");
        var sGeySmok1 = new GeyserPuff(imgGeySmok1);
        var sGeySmok2 = new GeyserPuff(imgGeySmok2);
        var sGeySmok3 = new GeyserPuff(imgGeySmok3);
        sGeySmok1.x = 61; sGeySmok1.y = -19;
        sGeySmok2.x = 11; sGeySmok2.y = -13;
        sGeySmok3.x = 84; sGeySmok3.y = 2;
        var ssGeyser = new createjs.SpriteSheet({ images: [imgGeyser], frames: { width: 128, height: 64 } });
        var sGeyser = new createjs.Sprite(ssGeyser);
        var ssGeyShad = new createjs.SpriteSheet({ images: [imgGeyshad], frames: { width: 160, height: 64 } });
        var sGeyShad = new createjs.Sprite(ssGeyShad);
        sGeyShad.x = -15;
        this.addChild(sGeyShad, sGeyser, sGeySmok1, sGeySmok2, sGeySmok3);
    }
}

export = VespeneGeyser;

class GeyserPuff extends createjs.Sprite {

    interval: number;

    constructor(ssImage: HTMLImageElement) {
        super(new createjs.SpriteSheet({
            images: [ssImage],
            frames: { width: 32, height: 64 },
            framerate: 10,
            animations: { puf: [0, 7, false] }
        }));

        this.visible = false;
        this.on("animationend", () => { this.visible = false });
        this.interval = getRandomInt(2, 5) * 1000;
        createjs.Ticker.on("tick", (event: createjs.TickerEvent) => { this.tick(event) });
    }

    tick(event: createjs.TickerEvent) {
        this.interval -= event.delta;

        if (this.interval < 0) {
            this.visible = true;
            this.gotoAndPlay("puf");
            this.interval = getRandomInt(2, 5) * 1000;
        }
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}