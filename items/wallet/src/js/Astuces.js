// Importation des modules nécessaires
const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Génère une liste de thématiques via le rôle system.
 * @returns {Promise<string[]>} - Liste des thématiques générées.
 */
async function generateThemes() {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Génération d'une liste de titres thématiques pour des articles de blog Dédié à l'évolution des IA avec Astuces pour créer des Vidéos IA PRO ! (Guide de Prompting)." }
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
        { role: "assistant", content: `Génération de l'article en fonction des titres lier "${theme}".` }
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
