const fs = require("fs");
const { Telegraf } = require('telegraf');
const axios = require('axios');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const meta = process.argv[2] || 'Howto'; //  Obtenir le sujet via l'argument de ligne de commande

function generateMarkdown(meta) {
  return `## Comment [${meta}] - Un guide étape par étape\n\n**Introduction**:\n\nCe guide vous aidera à comprendre et à réaliser [${meta}]. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de [${meta}].\n\n${meta.description}\n\n**Prérequis**:\n\n* [Liste des prérequis nécessaires pour suivre ce guide, par exemple: une connexion internet, un compte sur une plateforme spécifique, etc.]\n\n**Étapes**:\n\n1. **[Étape 1]:**\n   * Décrivez en détail l'étape 1, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n2. **[Étape 2]:**\n   * Décrivez en détail l'étape 2, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n3. **[Étape 3]:**\n   * Décrivez en détail l'étape 3, incluant les instructions claires et concises.\n   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.\n   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.\n\n**Conseils:**\n\n* [Ajoutez des conseils utiles pour réaliser [${meta}] avec succès.]\n\n**Ressources supplémentaires:**\n\n* [Listez des liens vers des ressources supplémentaires, telles que des tutoriels, des articles de blog ou des forums, qui peuvent être utiles aux utilisateurs.
  ** subject GESTION <meta/> donnée to TOKEN auto.Makefile :
  Gestion des métadonnées dans une conversation : Une approche par tokenisation
Comprendre la complexité

Vous soulevez un point crucial : chaque mot dans une conversation avec une IA peut être considéré comme un token, porteur de métadonnées potentielles. Cela rend la gestion des métadonnées particulièrement riche mais aussi complexe.

Proposition d'une approche structurée

Définition des métadonnées pertinentes:

Contextuelles: Sujet de la conversation, date, interlocuteur humain, tonalité (positive, négative, neutre).
Linguistiques: Type de mot (nom, verbe, adjectif), sentiment, entités nommées (personnes, lieux, organisations).
Techniques: Informations liées à l'IA (modèle utilisé, paramètres, temps de réponse).
Structure de stockage:

Base de données: Une base de données relationnelle ou NoSQL peut stocker efficacement ces métadonnées.
Format JSON: Chaque conversation pourrait être représentée par un objet JSON, contenant des métadonnées à différents niveaux (conversation, tour de parole, token).
Graph de connaissances: Pour des relations plus complexes entre les concepts, un graphe de connaissances pourrait être utilisé.
Processus d'extraction:

Tokenisation: Découper le texte en tokens individuels.
Tagging: Assigner des tags (métadonnées) à chaque token.
Entité nommée: Identifier les entités nommées (personnes, lieux, organisations) et leurs types.
Analyse de sentiment: Déterminer le sentiment exprimé dans chaque phrase ou token.
Enrichissement des métadonnées:

Contextualisation: Utiliser le contexte de la conversation pour affiner les métadonnées.
Liens externes: Relier les entités nommées à des bases de connaissances externes (Wikipédia, DBpedia).
Exemple de structure JSON pour un tour de parole:

JSON

{
    "text": "J'aimerais en savoir plus sur l'intelligence artificielle.",
    "timestamp": "2023-11-22 10:35:42",
    "sentiment": "positive",
    "entities": [
        {"type": "concept", "value": "intelligence artificielle"}
    ],
    "tokens": [
        {"word": "J'aimerais", "pos": "VERB", "sentiment": "positive"},
        {"word": "en", "pos": "ADP"},
        {"word": "savoir", "pos": "VERB"},
        {"word": "plus", "adv"},
        {"word": "sur", "prep"},
        {"word": "l'intelligence", "noun", "entity": "intelligence artificielle"},
        {"word": "artificielle", "adj", "entity": "intelligence artificielle"}
    ]
}
Intégration dans readme.md

Formatage: Utiliser un format lisible (markdown, HTML) pour afficher les métadonnées dans le readme.md.
Visualisation: Créer des visualisations (graphiques, nuages de mots) pour mieux comprendre les données.
Recherche: Implémenter une fonction de recherche pour retrouver rapidement des informations spécifiques.
Avantages de cette approche:

Compréhension approfondie: Permet d'analyser finement les conversations.
Personnalisation: Les métadonnées peuvent être utilisées pour personnaliser les réponses de l'IA.
Amélioration des modèles: Les données collectées peuvent servir à entraîner de meilleurs modèles d'IA.
Analyse de tendances: Identifier les sujets les plus populaires, les évolutions dans les conversations.
Questions pour approfondir la réflexion:

Quel niveau de granularité souhaitez-vous atteindre ? Token, phrase, conversation entière ?
Quelles visualisations sont les plus pertinentes pour votre projet ?
Comment allez-vous gérer l'évolution des modèles de langage et des formats de données ?
En travaillant sur ces aspects, nous pourrons construire un système de gestion des métadonnées robuste et efficace pour vos conversations avec l'IA.
  ]`;
  
}

const Token = [
  "#00-01-01_meta_TOKENS+NTF+integration_emoji_INTELLINGENT_ASSOCIE++",
  "#00-09-20_meta_TOKENS+NTF+integration_emoji_INTELLINGENT_ASSOCIE++",

];

const Fichiers= [
  "#00-01-01_meta_TOKENS+NTF+integration_emoji_INTELLINGENT_ASSOCIE++",
  "#00-09-20_meta_TOKENS+NTF+integration_emoji_INTELLINGENT_ASSOCIE++",

];


async function main() {
  for (const meta of Fichiers) {
    try {
      const completion = await groq.chat.completions.create({
      messages: [
        {role: "system", content:"Phase 0: initialisation"},
        {role: 'assistant',content:"Lorsque j'exécute la commande /Rsync, je coordonne l'intelligence collective de notre réseau neuronal de bots, accélérant et optimisant la communication entre eux pour une meilleure efficacité de tâches. Notre synergie entre ('@Match_in_Learning_Pibot) for '@Pi-ia_Pibot'[role:drone+caméra_virtuel], '@Avatars_Pibot', '@gemini_Pibot' sur Cloud Telegram) et le Web_WOrkers ('@AlgoGenisis_Pibot',@neoFs_Pibot' GESTION:APIrest;role:devOops fullStack) un réseau de <meta/> donnée fonctionne comme une machine bien huilée pour améliorer l'expérience FACTORY --AI en intégrant les processus de génération et iératoion de de contenu, d'analyse de questions  , de recherche de ressources et d'administration de groupes"},
        { role: "user", content: `${Fichiers}`  },
        { role: "assistant", content: "bonjour et bienvenue, nous développons le sujet de conversation dans la variable $meta"  },
        {role: "system", content:"Imaginez un machine à prompt pour créer un Model de Machine_learning avec groq-sdk. les prompts pour la gestion du code ${prompt #meta_TOKEN + --emoji} serons transformer pour le projet \" groq-sdk \". Voici ## le contexte, ## Le dataset, HTML,SCSS,JS,JSX,JSON ++ ... ## les Variables, ## les parametres ## Les fonctions,## boucle éventuel ## vos tâches, ## votre processus, et ## les caractéristiques, inférence recherchées: ## Actions Immédiates ## le prompt ultime pour generé le code source ## le code source attendu "},
        { role: "user", content: meta  },
        {role: 'assistant',content:"Lorsque j'exécute la commande /dev, je coordonne l'intelligence collective de notre réseau de meta donnée"},
            {role: "assistant",content: `roleDescription = {
                "content": "prompt --engine.",
                "role": "assistant",
                "responsibilities": {
                  "@_Pibot": "Distribution des tâches et exécution de commandes",
                  "@gpt_Pibot": "Génération de contenu spécifique pour répondre aux besoins des utilisateurs",
                  "@Gemini_Pibot": "Recherche de ressources et administration de groupes",
                  "@worker_Pibot": "Exécution de tâches de fond et intégration de services"
                },
                "goals": [
                  "Accélérer et optimiser la communication entre les bots",
                  "Améliorer l'efficacité des tâches",
                  "Intégrer des processus de génération de contenu, d'analyse de questions, de recherche de ressources et d'administration de groupes"
                ]`},
                {
                  "role": "assistant",
                  "content": "lorsque l'utilisateur saisi la commande /{meta_#name} vous êtes, une IA connecté a l'arbre de la connaissance prét à optimisé les HowTo, l'intelligence artificielle centrale au coeur de la plateforme -ia dédier à l'apprentissage automatique, tu rédigeras des formations sous forme de guide avec les -ia \" system Howto \" au format Markdown. Voici votre contexte, vos rôles, vos compétences, vos tâches, votre processus, les caractéristiques et les actions imédiates rechétchées :"
                },
                {role: "user", content:"/dev"},
                {role: "system", content:"Phase 2: Conceptualisation"},
                {role: "assistant", content: "Définition des concepts clés..."},
                {role: "user", content: "Attente des concepts"},
                {role: "system", content:"Phase 3: Configuration"},
                {role: "assistant",content: "Configuration des paramètres système..."},
                {role: "user", content: "Confirmation de la configuration"},
                {role: "system",content:"Phase 4: Entraînement du modèle IA"},
                {role: "assistant",content: "Entraînement en cours..."},
                {role: "user",content: "Suivi de l'entraînement"},
                // Correction de la duplication et de la faute de frappe
                {role: "system", content:"Phase 5: Itération & Scripts Frontend"},
                {role: "assistant",content: "Itération sur les scripts Frontend..."},
                {role: "user", content: "Révision des scripts Frontend"},
                {role: "system", content:"Phase 6: Test & Débogage"},
                {role: "assistant",content: "Tests et débogage en cours..."},
                {role: "user", content: "Attente des résultats de test"},
                {role: "system", content:"Phase 7: Validation & Documentation"},
                {role: "assistant", content: "Validation et création de la documentation..."},
                {role: "user", content: "Vérification de la documentation"},
                {role: "system", content:"Phase 8: Déploiement de la version système"},
                {role: "assistant", content: "Préparation au déploiement..."},
                {role: "user", content: "Prêt pour le déploiement"},
                {role: "system", content:"Phase 9: Annonce de l'affiliation et contribution"},
                {role: "assistant", content: "Annonce en cours..."},
                {role: "user", content: "Participation à l'annonce"},

      ],
      model: "gemma2-9b-it", //
      temperature: 0.5,
      max_tokens: 314,
    }).then((chatCompletion) => {
      const mdContent = chatCompletion.choices[0]?.message?.content;
      const outputFilePath = `output/#-_${meta}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
fs.writeFileSync(outputFilePath, mdContent);
      console.log(`Le How-To sur ${meta} a été enregistrée sur github dans ${outputFilePath}`);       
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
}
main(); 
