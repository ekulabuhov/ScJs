/// <amd-dependency path="tween" />

import ResourceLoader = require("ResourceLoader");
import Avenger = require("Avenger");
import VespeneGeyser = require("VespeneGeyser");

console.log("Loading resources");
ResourceLoader.preload(loadComplete);

var stage: createjs.Stage,
    map: createjs.Container,
    lblDebug: HTMLDivElement = <HTMLDivElement>document.getElementById("lblDebug");

var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

function keyPressed(event: KeyboardEvent) {
    switch (event.keyCode) {
        case KEYCODE_LEFT:
            map.x += 5;
            if (map.x > 0) {
                map.x = 0;
            }
            break;
        case KEYCODE_RIGHT:
            map.x -= 5;
            break;
        case KEYCODE_UP:
            map.y += 5;
            if (map.y > 0) {
                map.y = 0;
            }
            break;
        case KEYCODE_DOWN:
            map.y -= 5;
            break;
    }

}

function loadComplete() {
    console.log("Load complete");

    var canvas = <HTMLCanvasElement>document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    map = new createjs.Container();
    stage.addChild(map);

    var mapBitmap = new createjs.Bitmap(<HTMLImageElement>ResourceLoader.get("maps/LostTemple.png"));
    map.addChild(mapBitmap);

    var hud = new createjs.Bitmap(<HTMLImageElement>ResourceLoader.get("game/zconsole.png"));
    stage.addChild(hud);

    var miniMap = new createjs.Bitmap(<HTMLImageElement>ResourceLoader.get("maps/LostTempleMiniMap.png"));
    miniMap.x = 6;
    miniMap.y = 348;
    stage.addChild(miniMap);

    var imgWireframSS = <HTMLImageElement>ResourceLoader.get("wirefram/wirefram.png");
    var wirefram = new createjs.Sprite(new createjs.SpriteSheet({
        images: [imgWireframSS],
        frames: { width: 64, height: 64, regX: 0, regY: 0 }
    }), 0);
    wirefram.gotoAndStop(47);
    wirefram.x = 168,
    wirefram.y = 386;
    stage.addChild(wirefram);

    var vespeneGeyser = new VespeneGeyser();
    vespeneGeyser.x = vespeneGeyser.y = 200;
    map.addChild(vespeneGeyser);

    var avenger = new Avenger();
    avenger.x = avenger.y = 100;
    map.addChild(avenger);

    stage.on("stagemouseup", function (evt: createjs.MouseEvent) {
        graphics.beginStroke("black");
        //graphics.moveTo(avenger.x, avenger.y).lineTo(evt.stageX, evt.stageY);
        graphics.endStroke();
        var point = map.globalToLocal(evt.stageX, evt.stageY);
        avenger.moveTo(point.x, point.y);
    });

    resize();
    window.addEventListener('resize', resize, false);

    var line = new createjs.Shape();
    var graphics = line.graphics;
    graphics.setStrokeStyle(1);
    stage.addChild(line);

    document.onkeydown = keyPressed;
}

//function resize() {
//    stage.canvas.width = window.innerWidth;
//    stage.canvas.height = window.innerHeight;
//}

var keepAspectRatio = true;

function resize() {
    // browser viewport size
    var w = window.innerWidth;
    var h = window.innerHeight;

    // stage dimensions
    var ow = 640; // your stage width
    var oh = 480; // your stage height

    if (keepAspectRatio) {
        // keep aspect ratio
        var scale = Math.min(w / ow, h / oh);
        stage.scaleX = scale;
        stage.scaleY = scale;

        // adjust canvas size
        stage.canvas.width = ow * scale;
        stage.canvas.height = oh * scale;
    }
    else {
        // scale to exact fit
        stage.scaleX = w / ow;
        stage.scaleY = h / oh;

        // adjust canvas size
        stage.canvas.width = ow * stage.scaleX;
        stage.canvas.height = oh * stage.scaleY;
    }

    // update the stage
    stage.update()
}

function handleTick(evtObj) {
    stage.update(evtObj);
    var measuredFPS = createjs.Ticker.getMeasuredFPS();
    lblDebug.innerText = "Measured FPS: " + measuredFPS.toFixed(0);

}