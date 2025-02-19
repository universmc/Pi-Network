// Fonction pour générer une image personnalisée
function generateImage(params) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Exemple de génération d'une image avec du texte
    ctx.font = '30px Arial';
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.fillText(params.text, canvas.width / 2, canvas.height / 2);
  
    return canvas.toDataURL('image/png');
  }
  
  // Fonction pour créer un GIF à partir d'images générées
  function createGIFfromGeneratedImages(paramsArray, outputFile) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Définir les dimensions du canvas (ajuster selon vos besoins)
    canvas.width = 610;
    canvas.height = 340;
  
    const encoder = new GIFEncoder(canvas.width, canvas.height);
    encoder.createReadStream().pipe(fs.createWriteStream(outputFile));
    encoder.start();
    encoder.setFrameRate(10);
  
    Promise.all(paramsArray.map(params => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          encoder.addFrame(ctx.getImageData(0, 0, canvas.width, canvas.height));
          resolve();
        };
        img.src = generateImage(params);
      });
    }))
    .then(() => {
      encoder.finish();
      console.log('GIF créé avec succès :', outputFile);
    });
  }
  
  // Exemple d'utilisation
  const paramsArray = [
    { text: 'Image 1' },
    { text: 'Image 2', color: 'red' },
    { shape: 'circle', color: 'green' }, // Vous pouvez ajouter d'autres types de génération ici
  ];
  createGIFfromGeneratedImages(paramsArray, 'animation.gif');