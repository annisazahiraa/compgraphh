const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    console.error("WebGL tidak didukung pada browser ini.");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
        gl_Position = aVertexPosition;
    }
`;


let defaultColor = [1.0, 0.0, 0.0, 1.0]; 
let currentColor = [...defaultColor]; 

const fsSource = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
    }
`;

function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program:", gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
gl.useProgram(shaderProgram);


const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


const positions = [
    -0.5, -0.5, 
     0.5, -0.5, 
    -0.5,  0.5, 
     0.5,  0.5, 
];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
gl.enableVertexAttribArray(aVertexPosition);
gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);


const uColorLocation = gl.getUniformLocation(shaderProgram, "uColor");

function drawScene() {
    gl.viewport(0, 0, canvas.width, canvas.height); 
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4fv(uColorLocation, currentColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
}

function setColor(color) {
    if (color === 'red') {
        currentColor = [1.0, 0.0, 0.0, 1.0];
    } else if (color === 'green') {
        currentColor = [0.0, 1.0, 0.0, 1.0];
    } else if (color === 'blue') {
        currentColor = [0.0, 0.0, 1.0, 1.0];
    }
    drawScene();
}

function resetColor() {
    currentColor = [...defaultColor]; 
    drawScene();
}


gl.clearColor(0.0, 0.0, 0.0, 1.0);
drawScene();


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawScene();
});
