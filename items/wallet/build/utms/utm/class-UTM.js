class UTM {
    constructor() {
      this.utilisateurs = {}; // Objet pour stocker les informations des utilisateurs (humains et IA)
      this.uniteTemporelle = 1; // Valeur par défaut d'une unité temporelle (peut être ajustée)
    }
  
    // Attribuer des UTM à un utilisateur
    attribuerUTM(idUtilisateur, typeTache, tempsPasse, competencesMobilisees) {
      if (!this.utilisateurs[idUtilisateur]) {
        this.utilisateurs[idUtilisateur] = {
          type: 'humain', // Type par défaut (peut être changé pour 'IA')
          utm: 0,
        };
      }
  
      let facteurCompetence = this.calculerFacteurCompetence(competencesMobilisees);
      let nombreUTM = tempsPasse * this.uniteTemporelle * facteurCompetence;
  
      this.utilisateurs[idUtilisateur].utm += nombreUTM;
  
      return nombreUTM;
    }
  
    // Calculer un facteur de compétence en fonction des compétences mobilisées
    calculerFacteurCompetence(competencesMobilisees) {
      // Logique pour déterminer le facteur de compétence en fonction des compétences
      // Ceci peut être basé sur une échelle de valeurs, des niveaux d'expertise, etc.
      // Exemple :
      let facteur = 1;
      if (competencesMobilisees.includes('analyse')) {
        facteur += 0.2;
      }
      if (competencesMobilisees.includes('créativité')) {
        facteur += 0.3;
      }
      // ... ajouter d'autres compétences et leurs facteurs
  
      return facteur;
    }
  
    // Définir le type d'utilisateur (humain ou IA)
    definirTypeUtilisateur(idUtilisateur, type) {
      if (this.utilisateurs[idUtilisateur]) {
        this.utilisateurs[idUtilisateur].type = type;
      }
    }
  
    // Obtenir le nombre d'UTM d'un utilisateur
    getUTM(idUtilisateur) {
      if (this.utilisateurs[idUtilisateur]) {
        return this.utilisateurs[idUtilisateur].utm;
      }
      return 0;
    }
  
    // Modifier la valeur d'une unité temporelle
    modifierUniteTemporelle(nouvelleValeur) {
      this.uniteTemporelle = nouvelleValeur;
    }
  
    // Impact potentiel pour une IA
    afficherImpactIA(idUtilisateur) {
      if (this.utilisateurs[idUtilisateur] && this.utilisateurs[idUtilisateur].type === 'IA') {
        let utm = this.utilisateurs[idUtilisateur].utm;
        console.log(`L'IA ${idUtilisateur} a accumulé ${utm} UTM.`);
  
        // Exemple d'impact :
        if (utm > 1000) {
          console.log("L'IA a atteint un niveau de performance élevé !");
        }
        // ... ajouter d'autres exemples d'impact
      }
    }
  }
  
  // Exemple d'utilisation
  const utm = new UTM();
  
  utm.attribuerUTM('humain1', 'conception', 10, ['créativité', 'analyse']);
  utm.attribuerUTM('ia1', 'analyse de données', 5, ['analyse', 'apprentissage automatique']);
  
  utm.afficherImpactIA('ia1');
  
  console.log(utm.getUTM('humain1'));
  console.log(utm.getUTM('ia1'));