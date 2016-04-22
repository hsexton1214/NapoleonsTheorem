/* 
 * Hannah Sexton
 * Natalie Leatherman
 */

var gl;
var program;

var pointColor = [0.0, 0.0, 0.0, 1.0];
var triX1,triY1,triX2,triY2,triX3,triY3;
//var triangle = [x1,y1,x2,y2,x3,y3];

var mouseDown;
var lastMouseX;
var lastMouseY; 

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
//    canvas.addEventListener("mousedown", function (event) {
//        var x = 2 * event.clientX / canvas.width - 1;
//        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
//        y = y / 2.0;
//
//        drawObject(gl, program, drawPoint(x, y), pointColor, gl.TRIANGLE_FAN);
//      
//    });
 drawObject(gl, program, drawCircle(0, 0, 1, 1), [0.0,0.0,1.0,1.0], gl.LINE_LOOP);
 drawInitialTriangle(-.5, -.25, 0, .5, .5, -.25);
        drawCenteroids(-.5, -.25, 0, .5, .5, -.25);
        drawObject(gl, program, drawPoint(0, 0), [0.0,0.6,0.2,1.0], gl.TRIANGLE_FAN);

  canvas.addEventListener("mousedown", function (event) {
        var x = 2 * event.clientX / canvas.width - 1;
        var y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        y = y / 2.0;

       // drawObject(gl, program, drawPoint(x, y), pointColor, gl.TRIANGLE_FAN);sfsdfdsfs
        console.log(x,y);     
    });
 triX1=-.5;triY1= -.25;triX2= .2;triY2= .5;triX3= .5;triY3= -.25;
 drawInitialTriangle(triX1,triY1,triX2,triY2,triX3,triY3);
        drawCenteroids(triX1,triY1,triX2,triY2,triX3,triY3);
        drawObject(gl, program, drawPoint(0, 0), [0.0,0.0,1.0,1.0], gl.TRIANGLE_FAN);

        
}
;


function drawInitialTriangle(x1, y1, x2, y2, x3, y3) {
    var pointColor2 = [0.0, 0.8, 1.0, 1.0];

function handleMouseDown(event){
    mouseDown = true;
    var threshold = 0.1;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
};

function handleMouseUp(event){
    mouseDown = false;
};

function handleMouseMove(event){
  if(!mouseDown){
      return;
  }  
  
};

function drawInitialTriangle(x1,y1,x2,y2,x3,y3) {
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
    drawObject(gl, program, drawLine(x2, y2, x3, y3), [0.0,0.0,1.0,1.0], gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x1, y1, x3, y3), [0.8,0.6,0.0,1.0], gl.LINE_STRIP);
}
;//drawTriangle sdfdf

function calculateIntersection(a, b, c, d) {
    var r = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
    var midpointX = (c+a) /2;
    var midpointY = (b+d)/2;
    var initialX = midpointX;
    var initialY = Math.sqrt(r*r-(initialX/2)*(initialX/2));
    var changeX = c-a;
    var changeY = d-b;
    var finalX = (changeX/r)*initialX -(changeY/r)*initialY - (changeX/r)*midpointX + (changeY/r)*midpointY + midpointX;
    var finalY = (changeY/r)*initialX+(changeX/r)*initialY -(changeY/r)*midpointX - (changeX/r)*midpointY + midpointY;
   
 // drawObject(gl, program, drawPoint(a, 0), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
 //  drawObject(gl, program, drawPoint(c, 0), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
  // drawObject(gl, program, drawPoint(initialX, initialY), [0.0,0.5,0.0,1.0], gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(finalX, finalY), [0.0,1.0,0.0,1.0], gl.TRIANGLE_FAN);
}
;

//endpoints of the line segmentdfgdfgfgjlkfd
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

//assumes the circles have the same radiusdfsf


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
};//drawObject

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    theta[axis] += 1.0;
    gl.uniform3fv(thetaLoc, theta);
    
    gl.drawElements(gl.TRIANGLES,elementCount, gl.UNSIGNED_SHORT, 0);
    requestAnimFrame(render);
}//render
