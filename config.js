const fs = require('fs');
const path = require('path');

// Lire la configuration pour le port 31400
const config = 
{
    "piDay": {
    "theme": "PiDay",
    "startDate": "2025-03-14",
    "endDate": "2025-03-15",
    "countdown": true,
    "showConfetti": true,
    "showFireworks": true,
    "showSpecialFeatures": true
    },
    "communication": {
    "port": 31400,
    "ip": "127.0.0.1"
    },
    "social": {
    "twitter": {
    "hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
    },
    "instagram": {
    "hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
    },
"Google": {
"hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
},
"youtube": {
"hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
},
"Telegram": {
"hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
},
"linkedin": {
"hashtags": ["PiDay", "PiNetwork", "CelebratePi"]
}
    }
    }

// Récupérer les informations de configuration pour le port 31400
const port = "31400"
const ip = "127.0.0.1";

// Utiliser les informations de configuration pour configurer la communication
// ...
console.log("Pi NetWork",ip,":",port)
