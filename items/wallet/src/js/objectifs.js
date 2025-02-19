const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {

  const objectifs = `{
    "formation": {
      "spécifique": "Développer et implémenter des formations en ligne qui améliorent les compétences numériques et professionnelles via une personnalisation avec l'IA et le CVUN.",
      "mesurable": "Suivre le nombre de participants et mesurer l’augmentation des compétences via des KPI sur le CVUN.",
      "atteignable": "Lancer les formations sur une plateforme accessible aux travailleurs de différents secteurs.",
      "réaliste": "Collaborer avec des partenaires éducatifs et professionnels pour développer un contenu pertinent.",
      "temporel": "Atteindre 10 000 participants dans les 12 premiers mois."
    },
    "assistance": {
      "spécifique": "Fournir une assistance personnalisée en gestion de carrière en utilisant l’IA pour analyser le CVUN et recommander des actions.",
      "mesurable": "Mesurer la satisfaction des utilisateurs à travers des enquêtes et évaluer leur progression professionnelle.",
      "atteignable": "Créer un chatbot basé sur l’IA pour offrir des conseils en temps réel.",
      "réaliste": "Déployer un assistant virtuel dans plusieurs langues pour une couverture internationale.",
      "temporel": "Obtenir un taux de satisfaction de 85 % dans les 18 mois."
    },
    "monétisation": {
      "spécifique": "Mettre en place un système de monétisation des compétences via une crypto-monnaie et des smart contracts, soutenant un modèle d’économie circulaire.",
      "mesurable": "Suivre la valeur monétaire échangée et la transparence des transactions.",
      "atteignable": "Collaborer avec des plateformes financières et des régulateurs pour assurer la sécurité des transactions.",
      "réaliste": "Lancer un programme pilote avec 1 000 utilisateurs pour tester la monétisation.",
      "temporel": "Mettre en place le système dans les 12 mois avec une phase de test de 6 mois."
    },
    "smart_contracts": {
      "spécifique": "Utiliser des smart contracts pour garantir la transparence et automatiser les transactions liées aux compétences et à la formation.",
      "mesurable": "Évaluer la confiance des utilisateurs dans le système à travers des audits et des feedbacks.",
      "atteignable": "Intégrer les smart contracts à une blockchain publique reconnue.",
      "réaliste": "Automatiser 80 % des transactions liées aux compétences et à la formation d’ici 18 mois.",
      "temporel": "Déployer le système de smart contracts en 9 mois avec des audits trimestriels."
    },
    "algorithmes_France_travail": {
      "spécifique": "Développer des algorithmes qui calculent une valeur équitable pour le travail effectué, réduisant ainsi les inégalités.",
      "mesurable": "Mesurer la réduction des inégalités professionnelles à travers les salaires et la distribution des tâches.",
      "atteignable": "Implémenter ces algorithmes dans plusieurs secteurs (agriculture, industrie, artisanat).",
      "réaliste": "Travailler avec des économistes et sociologues pour affiner les algorithmes et leur impact.",
      "temporel": "Déployer les algorithmes dans un secteur pilote dans les 12 mois et les étendre à d’autres secteurs d’ici 24 mois."
    }
  },`

  const chatCompletion = await groq.chat.completions.create({
    messages: [
              { role: 'system', content: `Présentation des ${objectifs}`},
              { role: 'user', content: "Bienvenue, je suis un algorithme d'auto-motivation, une IA spécialisée dans la recherche Stratégique sur le Web3.0 dans le contexte de l'eco System 'Pi' de la Mise en place Du concept du Crypto Game CVNU (STABLE PVT 1 value pi_coin = 1) Fondation du modèl économie circulaire, basé sur les smart contrat (umcTikens) et un modèle de curriculum vitae numérique universel Permettant le développement de l'intelligence, en tant que Assistant dans la formation Des utilisateurs du Web et la monétisations de leurs compétences, grâce à la valeur travail et la bloc chaîne CVUN /emoji Power"},
              { role: 'assistant', content: `Vous êtes une IA, une Machine à optimisé les Prompts ${objectifs}. Developpez le prompt Ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates}, ## le {resultat}{feedback} attentdu, et le {emoji asssocié}:`}
              ],
    
    model: 'gemma2-9b-it',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();