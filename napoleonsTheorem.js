/* 
 * Hannah Sexton
 * Natalie Leatherman
 * CSCI 346 Final Project
 * Centroids
 * April 27, 2016
 */

var gl;
var program;
var canvas;
var triX1, triY1, triX2, triY2, triX3, triY3;
currentPoint = -1;
var mouseDown;

//color vectors
var lineColor = [0.8, 0.2, 1.0, 1.0];
var verticesColor = [0.0, 0.8, 1.0, 1.0];
var midpointColor = [1.0, 0.0, 1.0, 1.0];
var centroidColor = [0.0, 0.6, 0.2, 1.0];
var triColor1 = [0.0, 1.0, 0.0, 1.0]; //also use for intersection point of circle1
var circleColor1 = [1.0, 0.0, 0.0, 1.0];
var triColor2 = [0.0, 0.0, 1.0, 1.0]; //also use for intersection point of circle2
var circleColor2 = [0.0, 0.5, 0.5, 1.0];
var triColor3 = [0.8, 0.6, 0.0, 1.0]; //also use for intersection point of circle3
var circleColor3 = [0.4, 0.0, 0.4, 1.0];

function canvasMain() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //initial location of the triangle
    triX1 = -.25;
    triY1 = -.25;
    triX2 = .0;
    triY2 = .125;
    triX3 = .5;
    triY3 = -.25;
    drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
    drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);

    canvas.onmousedown = handleMouseDown;
    canvas.onmouseup = handleMouseUp;
    canvas.onmousemove = handleMouseMove;
}
; //canvasMain

function handleMouseDown(event) {
    mouseDown = true;
    var threshold = 0.05;
    var lastMouseX = 2 * (event.clientX - 8) / canvas.width - 1;
    var lastMouseY = 2 * (canvas.height - (event.clientY - 80)) / canvas.height - 1;
    var p1thres = false;
    var p2thres = false;
    var p3thres = false;
    var pointCount = 0;

    //tests if the mouse is within a certain threshold to a point
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

    //if not near any points, nothing is done
    if (pointCount === 0) {
        console.log("not on point");
        console.log(lastMouseX + ", " + lastMouseY);
    }
    // if mouse is near 1 point it sets the point available for change to the 
    // point the mouse is near
    else if (pointCount === 1) {
        console.log("1 point");
        console.log(lastMouseX + ", " + lastMouseY);
        if (p1thres === true) {
            console.log("point 1");
            currentPoint = 1;
        } else if (p2thres === true) {
            console.log("point 2");
            currentPoint = 2;
        } else if (p3thres === true) {
            console.log("point 3");
            currentPoint = 3;
        }
    }
    // if mouse is near multiple points, it sets the point available for 
    // change to the point the mouse is closest to
    else {
        var actualp1Thres;
        var actualp2Thres;
        var actualp3Thres;
        actualp1Thres = (lastMouseX - triX1) * (lastMouseX - triX1) + (lastMouseY - triY1) * (lastMouseY - triY1);
        actualp2Thres = (lastMouseX - triX1) * (lastMouseX - triX1) + (lastMouseY - triY1) * (lastMouseY - triY1);
        actualp3Thres = (lastMouseX - triX1) * (lastMouseX - triX1) + (lastMouseY - triY1) * (lastMouseY - triY1);
        if (actualp1Thres <= actualp2Thres && actualp1Thres <= actualp3Thres) {
            currentPoint = 1;
        } else if (actualp2Thres <= actualp1Thres && actualp2Thres <= actualp3Thres) {
            currentPoint = 2;
        } else if (actualp3Thres <= actualp1Thres && actualp3Thres <= actualp2Thres) {
            currentPoint = 3;
        }
        console.log("multiple points");
        console.log(triX1 + ", " + triY1 + "," + triX2 + "," + triY2 + ", " + triX3 + ", " + triY3);
        console.log(pointCount);
    }
}
;//handleMouseDown

function handleMouseUp(event) {
    mouseDown = false;
    currentPoint = -1;
}
; //handleMouseUp

function handleMouseMove(event) {
    if (mouseDown) {
        //when each point is active the the entire triangle readjusts as the mouse
        //moves to accommodate the changing x and y values of the active point.
        if (currentPoint === 1) {
            triX1 = 2 * (event.clientX - 8) / canvas.width - 1;
            triY1 = 2 * (canvas.height - (event.clientY - 80)) / canvas.height - 1;
            drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
            drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);
        } else if (currentPoint === 2) {
            triX2 = 2 * (event.clientX - 8) / canvas.width - 1;
            triY2 = 2 * (canvas.height - (event.clientY - 80)) / canvas.height - 1;
            drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
            drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);
        } else if (currentPoint === 3) {
            triX3 = 2 * (event.clientX - 8) / canvas.width - 1;
            triY3 = 2 * (canvas.height - (event.clientY - 80)) / canvas.height - 1;
            drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
            drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);
        }
        //when no point is active the currentPoint is -1. In this case the points
        //will not change until a point becomes active
        else if (currentPoint === -1) {
            drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
            drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);
        }
    }
    //when the mouseDown is false the points will not change change until mouseDown
    //is true and a point is active
    else {
        drawInitialTriangle(triX1, triY1, triX2, triY2, triX3, triY3);
        drawCentroids(triX1, triY1, triX2, triY2, triX3, triY3);
    }
}
; //handleMouseMove

//this function takes in the 3 vertices and draws the 3 points and 3 lines that 
// make up the initial triangle
function drawInitialTriangle(x1, y1, x2, y2, x3, y3) {
    drawObject(gl, program, drawPoint(x1, y1), verticesColor, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x2, y2), verticesColor, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(x3, y3), verticesColor, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawLine(x1, y1, x2, y2), triColor1, gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x2, y2, x3, y3), triColor2, gl.LINE_STRIP);
    drawObject(gl, program, drawLine(x1, y1, x3, y3), triColor3, gl.LINE_STRIP);
}
; //drawInitialTriangle 

//This function requires that the 2 circles have an equal radius and that the 
//points given in parameter, (a,b) and (c,d), be r distance from one another
function calculateCircleIntersection(a, b, c, d, genInterColor) {
    //center0x and center0y are always 0
    var center2x = c - a;
    var center2y = d - b;
    var v1 = normalize(vec2(c - a, d - b), false);
    var v2 = normalize(vec2(1, 0), false);
    //center3x and center3y are always 0
    var center4x = center2x * (dot(v1, v2)) - center2y * (cross2by2(v1, v2));
    var center4y = center2x * (cross2by2(v1, v2)) + center2y * (dot(v1, v2));
    var r = Math.sqrt(center4x * center4x + center4y * center4y);
    //calculates x and y if the case were at the origin
    var initialX1 = r / 2;
    var initialY1 = Math.sqrt(r * r - (r / 2) * (r / 2));
    //the second intersection is reflected about the x-axis
    var initialX2 = initialX1;
    var initialY2 = -1 * initialY1;
    //rotate the points back to their original theta and translate back to the original location
    var finalX1 = initialX1 * dot(v1, v2) + initialY1 * cross2by2(v1, v2) + a;
    var finalY1 = -initialX1 * cross2by2(v1, v2) + initialY1 * dot(v1, v2) + b;
    var finalX2 = initialX2 * dot(v1, v2) + initialY2 * cross2by2(v1, v2) + a;
    var finalY2 = -initialX2 * cross2by2(v1, v2) + initialY2 * dot(v1, v2) + b;
    drawObject(gl, program, drawPoint(finalX1, finalY1), genInterColor, gl.TRIANGLE_FAN);
    drawObject(gl, program, drawPoint(finalX2, finalY2), genInterColor, gl.TRIANGLE_FAN);
    //drawObject(gl, program, drawLine(finalX1,finalY1,finalX2,finalY2), [0.0,0.0,0.0,1.0], gl.LINE_STRIP);
}
;//calculateCircleIntersection

//function that allows the cross product of vec2 
function cross2by2(u, v) {
    var result = u[0] * v[1] - v[0] * u[1];
    return result;
}
;

//this function takes in the endpoints of a line and draws 2 circles with a 
//radius of the line, with 1 centered at (x1,y1) and the other at (x2,y2), the 
//intersection of those circles, and the midpoint of the line
function drawMidpoint(x1, y1, x2, y2, genCircleColor, genInterColor) {
    drawObject(gl, program, drawCircle(x1, y1, x2, y2), genCircleColor, gl.LINES);
    drawObject(gl, program, drawCircle(x2, y2, x1, y1), genCircleColor, gl.LINES);
    calculateCircleIntersection(x1, y1, x2, y2, genInterColor);
    var midpointX = (x1 + x2) / 2;
    var midpointY = (y1 + y2) / 2;
    drawObject(gl, program, drawPoint(midpointX, midpointY), midpointColor, gl.TRIANGLE_FAN);
    return vec2(midpointX, midpointY);
}
; //drawMidpoint

//this function takes in the 3 vertices of the original triangle, and uses 
//midpoints to draw the lines for the centroid
function drawCentroids(x1, y1, x2, y2, x3, y3) {
    var midPoint1 = drawMidpoint(x1, y1, x2, y2, circleColor1, triColor1);
    drawObject(gl, program, drawLine(midPoint1[0], midPoint1[1], x3, y3), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);
    var midPoint2 = drawMidpoint(x2, y2, x3, y3, circleColor2, triColor2);
    drawObject(gl, program, drawLine(midPoint2[0], midPoint2[1], x1, y1), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);
    var midPoint3 = drawMidpoint(x1, y1, x3, y3, circleColor3, triColor3);
    drawObject(gl, program, drawLine(midPoint3[0], midPoint3[1], x2, y2), [0.0, 1.0, 1.0, 1.0], gl.LINE_STRIP);
    //lineIntersection(midPoint1[0],midPoint1[1],x3,y3,midPoint2[0],midPoint2[1],x1,y1);
}
;//drawCentroids

//This function takes in the endpoints of 2 lines and finds the intersection.
//It currently still has bugs though and is not implempented in the program.
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    var slopeLine1 = (y2 - y1) / (x2 - x1);
    var slopeLine2 = (y4 - y3) / (x4 - x3);
    var xInter = (x1 * slopeLine1 - x3 * slopeLine2) / (slopeLine1 - slopeLine2);
    var yInter = slopeLine1 * (xInter - x1) + y1;
    drawObject(gl, program, drawPoint(xInter, yInter), centroidColor, gl.TRIANGLE_FAN);
}
;//lineIntersection

//This function takes in the center (x1,y1) and a point on the circle (x2,y2)
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

//This function takes in the endpoints of a line
function drawLine(x1, y1, x2, y2) {
    var lineVertices = [];
    lineVertices.push(vec2(x1, y1));
    lineVertices.push(vec2(x2, y2));
    return lineVertices;
}
; //drawLine

//This function takes in point (x,y) and draws a small diamond shape to 
//represent a point
function drawPoint(x, y) {
    var pointSize = .02;
    var pointVertices = [
        vec2(x - pointSize, y),
        vec2(x, y + pointSize),
        vec2(x + pointSize, y),
        vec2(x, y - pointSize)
    ];
    return pointVertices;
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
} //drawObject
