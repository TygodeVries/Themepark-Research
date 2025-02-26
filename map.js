var img;
var pin;

function createSketch(canvasId, bgColor) {
    return function (p) {
        let img;
        p.camera = { x: 2000, y: 2000, zoom: 0.3 };
        p.mouseOverCanvas = false;
        let isDragging = false;
        let touchStartDist = 0;

        p.setup = function () {
            let canvas = p.createCanvas(800, 600);
            canvas.parent(canvasId);
            img = p.loadImage('./images/efteling_map_cut.jpg');
            pin = p.loadImage('./images/pin.png');

            canvas.mouseOver(() => p.mouseOverCanvas = true);
            canvas.mouseOut(() => p.mouseOverCanvas = false);
        };

        p.mousePressed = function () {
            isDragging = false;
        };

        p.mouseDragged = function () {
            if (p.mouseOverCanvas) {
                let scaleFactor = 1 / p.camera.zoom;
                p.camera.x -= p.movedX * scaleFactor;
                p.camera.y -= p.movedY * scaleFactor;
                isDragging = true;
            }
        };

        p.mouseReleased = function () {
            if (!isDragging && p.mouseOverCanvas) {
                placePin(p.mouseX, p.mouseY);
            }
        };

        p.mouseWheel = function (event) {
            if (p.mouseOverCanvas) {
                zoom(event.delta, p.mouseX, p.mouseY);
                event.preventDefault();
            }
        };

        p.touchStarted = function () {
            if (p.touches.length === 2) {
                touchStartDist = getTouchDist(p.touches);
            }
        };

        p.touchMoved = function () {
            if (p.touches.length === 1) {
                let scaleFactor = 1 / p.camera.zoom;
                p.camera.x -= (p.touches[0].movementX || 0) * scaleFactor;
                p.camera.y -= (p.touches[0].movementY || 0) * scaleFactor;
            } else if (p.touches.length === 2) {
                let newDist = getTouchDist(p.touches);
                let delta = newDist - touchStartDist;
                zoom(-delta * 5, (p.touches[0].x + p.touches[1].x) / 2, (p.touches[0].y + p.touches[1].y) / 2);
                touchStartDist = newDist;
            }
            return false;
        };

        p.touchEnded = function () {
            if (p.touches.length === 0) {
                touchStartDist = 0;
            }
        };

        function getTouchDist(touches) {
            let dx = touches[0].x - touches[1].x;
            let dy = touches[0].y - touches[1].y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function zoom(delta, x, y) {
            let zoomFactor = delta > 0 ? 1.1 : 0.9;
            let newZoom = p.constrain(p.camera.zoom * zoomFactor, 0.2, 1.0);
            
            let mouseXBefore = (x - p.width / 2) / p.camera.zoom + p.camera.x;
            let mouseYBefore = (y - p.height / 2) / p.camera.zoom + p.camera.y;

            p.camera.zoom = newZoom;

            let mouseXAfter = (x - p.width / 2) / p.camera.zoom + p.camera.x;
            let mouseYAfter = (y - p.height / 2) / p.camera.zoom + p.camera.y;

            p.camera.x -= mouseXAfter - mouseXBefore;
            p.camera.y -= mouseYAfter - mouseYBefore;
        }

        function placePin(x, y) {
            let mapX = (x - p.width / 2) / p.camera.zoom + p.camera.x;
            let mapY = (y - p.height / 2) / p.camera.zoom + p.camera.y;
            console.log(`Clicked at map coordinates: (${mapX.toFixed(2)}, ${mapY.toFixed(2)})`);
            p.pin = { x: mapX.toFixed(2), y: mapY.toFixed(2) };
        }

        p.draw = function () {
            p.background(bgColor);
            p.push();
            p.translate(p.width / 2, p.height / 2);
            p.scale(p.camera.zoom);
            p.translate(-p.camera.x, -p.camera.y);
            if (img) p.image(img, 0, 0);
            if (p.pin) p.image(pin, p.pin.x - 250, p.pin.y - 250);
            p.pop();
        };
    };
}

let sketch1 = createSketch('canvas1', '#386313');
let sketch2 = createSketch('canvas2', '#386313');

let myp5_1 = new p5(sketch1);
let myp5_2 = new p5(sketch2);

function GetFavoLocation() {
    return myp5_1.pin ? `x ${myp5_1.pin.x} y ${myp5_1.pin.y}` : "No location selected";
}

function GetLeastFavoLocation() {
    return myp5_2.pin ? `x ${myp5_2.pin.x} y ${myp5_2.pin.y}` : "No location selected";
}
