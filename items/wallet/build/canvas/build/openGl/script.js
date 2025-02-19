import vertexShaderSource from './proc.js';
import fragmentShaderSource from './fragment.js';
import createProgram from './createProgram.js'; 

// ... (le reste de votre code)


// Compiler les shaders et créer le programme
const program = createProgram(gl, vertexShader, fragmentShader); 
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);