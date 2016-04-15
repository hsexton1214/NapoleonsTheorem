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
}//drawCircle
function drawLine(x1,y1,x2,y2){
    
}//drawLine
