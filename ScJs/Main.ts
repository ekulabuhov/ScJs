/// <amd-dependency path="tween" />

import ResourceLoader = require("ResourceLoader");
import Avenger = require("Avenger");
import VespeneGeyser = require("VespeneGeyser");

console.log("Loading resources");
ResourceLoader.preload(loadComplete);

var stage: createjs.Stage;
var lblDebug: HTMLDivElement = <HTMLDivElement>document.getElementById("lblDebug");

function loadComplete() {
    console.log("Load complete");

    var canvas = <HTMLCanvasElement>document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    var map = new createjs.Bitmap(<HTMLImageElement>ResourceLoader.get("maps/LostTemple.png"));
    stage.addChild(map);

    var hud = new createjs.Bitmap(<HTMLImageElement>ResourceLoader.get("game/zconsole.png"));
    stage.addChild(hud);

    var vespeneGeyser = new VespeneGeyser();
    vespeneGeyser.x = vespeneGeyser.y = 200;
    stage.addChild(vespeneGeyser);

    var avenger = new Avenger();
    avenger.x = avenger.y = 100;
    stage.addChild(avenger);

    stage.on("stagemouseup", function (evt: createjs.MouseEvent) {
        graphics.beginStroke("black");
        //graphics.moveTo(avenger.x, avenger.y).lineTo(evt.stageX, evt.stageY);
        graphics.endStroke();
        var point = stage.globalToLocal(evt.stageX, evt.stageY);
        avenger.moveTo(point.x, point.y);
    });

    resize();
    window.addEventListener('resize', resize, false);

    var line = new createjs.Shape();
    var graphics = line.graphics;
    graphics.setStrokeStyle(1);
    stage.addChild(line);
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