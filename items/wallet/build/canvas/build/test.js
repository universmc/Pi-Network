const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('Impossible d\'obtenir le contexte WebGL.');
  return;
}

// Fonction pour compiler un shader
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Création des shaders
const vertexShaderSource = `
  attribute vec2 aPosition;
  attribute vec4 aColor;
  varying vec4 vColor;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColor = aColor;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

// Compiler les shaders
const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Créer le programme
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
  return;
}

// Utiliser le programme
gl.useProgram(program);

// Données des sommets (positions et couleurs)
const vertices = [
  -0.5, -0.5, 1.0, 0.0, 0.0, 1.0, // Sommet inférieur gauche (rouge)
  0.5, -0.5, 0.0, 1.0, 0.0, 1.0, // Sommet inférieur droit (vert)
  0.0,  0.5, 0.0, 0.0, 1.0, 1.0  // Sommet supérieur (bleu)
];

// Créer un buffer et envoyer les données
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Attribut position
const positionLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 6 * 4, 0); // 6 composantes par sommet (x, y, r, g, b, a)

// Attribut couleur
const colorLocation = gl.getAttribLocation(program, 'aColor');
gl.enableVertexAttribArray(colorLocation);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 6 * 4, 2 * 4); // Début des couleurs à l'offset 2

// Dessiner le triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);