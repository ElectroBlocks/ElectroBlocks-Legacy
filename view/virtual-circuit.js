
const SVG = require('svg.js');
const fs = require('fs');
const path = require('path');
require('svg.pan-zoom.js');
const { ArduinoComponent } = require('../output/frontend/virtual-circuit/component/arduino.component');

const { ServoComponent } = require('../output/frontend/virtual-circuit/component/servo.component');


(async () => {

    window.virtualCircuitSpace = SVG('virtual-circuit');

    window.links = window.virtualCircuitSpace.group();
    window.markers = window.virtualCircuitSpace.group();
    window.nodes = window.virtualCircuitSpace.group();


    const arduinoBreadboardString = fs.readFileSync(path.join(__dirname, 'images', 'debug-mode', 'arduino-breadboard-wired-copy.svg')).toString();

    const servoString = fs.readFileSync(path.join(__dirname, 'images', 'debug-mode', 'servo.svg')).toString();

    window.arduino = new ArduinoComponent(window.virtualCircuitSpace.svg(arduinoBreadboardString).children().pop());

    window.servo = new ServoComponent(window.virtualCircuitSpace.svg(servoString).children().pop(), 1);


    nodes.add(window.arduino.svg);
    nodes.add(window.servo.svg);

    window.arduino.move(30, 30);

    window.cZoom = window.nodes.panZoom();

    window.drawLine = (p1x, p1y, p2x, p2y) => {
        if (window.cZoom.transform) {
            const scaleX = window.cZoom.transform.scaleX;
            const scaleY = window.cZoom.transform.scaleY;

            const offsetX = window.cZoom.transform.transformedX;
            const offsetY = window.cZoom.transform.transformedY;

            p1x /= scaleX;
            p2x /= scaleX;

            p1y /= scaleY;
            p2y /= scaleY;

            p1x -= offsetX ;
            p2x -= offsetX ;

            p1y -= offsetY ;
            p2y -= offsetY ;


        }

        const line = window
            .virtualCircuitSpace
            .line(0, 0, 0, 0)
            .stroke({width: 2, color: '#AA0000', opacity: .7})
            .front();

        console.log(line);

        window.nodes.add(line);

        line.plot(p1x, p1y, p2x, p2y);

    };

    window.lines = [];


   // window.drawXLine = ()

    window.drawLineBetweenTwoNodes = (svgA, svgB) => {

        svgB.fill("#AA0000");
        svgA.fill("#AA0000");

        const minusX =
            document.querySelector("#content-blocks").offsetWidth;
        const minusY =
            document.querySelector("#top-menu").offsetHeight;

        const boxA = svgA.node.getClientRects()[0];

        const boxB = svgB.node.getClientRects()[0];

        console.log(boxA, boxB, 'boxes');

        let p1x = boxA.x - minusX + (boxA.width / 2);

        let p1y = boxA.y - minusY + (boxA.height / 2);

        let p2x = boxB.x - minusX + (boxB.width / 2);

        let p2y = boxB.y - minusY + (boxB.height / 2);

        console.log(p1x, p1y, p2x, p2y, 'points');

        window.drawLine(p1x, p1y, p2x, p2y);

    };

    window.arduino.move(100, 410);
    window.servo.height("2.1in").move(10, 10);;


})();
