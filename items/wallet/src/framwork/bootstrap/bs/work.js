const { exec } = require('child_process');
const readline = require('readline');
const crypto = require('crypto');
const chalk = require('chalk'); // Pour coloriser la sortie

// Configuration personnalisable
const updateInterval = 100; // Intervalle de mise à jour en ms
const commandMap = {
  Tme: 'make Tme',
  call: 'make call',
  // ...
};

// Fonctions utilitaires
function generateRandomNumber() {
  // ... (même logique que dans ton code)
}

function drawUI() {
  // ... (même logique que dans ton code, mais avec l'utilisation de chalk pour la couleur)
}

function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    // ... (même logique que dans ton code)
  });
}

// Fonction principale
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Affichage initial
  drawUI();

  // Boucle principale
  while (true) {
    const command = await rl.question(chalk.green('Entrez votre commande: '));
    if (command === 'quit') break;

    executeCommand(commandMap[command] || command);
    drawUI();
  }

  rl.close();
}

// Démarrage du programme
main();