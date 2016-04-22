/* 
 * Hannah Sexton
 * Natalie Leatherman
 */

var gl;
var program;
var canvas;
var pointColor = [0.0, 0.0, 0.0, 1.0];
var triX1, triY1, triX2, triY2, triX3, triY3;
//var triangle = [x1,y1,x2,y2,x3,y3];
currentPoint = -1;

var mouseDown;
//var lastMouseX;
//var lastMouseY; 

var lineColor = [0.8, 0.2, 1.0, 1.0];
var verticesColor = [0.0, 0.8, 1.0, 1.0];
var midpointColor = [1.0, 0.0, 1.0, 1.0];
var centroidColor = [0.0, 0.6, 0.2, 1.0];
var triColor1 = [0.0, 1.0, 0.0, 1.0]; //also use for intersection point of circle1
var circleColor1 = [1.0, 0.0, 0.0, 1.0];
var triColor2 = [0.0, 0.0, 1.0, 1.0]; //also use for intersection point of circle2
var circleColor2 = [1.0, 0.4, 0.0, 1.0];
var triColor3 = [0.8, 0.6, 0.0, 1.0]; //also use for intersection point of circle3
var circleColor3 = [0.4, 0.0, 0.4, 1.0];

function canvasMain() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 0.8, 1.0);
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);
    canvas.addEventListener("mousedown", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
       // y = y / 2.0;
        // drawObject(gl, program, drawPoint(x, y), pointColor, gl.TRIANGLE_FAN);
        console.log(x, y);
    });
    triX1 = -.5;
    triY1 = -.25;
    triX2 = .2;
    triY2 = .5;
    triX3 = .5;
    triY3 = -.25;
    drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
    drawCenteroids(triX1, triY1, triX2, triY2, triX3, triY3);
    drawObject(gl, program, drawPoint(0, 0), [0.0, 0.0, 1.0, 1.0], gl.TRIANGLE_FAN);
    canvas.onmousedown = handleMouseDown;
}
; //canvasMain

function handleMouseDown(event) {

    mouseDown = true;
    var threshold = 0.1;
    var lastMouseX = 2 * event.clientX / canvas.width - 1;
    var lastMouseY = 2 * (canvas.height - event.clientY) / canvas.height - 1;
    var p1thres = false;
    var p2thres = false;
    var p3thres = false;
    var pointCount = 0;

//    if (((lastMouseX - threshold) < triX1) && (triX1 < (lastMouseX + threshold)) && ((lastMouseY - threshold)< triY1) && (triY1 < (lastMouseY + threshold))) {
//        p1thres = true;
//        pointCount++;fsdfdsvdfdsfddfsdfklsdjfsljdkf
//    }
//    if (((lastMouseX - threshold) < triX2) && (triX2 < (lastMouseX + threshold)) && ((lastMouseY - threshold) < triY2) && (triY2 < (lastMouseY + threshold))) {
//        p2thres = true;
//        pointCount++;
//    }
//    if (((lastMouseX - threshold) < triX3) && (triX3 < (lastMouseX + threshold)) && ((lastMouseY - threshold) < triY3) && (triY3 < (lastMouseY + threshold))) {
//        p3thres = true;
//        pointCount++;
//    }
    if (((lastMouseX - triX1) * (lastMouseX - triX1) + (lastMouseY - triY1) * (lastMouseY - triY1)) < (threshold * threshold)) {
        p1thres = true;
        pointCount++;
    }
    if (((lastMouseX - triX2) * (lastMouseX - triX2) + (lastMouseY - triY2) * (lastMouseY - triY2)) < (threshold * threshold)) {
        p2thres = true;
        pointCount++;
    }
    if (((lastMouseX - triX3) * (lastMouseX - triX3) + (lastMouseY - triY3) * (lastMouseY - triY3)) < (threshold * threshold)) {
        p3thres = true;
        pointCount++;
    }

    if (pointCount === 0) {
        console.log("not on point");
        console.log(lastMouseX + ", " + lastMouseY);
    } else if (pointCount === 1) {
        console.log("1 point");
        if (p1thres === true) {
            currentPoint = 0;
        } else if (p2thres === true) {
            currentPoint = 1;
        } else if (p3thres === true) {
            currentPoint = 2;
        }
    } else {
        console.log("multiple points");
        console.log(triX1 + ", " + triY1 + "," + triX2 + "," + triY2 + ", " + triX3 + ", " + triY3);
        console.log(pointCount);
    }

    // pick the point
}
;
function handleMouseUp(event) {
    mouseDown = false;
}
;
function handleMouseMove(event) {
    if (!mouseDown) {
        return;
    }

}
;
function drawInitialTriangle(x1, y1, x2, y2, x3, y3) {
//    var x1 = vector[0];
//    var y1 = vector[1];
//    var x2 = vector[2];
//    var y2 = vector[3];
//    var x3 = vector[4];
//    var y3 = vector[5];
    var pointColor2 = [1.0, 0.0, 0.0, 1.0];
    var lineColor = [0.0, 1.0, 0.0, 1.0];
    drawObject(gl, program, drawPoint(x1, y1), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x2, y2), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x3, y3), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawLine(x1, y1, x2, y2), lineColor, gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x2, y2, x3, y3), [0.0, 0.0, 1.0, 1.0], gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x1, y1, x3, y3), [0.8, 0.6, 0.0, 1.0], gl.LINE_STRIP);
}
; //drawTriangle 



function calculateIntersection(a, b, c, d) {
    var r = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
    var midpointX = (c + a) / 2;
    var midpointY = (b + d) / 2;
    var initialX = midpointX;
    var initialY = Math.sqrt(r * r - (initialX / 2) * (initialX / 2));
    var changeX = c - a;
    var changeY = d - b;
    var finalX = (changeX / r) * initialX - (changeY / r) * initialY - (changeX / r) * midpointX + (changeY / r) * midpointY + midpointX;
    var finalY = (changeY / r) * initialX + (changeX / r) * initialY - (changeY / r) * midpointX - (changeX / r) * midpointY + midpointY;
    // drawObject(gl, program, drawPoint(a, 0), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
    //  drawObject(gl, program, drawPoint(c, 0), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
    // drawObject(gl, program, drawPoint(initialX, initialY), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(finalX, finalY), [0.0, 1.0, 0.0, 1.0], gl.TRIANGLE_FAN);
}
;
//endpoints of the line segmentdfgdfgfgjlkfd
function drawMidpoint(x1, y1, x2, y2) {
    var circleColor = [1.0, 0.0, 0.0, 1.0];
    drawObject(gl, program, drawCircle(x1, y1, x2, y2), circleColor, gl.LINE_LOOP);
    drawObject(gl, program, drawCircle(x2, y2, x1, y1), circleColor, gl.LINE_LOOP);
    calculateIntersection(x1, y1, x2, y2);
    var midpointX = (x1 + x2) / 2;
    var midpointY = (y1 + y2) / 2;
    drawObject(gl, program, drawPoint(midpointX, midpointY), pointColor, gl.TRIANGLE_FAN);
    return vec2(midpointX, midpointY);
}
; //drawMidpoint

//assumes the circles have the same radius


function drawCenteroids(x1, y1, x2, y2, x3, y3) {
    var midPoint1 = drawMidpoint(x1, y1, x2, y2);
    drawObject(gl, program, drawLine(midPoint1[0], midPoint1[1], x3, y3), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);
//    var midPoint2 = drawMidpoint(x2, y2, x3, y3);
//    drawObject(gl, program, drawLine(midPoint2[0], midPoint2[1], x1, y1), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);
//    var midPoint3 = drawMidpoint(x1, y1, x3, y3);
//    drawObject(gl, program, drawLine(midPoint3[0], midPoint3[1], x2, y2), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);

}
;
function drawCircle(x1, y1, x2, y2) {
    var circleVertices = [];
    var inc = 2 * Math.PI / 50;
    var radius = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    for (var theta = 0; theta < 2 * Math.PI; theta += inc) {
        circleVertices.push(vec2(radius * Math.cos(theta) + x1, radius * Math.sin(theta) + y1));
    }
    return circleVertices;
}
; //drawCircle
function drawLine(x1, y1, x2, y2) {
    var lineVertices = [];
    lineVertices.push(vec2(x1, y1));
    lineVertices.push(vec2(x2, y2));
    return lineVertices;
}
; //drawLine

function drawPoint(x, y) {
    //may change to event
    // var x = event.clientX;
    // var y = event.clientY;
    var pointSize = .02;
    var pointVertices = [
        vec2(x - pointSize, y),
        vec2(x, y + pointSize),
        vec2(x + pointSize, y),
        vec2(x, y - pointSize)
    ];
    return pointVertices;
    //gl.clearColor(1.0,1.0,1.0,1.0);
}
; //drawPoint


function drawObject(gl, program, vertices, color, glType) {
    var colorLocation = gl.getUniformLocation(program, "uColor");
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
    gl.drawArrays(glType, 0, vertices.length);
}
; //drawObject


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(current){}
    
    requestAnimFrame(render);
}//render


