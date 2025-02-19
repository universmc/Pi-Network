import vertexShaderSource from './utlis/Utils.js';
import fragmentShaderSource from './shadder/fragmentShader.js';
import createProgram from './utlis/createProgram.js'; 

// ... (le reste de votre code)


// Compiler les shaders et créer le programme
const program = createProgram(gl, vertexShader, fragmentShader); 
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);