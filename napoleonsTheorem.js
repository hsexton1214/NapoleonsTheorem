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
    gl.viewport(0,0, canvas.width, canvas.height);
    gl.clearColor(0.0,0.0,0.0,1.0);
    
    var program = initShaders(gl,"vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    ///draw object
    var objColor =[.5,.5,.5,1];
    
};//canvas main

function drawTriangle(x1,y1,x2,y2,x3,y3){
};//drawTriangle
function drawMidpoint(x1,y1,x2,y2){
};//drawMidpoint
function drawCenteroids(x1,y1,x2,y2,x3,y3){
};
function drawCircle(x1,y1,x2,y2){  
}//drawCircle
function drawLine(x1,y1,x2,y2){
    
};//drawLine
function drawPoint(x,y){};//drawPoint

function drawObject(gl, program, vertices, color, glType){
    var colorLocation = gl.getUniformLocation(program,"uColor");
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
    gl.drawArrays(glType, 0, vertices.length);
}//drawObject