// Déclaration des variables ajustables

const UNITE_TEMPORELLE_DE_BASE = 1; // Valeur de base d'une unité temporelle
const FACTEUR_AJUSTEMENT_TEMPS = 1; // Facteur d'ajustement pour le temps passé
const FACTEUR_AJUSTEMENT_COMPETENCES = 1; // Facteur d'ajustement pour les compétences mobilisées
const FACTEUR_AJUSTEMENT_DIFFICULTE = 1; // Facteur d'ajustement pour la difficulté de la tâche

// Définition de la classe UTM (Unité Temporelle Monétisable)

class UTM {
  constructor(utilisateur, type, temps, competences, difficulte) {
    this.utilisateur = utilisateur; // Identifiant de l'utilisateur (humain ou IA)
    this.type = type; // Type de tâche ou d'activité
    this.temps = temps; // Temps passé en heures
    this.competences = competences; // Niveau de compétences mobilisées (échelle de 1 à 10)
    this.difficulte = difficulte; // Niveau de difficulté de la tâche (échelle de 1 à 10)
    this.valeur = this.calculerValeur(); // Valeur de l'UTM
  }

  calculerValeur() {
    // Calcul de la valeur de l'UTM en fonction des variables ajustables
    let valeur = UNITE_TEMPORELLE_DE_BASE;
    valeur *= this.temps * FACTEUR_AJUSTEMENT_TEMPS;
    valeur *= this.competences * FACTEUR_AJUSTEMENT_COMPETENCES;
    valeur *= this.difficulte * FACTEUR_AJUSTEMENT_DIFFICULTE;
    return valeur;
  }
}

// Exemple d'utilisation

const utilisateurHumain = "Jean Dupont";
const utilisateurIA = "Jarvis";

const utm1 = new UTM(utilisateurHumain, "Rédaction d'article", 2, 8, 6);
const utm2 = new UTM(utilisateurIA, "Analyse de données", 1, 9, 7);

console.log(utm1.valeur); // Affiche la valeur de l'UTM pour l'utilisateur humain
console.log(utm2.valeur); // Affiche la valeur de l'UTM pour l'utilisateur I