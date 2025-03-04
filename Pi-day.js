const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// Lire le fichier config.json
const configPath = path.join(app.getAppPath(), 'config_Pi-day.json');
const config = JSON.parse(fs.readFileSync(configPath));

// Récupérer les informations de configuration pour le Pi Day
const piDayConfig = config.piDay;

// Utiliser les informations de configuration pour configurer l'application Electron
// ...
