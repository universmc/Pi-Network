const { createCanvas, loadImage } = require('canvas');

const canvas = createCanvas(610, 340); 
const ctx = canvas.getContext('2d'); 

function createGIF(imageUrls, outputFile) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Définir les dimensions du canvas (ajuster selon vos besoins)
  canvas.width = 610;
  canvas.height = 340;

  // Charger les images de manière asynchrone
  Promise.all(imageUrls.map(url => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Erreur lors du chargement de l\'image'));
      img.src = url;
    });
  }))
  .then(images => {
    // Dessiner les images sur le canvas
    images.forEach(img => {
      ctx.drawImage(img, 0, 0); // Ajuster les coordonnées si nécessaire
    });

    // Créer le GIF (ici, on utilise une bibliothèque comme gif.js pour plus de fonctionnalités)
    const encoder = new GIFEncoder(canvas.width, canvas.height);
    encoder.createReadStream().pipe(fs.createWriteStream(outputFile));
    encoder.start();
    encoder.setFrameRate(10);
    encoder.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height));
    encoder.finish();

    console.log('GIF créé avec succès :', outputFile);
  })
  .catch(error => {
    console.error('Erreur lors de la création du GIF:', error);
  });
}

// Exemple d'utilisation
const imageUrls = ['image1.png', 'image2.png', 'image3.png'];
createGIF(imageUrls, 'animation.gif');