
const fs = require("fs");
const { exec } = require("child_process");
const Groq = require("groq-sdk");
const groq = new Groq();
const { Environment } = require("@tensorflow/tfjs");

const subject = process.argv[2] || 'Auto_Prompting'; // Obtenir le sujet via l'argument de ligne de commande

const Camera = `{OBS}`;
const Subject = `{role}+{role}+{CVNU}+{SMART}`;
const STYLE = exec("npm run wait")
const Envirenement = require("./prompt-gen.js");
const Action = "auto Prompting"
const QUALITE = "prompt --engine"

const autoPrompting = `${Camera}+${Subject}+${Action}+${Environment}+${STYLE}+${QUALITE}`;


function generateMarkdown(subject) {
  return `## Comment [${subject}] - Un guide étape par étape

**Introduction**:

Ce guide vous aidera à comprendre et à réaliser [${subject} ${autoPrompting}]. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de [${autoPrompting}].

**Prérequis**:

* [Liste des prérequis nécessaires pour suivre ce guide, par exemple: une connexion internet, un compte sur une plateforme spécifique, etc.]

**Étapes**:

1. **[Étape 1]:**
   * Décrivez en détail l'étape 1, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

2. **[Étape 2]:**
   * Décrivez en détail l'étape 2, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

3. **[Étape 3]:**
   * Décrivez en détail l'étape 3, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

**Conseils:**

* [Ajoutez des conseils utiles pour réaliser [${subject}] avec succès.]

**Ressources supplémentaires:**

* [Listez des liens vers des ressources supplémentaires, telles que des tutoriels, des articles de blog ou des forums, qui peuvent être utiles aux utilisateurs.]`;
}

const subjects = [
  "News",
  "intélligence_artificielle",
  "Machine_learning",
  // Ajoutez autant de sujets que vous le souhaitez
];

async function main() {
  for (const subject of subjects) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: subject },
          { role: "system", content: `Un guide étape par étape sur chaque ${subjects} afin favoriser le développement des méthodes ${autoPrompting}` },
          {
            role: "assistant",
            content: generateMarkdown(subject), // Utilise la fonction pour générer le Markdown
          },
        ],
        model: "gemma2-9b-it",
        temperature: 0.5,
        max_tokens: 4096,
      }).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = `prompt/prompting_${subject}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log(`Le How-To sur ${subject} a été enregistré sur github dans ${outputFilePath}`);
      });
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
}

main();
