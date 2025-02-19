const crypto = require('crypto');

// Function to generate a cryptographically secure random key (16 bytes for AES-256)
function generateKey() {
  return crypto.randomBytes(16);
}

// Function to chiffrer un message
function chiffrerMessage(message, key) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Function to déchiffrer un message
function dechiffrerMessage(messageChiffre, key) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(messageChiffre, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage
const messageOriginal = "Ceci est un message secret.";
const iv = crypto.randomBytes(16); // Initialization Vector

// Generate a secure key
const key = generateKey();

// Chiffrement
const messageChiffre = chiffrerMessage(messageOriginal, key);
console.log('Message chiffré :', messageChiffre);

// Déchiffrement
const messageDechiffre = dechiffrerMessage(messageChiffre, key);
console.log('Message déchiffré :', messageDechiffre);