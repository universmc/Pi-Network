const GIFEncoder = require('gifencoder');
const fs = require('fs');

// Paramètres personnalisables
const imageDirectory = './images/'; // Répertoire contenant les images PNG
const outputDirectory = './output/'; // Répertoire de sortie pour le GIF
const frameRate = 10; // Nombre d'images par seconde
const loopCount = 0; // Nombre de boucles (0 pour une boucle infinie)

// Fonction pour créer le GIF
function createGIF(images, outputFile) {
  const encoder = new GIFEncoder(width, height); // Remplace width et height par les dimensions de tes images
  encoder.createReadStream().pipe(fs.createWriteStream(outputFile));
  encoder.start();
  encoder.setRepeat(loopCount);
  encoder.setFrameRate(frameRate);

  images.forEach(image => {
    const bitmap = fs.readFileSync(image);
    encoder.addFrame(bitmap);
  });

  encoder.finish();
}

// Liste des images
const images = [
  'image1.png',
  'image2.png',
  // ...
];

// Nom du fichier de sortie
const outputFile = `animation_${Date.now()}.gif`;

// Création du GIF
createGIF(images, `${outputDirectory}${outputFile}`);