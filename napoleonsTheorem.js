/* 
 * Hannah Sexton
 * Natalie Leatherman
 * 
 */

var gl;
var points;

function canvasMain() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
    
}
function drawTriangle(x1,y1,x2,y2,x3,y3){  
};//drawTriangle
function drawMidpoint(x1,y1,x2,y2){
};//drawMidpoint
function drawCenteroids(x1,y1,x2,y2,x3,y3){
};
function drawCircle(x1,y1,x2,y2){ 
    var circleVertices = [];
    var inc = 2*Math.PI / 50;
    var radius = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    
    for (var theta = 0; theta <2*Math.PI; theta += inc){
        circleVertices.push(vec2(radius*Math.cos(theta)+x1, radius*Math.sin(theta)+y1));
    }
    return circleVertices;
};//drawCircle
function drawLine(x1,y1,x2,y2){
    
};//drawLine
