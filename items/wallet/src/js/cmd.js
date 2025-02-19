const { exec } = require('child_process');
const readline = require('readline');

// Fonction pour afficher l'heure et le mode de développement
function afficherHeureEtMode() {
    const date = new Date();
    const heure = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`💻${heure} /dev mode`);
}

// Fonction pour afficher le titre
function titre() {
    console.log("                               ╔═══════════════════════════════════════════════════════════╗");
    console.log("                               ║               _                                           ║");
    console.log("                               ║   _   _ _ __ (_)_   _____ _ __ ___       _ __ ___   ___   ║");
    console.log("                               ║  | | | | '_ \\| \\ \\ / / _ \\ '__/ __|_____| '_ ' _'\\ / __|  ║");
    console.log("                               ║  | |_| | | | | |\\ V /  __/ |  \\__ \\_____| | | | | | (__   ║");
    console.log("                               ║   \\__,_|_| |_|_| \\_/ \\___|_|  |___/     |_| |_| |_|\\___|  ║");
    console.log("                               ║                                                           ║");
    console.log("                               ╚═══════════════════════════════════════════════════════════╝");
    console.log(""); 
}

// Fonction pour afficher le menu et lire les entrées utilisateur
function menu() {
    console.log("");
    console.log("   ╔════════════════════════════════════╗    ╔════════════════════════════════════════════════════════════════════════════════════╗");
    console.log("   ╠───────────{ ✨ _∏_ ✨ }────────────╣    ║ [📗 📕 📒]                    🔷 Weclom - ∏ - Pi-box 🔷                  [🔎] [💫] ║");
    console.log("   ║                                    ║    ╠────────────────────────────────────────────────────────────────────────────────────╣");
    console.log("   ║ ╔═══════════════════════════════╗  ║    ║                                                                                    ║");
    console.log("   ║                                    ║    ║                                                                                    ║");      
    console.log("   ║        [💠] : Electra              ║    ║                                                                                    ║");
    console.log("   ║        [  ] : Generative AI        ║    ║                                                                                    ║");
    console.log("   ║        [  ] : MyPrompt             ║    ║                                                                                    ║");
    console.log("   ║                                    ║    ║                                                                                    ║");
    console.log("   ║        [  ] : Card                 ║    ║                                                                                    ║");
    console.log("   ║        [  ] : CVun                 ║    ║                                                                                    ║");
    console.log("   ║        🔒   : Crédits              ║    ║                                                                                    ║");
    console.log("   ║        [  ] : Smart                ║    ║                                                                                    ║");
    console.log("   ║        [  ] : Map                  ║    ║                                                                                    ║");
    console.log("   ╠════════════════════════════════════╣    ╠════════════════════════════════════════════════════════════════════════════════════╣");
    console.log("   ║ [📱] [📷] [🎹] [🤖] [🗂️] [📊] [💰]  ║    ║ 📡 :<                                                                            🛰 ║");
    console.log("   ╚════════════════════════════════════╝    ╚════════════════════════════════════════════════════════════════════════════════════╝");
    console.log("");

    // Configuration de readline pour lire les entrées utilisateur
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Entrez votre choix : ", (commande) => {
        switch (commande) {
            case "Tme":
                execCommand("make Tme");
                break;
            case "call":
                execCommand("make call");
                break;
            case "map":
                execCommand("make map");
                break;
            case "update":
                execCommand("make update");
                break;
            case "1":
                execCommand("make commande1");
                break;
            case "2":
                execCommand("make commande2");
                break;
            case "3":
                execCommand("make commande3");
                break;
            case "chat":
                execCommand("make chat");
                break;
            case "5":
                execCommand("make commande5");
                break;
            case "6":
                execCommand("make commande6");
                break;
            case "7":
                execCommand("make commande7");
                break;
            case "8":
                execCommand("make commande8");
                break;
            case "9":
                execCommand("make commande9");
                break;
            case "10":
                execCommand("make commande10");
                break;
            case "a":
                execCommand("make commandeA");
                break;
            case "g":
                execCommand("make commandeg");
                break;
            case "r":
                console.clear();
                menu();
                break;
            default:
                console.log("Entrée invalide");
                rl.close();
                break;
        }
        rl.close();
    });
}

// Fonction pour exécuter des commandes shell
function execCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erreur: ${stderr}`);
            return;
        }
        console.log(`Résultat: ${stdout}`);
    });
}

// Appel des fonctions pour afficher le titre et le menu
afficherHeureEtMode();
titre();
menu();
