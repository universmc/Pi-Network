// Importation des modules nécessaires
const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Génère une liste de thématiques via le rôle system.
 * @returns {Promise<string[]>} - Liste des thématiques générées.
 */

const conception = `buy_Back_You_Time TOP_24`;

const rOi = "Return On Investment"
const indice = "EBE [Cxcédent Brut d'Exploitation]"
const subject = `Makefile Top start-UP 2023 to TOP-2024 in ${rOi} fonction de ${indice} du CAC40 algorithme de calcul différentiel de pour les prédictions 2025 Fonction.TimeCOde+fusion+TimeStamps`

 
const nowJs = "timestamps du 2024-12-21(AAAA-MM-DD)";

const CA = "Chiffre Affaire : 10 euros"
const actions = "CTA : Call To Action"

async function generateColn() {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `Génération d'une liste de 25 **titres** pour le devellopemeent 10 Business Model pour un ${CA} de pour X ${actions} Travailler, avec les des Crypro Game GCV qui vont Exploser en 2025 pour la ${conception}+${subject} fonction de ${nowJs} Pibot de Dédié à l'évolution des intelligences artificielles, les technique d'apprentissagtechnique d'apprentissage automatique, le développement du concept de 'match. In. Learning.' HACKATHON Bootcamp, 2025, Geekerie, Piraterie avec humour, respect des droits de l'Homme, la sécurité dans questions d'éthique et <meta/> donnée privé` }
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_tokens: 56, // Limiter pour obtenir une liste concise
    });

    const Coln = completion.choices[0]?.message?.content.split("\n").filter(Boolean);
    console.log("✅ Thématiques générées :", Coln);
    return Coln;
  } catch (error) {
    console.error("❌ Erreur lors de la génération des thématiques :", error);
    return [];
  }
}

/**
 * Génère un Vector complet en fonction d'une thématique via le rôle assistant.
 * @param {string} table - La thématique pour laquelle générer l'Vector.
 * @returns {Promise<string>} - Contenu de l'Vector généré.
 */
async function generateVector(table) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: `Génération de l'Vector en fonction de liste titre TOP-2024 fonction du "${table}"afin de garantir les prédictions les plus justes et affable possible pour le top 20255.` }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 4096, // Autoriser un contenu riche et détaillé
    });

    const VectorContent = completion.choices[0]?.message?.content;
    console.log(`✅ Vector généré pour le thème "${table}" :`, VectorContent);
    return VectorContent;
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de l'Vector pour "${table}" :`, error);
    return `Erreur lors de la génération de l'Vector pour le thème "${table}".`;
  }
}

/**
 * Fonction principale pour orchestrer la génération des thématiques et des Vectors.
 */
async function main() {
  try {
    // Génération de la liste des thématiques
    const Coln = await generateColn();

    // Génération des Vectors pour chaque thématique
    for (const table of Coln) {
      const VectorContent = await generateVector(table);

      // Enregistrement de l'Vector dans un fichier Markdown
      const outputFilePath = `AB2_${table.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
      fs.writeFileSync(outputFilePath, VectorContent);

      console.log(`✅ Vector sauvegardé : ${outputFilePath}`);
    }
  } catch (error) {
    console.error("❌ Une erreur s'est produite lors de l'exécution du script :", error);
  }
}

main();
