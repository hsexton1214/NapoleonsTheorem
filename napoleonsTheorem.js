/* 
 * Hannah Sexton
 * Natalie Leatherman
 * 
 */

var gl;
//var program;
var mouseClick;

function canvasMain() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);
  //  mouseClick = false;

    ///draw object
    var circleColor = [.5, .5, .5, 1];
    drawObject(gl, program, drawCircle(0, 0, 0, 1), circleColor, gl.TRIANGLE_FAN);
   // if (mouseClick === true) {
   //     mouseClick = false;
        var pointColor = [0.0, 1.0, 0.0, 1.0];
        drawObject(gl, program, drawPoint(0, 0), pointColor, gl.TRIANGLE_FAN);
  //  }
}
;//canvas main
function mouseUp(event) {
    var pointColor = [0.0, 0.0, 0.0, 1.0];
    drawObject(gl, program, drawPoint(event.clientX, event.clientY), pointColor, gl.TRIANGLE_FAN);
}
;

function drawTriangle(x1, y1, x2, y2, x3, y3) {
}
;//drawTriangle
function drawMidpoint(x1, y1, x2, y2) {
}
;//drawMidpoint
function drawCenteroids(x1, y1, x2, y2, x3, y3) {
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
    var inc = 1 / 50;

    for (var a = 0; a < 1; a += inc) {
        lineVertices.push(vec2(a * x1 + (1 - a) * x2, (a * y1 + (1 - a) * y2)));
    }
    return lineVertices;
}
;//drawLine

function drawPoint(event) {
    var x = event.clientX;
    var y = event.clientY;
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
