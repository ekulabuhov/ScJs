var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ResourceLoader", "easel"], function(require, exports, ResourceLoader) {
    var Avenger = (function (_super) {
        __extends(Avenger, _super);
        function Avenger() {
            var _this = this;
            var imgAvengerSS = ResourceLoader.get("unit/zerg/avenger.png");
            this.interval = 0;
            this.turn = 0;
            _super.call(this, new createjs.SpriteSheet({
                images: [imgAvengerSS],
                frames: { width: 48, height: 48, regX: 24, regY: 24 },
                framerate: 5,
                animations: {
                    turn0: {
                        frames: [0, 17, 34, 51, 68]
                    },
                    turn1: {
                        frames: [2, 19, 36, 53, 70]
                    },
                    turn2: {
                        frames: [4, 21, 38, 55, 72]
                    },
                    turn3: {
                        frames: [6, 23, 40, 57, 74]
                    },
                    turn4: {
                        frames: [8, 25, 42, 59, 76]
                    },
                    turn5: {
                        frames: [10, 27, 44, 61, 78]
                    },
                    turn6: {
                        frames: [12, 29, 46, 63, 80]
                    },
                    turn7: {
                        frames: [14, 31, 48, 65, 82]
                    },
                    turn8: {
                        frames: [16, 33, 50, 67, 84]
                    }
                }
            }));

            this.shadow = new createjs.Shadow("#454", 0, 42, 0);
            createjs.Ticker.on("tick", function (event) {
                _this.tick(event);
            });
            this.currentFrames = this.spriteSheet.getAnimation("turn0").frames;
        }
        // Iscript creates this special wobly effect when idle
        Avenger.prototype.tick = function (event) {
            this.interval += event.delta;

            if (this.interval > 200) {
                if (this.turn == 0) {
                    this.y -= 1;
                    this.shadow.offsetY += 1;
                }
                if (this.turn == 1) {
                }
                if (this.turn == 2) {
                    this.y += 1;
                    this.shadow.offsetY -= 1;
                }
                if (this.turn == 3) {
                    this.y += 1;
                    this.shadow.offsetY -= 1;
                }
                if (this.turn == 4) {
                    this.y -= 1;
                    this.shadow.offsetY += 1;
                }

                this.gotoAndStop(this.currentFrames[this.turn]);

                this.interval = 0;
                this.turn++;
                if (this.turn > 4)
                    this.turn = 0;
            }
        };

        Avenger.prototype.moveTo = function (x, y) {
            var distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
            var angle = Math.atan2(y - this.y, x - this.x) * 180 / Math.PI;

            // Atan2 gives a result in the range -pi to +pi.* If you want a number in the range 0 to 2pi, just add 2pi if the result is less than 0.
            angle = angle < 0 ? angle + 360 : angle;

            // Up: 270, Right: 0, Down: 90, Left: 180
            // Add 90 modulus 360 to make Up 0 degree
            angle = (angle + 90) % 360;
            console.log(angle);

            // There are 16 possible directions for the sprite. 360/16=22.5.
            // Rounding gives 22.5 / 2 = 11.25 degrees of tolerance for each direction, i.e. 101 and 79 will give the same direction as 90.
            var turn = Math.round(angle / 22.5);
            console.log("turn" + turn);
            this.scaleX = 1;

            // As we have only 9 animations, we create other 7 by flipping existing frames.
            if (turn > 8) {
                turn = 8 - (turn - 8);
                this.scaleX = -1;
            }

            //this.gotoAndPlay("turn" + turn);
            this.currentFrames = this.spriteSheet.getAnimation("turn" + turn).frames;
            this.interval = 200;

            // To calculate duration we multiply distance by pixels per second
            createjs.Tween.get(this, { override: true }).to({ x: x, y: y }, distance * (1000 / 100), createjs.Ease.linear);
        };
        return Avenger;
    })(createjs.Sprite);

    
    return Avenger;
});
