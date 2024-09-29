// Wait for the page to load
window.onload = function() {
    // Get the canvas element
    const canvas = document.getElementById('glCanvas');
    // Initialize the GL context
    const gl = canvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Define the vertices of the triangle
    const vertices = new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.0,  0.5
    ]);

    // Create a buffer for the vertices
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Define the color of the triangle
    let color = [1.0, 0.0, 0.0]; // Initial color is red

    // Draw the triangle
    function drawTriangle() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // Add event listeners to the buttons
    document.getElementById('redButton').addEventListener('click', () => {
        color = [1.0, 0.0, 0.0]; // Red
        drawTriangle();
    });

    document.getElementById('greenButton').addEventListener('click', () => {
        color = [0.0, 1.0, 0.0]; // Green
        drawTriangle();
    });

    document.getElementById('blueButton').addEventListener('click', () => {
        color = [0.0, 0.0, 1.0]; // Blue
        drawTriangle();
    });

    // Initial draw
    drawTriangle();
}