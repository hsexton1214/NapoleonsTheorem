/* 
 * Hannah Sexton
 * Natalie Leatherman
 * 
 */

var gl;
var program;

var pointColor = [0.0, 0.0, 0.0, 1.0];

function canvasMain() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);

    ///draw object

    



//    var circleColor = [.5, .5, .5, 1];
//    drawObject(gl, program, drawCircle(0, 0, 0, 1), circleColor, gl.LINE_LOOP);
//    var lineColor = [.5, .5, .5, 1];
//    drawObject(gl, program, drawLine(0, 1, 0, -1), lineColor, gl.LINE_STRIP);
//    
//    
//    drawObject(gl, program, drawPoint(0, 0), pointColor, gl.TRIANGLE_FAN);
//    drawInitialTriangle(0, 0, -.25, .25, .25, .25);
//    drawMidpoint(-.5,.5,-.25,.5);
//    
//    
    canvas.addEventListener("mousedown", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        y = y / 2.0;

        drawObject(gl, program, drawPoint(x, y), pointColor, gl.TRIANGLE_FAN);
      
    });

 drawInitialTriangle(-.5, -.25, 0, .5, .5, -.25);
        drawCenteroids(-.5, -.25, 0, .5, .5, -.25);
}
;

function drawInitialTriangle(x1, y1, x2, y2, x3, y3) {
    var pointColor2 = [1.0, 0.0, 0.0, 1.0];
    var lineColor = [0.0, 1.0, 0.0, 1.0];
    drawObject(gl, program, drawPoint(x1, y1), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x2, y2), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x3, y3), pointColor2, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawLine(x1, y1, x2, y2), lineColor, gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x2, y2, x3, y3), lineColor, gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x1, y1, x3, y3), lineColor, gl.LINE_STRIP);
}
;//drawTriangle

function calculateIntersection(a, b, c, d) {
    var r = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
    var midpoint = (c+a) /2;
    var initialX = midpoint;
    var initialY = Math.sqrt(r*r-initialX*initialX);
    var changeX = c-a;
    var changeY = d-b;
    var finalX = (changeX/r)*initialX+(changeY/r)*initialX;
    var finalY = (-changeY/r)*initialY+(changeX/r)*initialY;
   
   
    drawObject(gl, program, drawPoint(finalX, finalY), [0.5,0.5,0.5,1.0], gl.TRIANGLE_FAN);
}
;

//endpoints of the line segment
function drawMidpoint(x1, y1, x2, y2) {
    var circleColor = [1.0, 0.0, 0.0, 1.0];
    drawObject(gl, program, drawCircle(x1, y1, x2, y2), circleColor, gl.LINE_LOOP);
    drawObject(gl, program, drawCircle(x2, y2, x1, y1), circleColor, gl.LINE_LOOP);
      calculateIntersection(x1,y1,x2,y2);
    var midpointX = (x1 + x2) / 2;
    var midpointY = (y1 + y2) / 2;
    drawObject(gl, program, drawPoint(midpointX, midpointY), pointColor, gl.TRIANGLE_FAN);
    return vec2(midpointX, midpointY);
}
;//drawMidpoint

//assumes the circles have the same radius


//initial Triangle
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
;//drawCircle
function drawLine(x1, y1, x2, y2) {
    var lineVertices = [];

    lineVertices.push(vec2(x1, y1));
    lineVertices.push(vec2(x2, y2));
    return lineVertices;
}
;//drawLine

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
;//drawPoint


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
}//drawObject
