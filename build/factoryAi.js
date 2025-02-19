// factoryAi.js

// Définition des zones et de leur potentiel (exemple)
const zones = {
    "zone_collecte": {
      "nom": "Zone de collecte des matériaux",
      "potentiel": 100, // Potentiel maximal de la zone (ex: nombre d'objets recyclables potentiels)
      "temps_alloue": 0 // Temps alloué à la zone (en heures)
    },
    "zone_transformation": {
      "nom": "Zone de transformation",
      "potentiel": 50, // Potentiel de transformation (ex: nombre de produits finis potentiels)
      "temps_alloue": 0
    },
    "zone_vente": {
      "nom": "Zone de vente",
      "potentiel": 20, // Potentiel de vente (ex: nombre de produits vendus potentiels)
      "temps_alloue": 0
    }
  };
  
  // Fonction pour allouer du temps à une zone en fonction de son potentiel
  function allouerTemps(zone) {
    // Calcul du temps alloué (exemple : proportionnel au potentiel)
    const temps = zone.potentiel * 0.1; // Ajuster le facteur de proportionnalité selon vos besoins
    zone.temps_alloue = temps;
    console.log(`Temps alloué à la zone ${zone.nom} : ${temps} heures`);
  }
  
  // Fonction pour simuler l'activité de l'IA dans une zone
  function simulerActiviteIA(zone) {
    // Simulation de l'activité de l'IA (exemple : génération de données aléatoires)
    const activite = Math.random() * zone.potentiel; // Ajuster la plage de l'activité selon vos besoins
    console.log(`Activité de l'IA dans la zone ${zone.nom} : ${activite}`);
    return activite;
  }
  
  // Fonction principale
  function main() {
    // Allocation de temps aux zones
    for (const zone in zones) {
      allouerTemps(zones[zone]);
    }
  
    // Simulation de l'activité de l'IA et mise à jour du potentiel des zones
    for (const zone in zones) {
      const activite = simulerActiviteIA(zones[zone]);
      zones[zone].potentiel -= activite; // Mise à jour du potentiel en fonction de l'activité de l'IA
      if (zones[zone].potentiel < 0) {
        zones[zone].potentiel = 0; // Le potentiel ne peut pas être négatif
      }
      console.log(`Potentiel restant dans la zone ${zone.nom} : ${zones[zone].potentiel}`);
    }
  }
  
  // Appel de la fonction principale
  main();