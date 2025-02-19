function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shader:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  
  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
      return null;
    }
  
    return program;
  }
  
  const canvas = document.getElementById('myCanvas');
  const gl = canvas.getContext('webgl');
  
  // Définir les dimensions du canvas
  canvas.width = 610;
  canvas.height = 340;
  
  // ... (le reste de votre code, en utilisant les fonctions createShader et createProgram)
  
  // Dessiner le triangle
  gl.drawArrays(gl.TRIANGLES, 0, 3);