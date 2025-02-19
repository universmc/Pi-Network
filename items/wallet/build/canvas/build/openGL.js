// Initialisation du canvas et du contexte WebGL
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

// Création des données de vertex
const vertices = [
  -0.5, -0.5,
   0.5, -0.5,
   0.0,  0.5
];

// Création du buffer et envoi des données
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Configuration des attributs
const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Coordonnées des couleurs (RGBA)
const colors = [
  1.0, 0.0, 0.0, 1.0, // Rouge
  0.0, 1.0, 0.0, 1.0, // Vert
  0.0, 0.0, 1.0, 1.0  // Bleu
];

// Création du buffer des couleurs
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// Configuration de l'attribut couleur
const colorAttributeLocation = gl.getAttribLocation(program, 'aColor');
gl.enableVertexAttribArray(colorAttributeLocation);
gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

// Dessiner le triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);