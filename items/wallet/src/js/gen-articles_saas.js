// Importation des modules nécessaires
const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Génère une liste de thématiques via le rôle system.
 * @returns {Promise<string[]>} - Liste des thématiques générées.
 */

  const saas = `
  {
"title": "Gestionnaire de SAAS en Freelance",
"objective": "Gérer et optimiser l'utilisation de solutions en tant que prestataire indépendant pour les clients .",
« contraintes » : [
"Maîtriser plusieurs solutions logicielles et leur intégration entre elles",
"Assurer une communication claire et régulière avec les clients",
"Gérer son temps et ses projets de manière autonome"
],
"acteurs": [
{
"nom": "Client",
"role": "Demandeur de services de gestion de solutions SAAS"
},
{
"nom": "Prestataire",
"role": "Fournisseur de services de gestion de solutions SAAS"
}
],
"io": {
« entrées » : [
"Cahier des charges et besoins du client",
"Accès aux solutions logicielles utilisées"
],
« sorties » : [
"Configurations et optimisations des solutions SAAS pour les clients",
"Rapports de progrès et de performances"
]
},
« cas d'utilisation » : [
{
"name": "Intégration de plusieurs solutions logicielles",
"description": "Le gestionnaire de SAAS assure l'intégration de différentes applications pour optimiser les processus métiers du client"
},
{
"name": "Formation et support utilisateur",
"description": "Le gestionnaire de SAAS forme et accompagne les utilisateurs aux nouvelles solutions mises en place"
}
],
« règles commerciales » : [
"Établir un contrat de prestation de services clair avec le client",
"Respecter les délais et les coûts budgétaires pour chaque projet",
"Garantir la confidentialité des données et des informations sensibles du client"
],
« terminologie » : {
"SAAS": "Sigle anglais pour Software as a Service, ou Logiciel en tant que Service",
"Freelance": "Statut de travailleur indépendant, sans lien de subordination avec ses clients"
},
"notes": [
"Le gestionnaire de SAAS freelance doit être capable d'adapter ses connaissances à différents contextes et secteurs d'activité.",
"Un montage financier adéquat est nécessaire pour gérer les facturations, les charges sociales et les taxes applicables."
]
}
  `;
 const question = "comment augmenter en productivité grâce a des méthodes de DeeP Learning et l'automatisation de la génération de contenu ?"
async function generateThemes() {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `Génération d'une liste de 14 titres d'Article 💡 pour la gestion sur le devellepement du ${saas} Models, la liste de titre sera utlisé pour le developpement du theme de Article permetant de présentant les Méthodes Phare pour Gagner de l'Argent EN LIGNE Grâce à l'IA Pour Débutants Point Valeur minimum 100€ par jour+` }
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_tokens: 56, // Limiter pour obtenir une liste concise
    });

    const themes = completion.choices[0]?.message?.content.split("\n").filter(Boolean);
    console.log("✅ Thématiques générées :", themes);
    return themes;
  } catch (error) {
    console.error("❌ Erreur lors de la génération des thématiques :", error);
    return [];
  }
}

/**
 * Génère un article complet en fonction d'une thématique via le rôle assistant.
 * @param {string} theme - La thématique pour laquelle générer l'article.
 * @returns {Promise<string>} - Contenu de l'article généré.
 */
async function generateArticle(theme) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: `Génération de l'article en fonction des titres lier "${theme}" chaque article sera rédigé au format, intégrant des EMOJJ Intelligent et des conseils pour le développement des différents services, liés à l'intelligence artificielle dans l'article intrinsèquement lié à la ${question}.` }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 4096, // Autoriser un contenu riche et détaillé
    });

    const articleContent = completion.choices[0]?.message?.content;
    console.log(`✅ Article généré pour le thème "${theme}" :`, articleContent);
    return articleContent;
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de l'article pour "${theme}" :`, error);
    return `Erreur lors de la génération de l'article pour le thème "${theme}".`;
  }
}

/**
 * Fonction principale pour orchestrer la génération des thématiques et des articles.
 */
async function main() {
  try {
    // Génération de la liste des thématiques
    const themes = await generateThemes();

    // Génération des articles pour chaque thématique
    for (const theme of themes) {
      const articleContent = await generateArticle(theme);

      // Enregistrement de l'article dans un fichier Markdown
      const outputFilePath = `articles/${theme.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
      fs.writeFileSync(outputFilePath, articleContent);

      console.log(`✅ Article sauvegardé : ${outputFilePath}`);
    }
  } catch (error) {
    console.error("❌ Une erreur s'est produite lors de l'exécution du script :", error);
  }
}

main();
