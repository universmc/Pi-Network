const crypto = require('crypto');

// Fonction pour chiffrer un message
function chiffrerMessage(message, cle) {
  const cipher = crypto.createCipheriv('aes-256-cbc', cle, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Fonction pour déchiffrer un message
function dechiffrerMessage(messageChiffre, cle) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', cle, iv);
  let decrypted = decipher.update(messageChiffre, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Fonction pour générer un contenu aléatoire (exemple : un paragraphe)
function genererContenuAleatoire(nombreMots) {
  // ... (Implémentation à l'aide d'une API de génération de texte ou d'un dictionnaire)
  // ... (Exemple simplifié avec un tableau de mots aléatoires)
  const mots = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  let texte = '';
  for (let i = 0; i < nombreMots; i++) {
    texte += mots[Math.floor(Math.random() * mots.length)] + ' ';
  }
  return texte.trim();
}

// Exemple d'utilisation
const messageOriginal = "Ceci est un message secret.";
const cle = 'maCleSecrete'; // Remplacer par une clé plus robuste en production
const iv = crypto.randomBytes(16); // Vector d'initialisation

// Chiffrement
const messageChiffre = chiffrerMessage(messageOriginal, cle);
console.log('Message chiffré :', messageChiffre);

// Déchiffrement
const messageDechiffre = dechiffrerMessage(messageChiffre, cle);
console.log('Message déchiffré :', messageDechiffre);

// Génération de contenu aléatoire
const contenuAleatoire = genererContenuAleatoire(20);
console.log('Contenu aléatoire :', contenuAleatoire);