// Charger Snap.svg
const Snap = require('snap.svg');

// Créer un SVG
const svg = Snap(600, 400);

// Ajouter des éléments SVG
const circle = svg.circle(150, 150, 50);
circle.attr({ fill: 'red' });

// Convertir le SVG en une image et l'ajouter au canvas
const svgData = svg.svg();
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0);
  // ... Créer le GIF ...
};
img.src = 'data:image/svg+xml;base64,' + btoa(svgData);