const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Charger les images (à remplacer par ton code de chargement d'images)
const image1 = new Image();
image1.src = 'image1.png';
// ... et ainsi de suite pour les autres images

// Définir les dimensions du canvas
canvas.width = Math.max(image1.width, image2.width, image3.width);
canvas.height = image1.height + image2.height + image3.height;

// Dessiner les images sur le canvas
ctx.drawImage(image1, 0, 0);
ctx.drawImage(image2, 0, image1.height);
ctx.drawImage(image3, 0, image1.height + image2.height);

// Convertir le canvas en une URL de données
const dataURL = canvas.toDataURL('image/gif');

// Télécharger le fichier
const link = document.createElement('a');
link.download = 'animation.gif';
link.href = dataURL;
document.body.appendChild(link);
link.click();
link.remove();