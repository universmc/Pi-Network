
// Fonction pour créer un GIF à partir d'images stockées en base64 dans le localStorage
function createGIFfromBase64(imageKeys, outputFile) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Définir les dimensions du canvas (ajuster selon vos besoins)
    canvas.width = 610;
    canvas.height = 340;
  
    // Charger les images depuis le localStorage et les dessiner sur le canvas
    Promise.all(imageKeys.map(key => {
      const base64Image = localStorage.getItem(key);
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0); // Ajuster les coordonnées pour chaque image si nécessaire
          resolve();
        };
        img.src = base64Image;
      });
    }))
    .then(() => {
      // Créer le GIF (ici, on utilise une bibliothèque comme gif.js pour plus de fonctionnalités)
      const encoder = new GIFEncoder(canvas.width, canvas.height);
      encoder.createReadStream().pipe(fs.createWriteStream(outputFile));
      encoder.start();
      encoder.setFrameRate(10);
      encoder.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height));
      encoder.finish();
  
      console.log('GIF créé avec succès :', outputFile);
    });
  }
  
  // Exemple d'utilisation
  const imageKeys = ['image1', 'image2', 'image3']; // Les clés de vos images dans le localStorage
  const outputFile = 'mon_animation.gif';
  createGIFfromBase64(imageKeys, outputFile);