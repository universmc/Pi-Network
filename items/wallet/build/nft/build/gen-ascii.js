const figlet = require('figlet');
const fs = require('fs');

const phrase = "Google For Gemini";
const style = 'Doom';

// Séparer la phrase en mots
const mots = phrase.split(' ');

// Créer un nouveau fichier pour la phrase complète
fs.writeFileSync('phrase_complete.txt', '');

// Générer les images pour chaque mot et les ajouter au fichier principal
mots.forEach((mot, index) => {
  figlet.text(mot, { font: style }, (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }

    // Ajouter le mot au fichier principal
    fs.appendFileSync('phrase_complete.txt', data);

    // Ajouter un espace si ce n'est pas le dernier mot
    if (index < mots.length - 1) {
      fs.appendFileSync('phrase_complete.txt', ' ');
    }
  });
});