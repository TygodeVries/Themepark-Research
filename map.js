var img;
var pin;

function createSketch(canvasId, bgColor) {
    return function (p) {
        let img;
        p.camera = { x: 2000, y: 2000, zoom: 0.3 };
        p.mouseOverCanvas = false;
        let isDragging = false;

        p.setup = function () {
            let canvas = p.createCanvas(800, 600);
            canvas.parent(canvasId);
            img = p.loadImage('./images/efteling_map_cut.jpg');
            pin = p.loadImage('./images/pin.png');

            canvas.mouseOver(() => p.mouseOverCanvas = true);
            canvas.mouseOut(() => p.mouseOverCanvas = false);
        };

        p.mousePressed = function () {
            isDragging = false; // Reset drag status on mouse press
        };

        p.mouseDragged = function () {
            if (p.mouseOverCanvas) {
                let scaleFactor = 1 / p.camera.zoom;
                p.camera.x -= p.movedX * scaleFactor;
                p.camera.y -= p.movedY * scaleFactor;
                isDragging = true; // User is dragging
            }
        };

        p.mouseReleased = function () {
            if (!isDragging && p.mouseOverCanvas) {
                // Convert screen click to map coordinates
                let mapX = (p.mouseX - p.width / 2) / p.camera.zoom + p.camera.x;
                let mapY = (p.mouseY - p.height / 2) / p.camera.zoom + p.camera.y;
                console.log(`Clicked at map coordinates: (${mapX.toFixed(2)}, ${mapY.toFixed(2)})`);
                p.pin = {
                    x: mapX.toFixed(2),
                    y: mapY.toFixed(2)
                }
            }
        };

        p.mouseWheel = function (event) {
            if (p.mouseOverCanvas) {
                let zoomFactor = -event.delta > 0 ? 1.1 : 0.9;
                let newZoom = p.constrain(p.camera.zoom * zoomFactor, 0.1, 2.5);

                let mouseXBefore = (p.mouseX - p.width / 2) / p.camera.zoom + p.camera.x;
                let mouseYBefore = (p.mouseY - p.height / 2) / p.camera.zoom + p.camera.y;

                p.camera.zoom = newZoom;

                let mouseXAfter = (p.mouseX - p.width / 2) / p.camera.zoom + p.camera.x;
                let mouseYAfter = (p.mouseY - p.height / 2) / p.camera.zoom + p.camera.y;

                p.camera.x -= mouseXAfter - mouseXBefore;
                p.camera.y -= mouseYAfter - mouseYBefore;

                event.preventDefault();
            }
        };

        p.draw = function () {
            p.background(bgColor);

            p.push();
            p.translate(p.width / 2, p.height / 2);
            p.scale(p.camera.zoom);
            p.translate(-p.camera.x, -p.camera.y);
            if (img) p.image(img, 0, 0);
            if (p.pin)
            {
                p.image(pin, p.pin.x - 250, p.pin.y - 250);
            }

            p.pop();
        };
    };
}

// Create two independent sketches
let sketch1 = createSketch('canvas1', 0);
let sketch2 = createSketch('canvas2', 0);


// Create two separate p5 instances
let myp5_1 = new p5(sketch1);
let myp5_2 = new p5(sketch2);

function GetFavoLocation() {
    if (myp5_1.pin) {
        return "x " + myp5_1.pin.x + " y " + myp5_1.pin.y;
    } else {
        return "No location selected";
    }
}

function GetLeastFavoLocation() {
    if (myp5_2.pin) {
        return "x " + myp5_2.pin.x + " y " + myp5_2.pin.y;
    } else {
        return "No location selected";
    }
}