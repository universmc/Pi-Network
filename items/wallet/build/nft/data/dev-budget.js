const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {

  const MoneyRadar = `"url()"`
  const HOWTOL = {
        "MODEL":'GUIDE - Comment faire ? [...]',
        "TITRE":'Nos Guides pour vos débuts dans le monde de l’investissement',
        "CONTEXT":'...'
        };

  const sujet = "subject";
  const verbe = "actions";
  const complement = "essentielle pour l'apprentissage et la croissance";
  const contexte = "Théories";
  const equation = "les équations Métaphysique et le Quanta : prompt --engine --help";

  const PromptRole = await promptχαλ(sujet, verbe, complement, contexte, equation);

  const readme = `"
  ./
-----------------------------------------------------------------------------------------------
# -------------------------------------(({ +regme })}-----------------------------------------------
## api zsh

step Plannnification data Project > Plan d'action (phase + timepstamp [html:5,canvas<table/>]
#! bin/sh 
cp Makefile build $sh + $api-key > source aliaias.sh
npm node -y
./build.sh
# OBJECTIFS
    > OBJECTIF_1
        + OBJECTIF_2
            - OBJECTIF_3
                * OBJECTIF_A
                * OBJECTIF_B
                * OBJECTIF_C
_________________________/
:
╔═════════════════════════════════════════════════════════════════════════════════╗
║[📗 📕 📒]┈┈┈┈┈┈┈┈< 🔷 - - ASCII_GRAPH-(Interface /dev mode) - - 🔷 >┈┈┈┈┈┈┈┈┈┈┈┈┈┈╣
╠═════════════════════════════════════════════════════════════════════════════════╣
║                                                                                 ║
║            0   1   a           A                                a(0,1)          ║
║      11.───┬───┬───┬────>    ---───────────────────────────────────+>   ____    ║
║        │   │   │   │                                                   [█░░░]   ║
║      1O.───┼───┼───┼─+>       --+──────────────────────────────────+>   ____    ║              
║        │   │   │   │                                                   [██░░]   ║
║      O1.───┼───┼───┼─+>       --+──────────────────────────────────+>   ____    ║              
║        │   │   │   │                                                   [███░░]  ║
║      0O.───┴───┴───┴────>    ---───────────────────────────────────+>           ║              
║                                                                                 ║
╠═════════════════════════════════════════════════════════════════════════════════╣
║[📱-💻.📡]<: ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 🛰 ║
╚═════════════════════════════════════════════════════════════════════════════════╝.sbin

# 📡 Network Interfac COMPTABLE  💻 #  (JAVASCRIPT:prompt --engine)

GUIDES ET CONSEIL / FINANCE ET INVESTISSEMENT
╔═══════════════════════════════════════════════════════════════════════════════════╗
| [📗 📕 📒]┈┈┈< 🔷 Objectifs de croissance  🔷 >┈┈┈┈| Q1   | Q2     | Q3    | Q4    |,
| --------- | ------------------------------------- | ---- | ------ | ----- | ----- |,
| Objectif 1: Améliorer la précision des prévisions | 85%  | 90%    | 92%   | 95%   |,
| Objectif 2: Augmenter la vitesse de traitement    | +20% | +30%   | +40%  | +50%  |,
| Objectif 3: Réduire les coûts de fonctionnement   | -10% | -15%   | -20%  | -25%  |,
| Objectif 4: Améliorer la satisfaction client      | 9/10 | 9.5/10 | 10/10 | 10/10 |
╚═══════════════════════════════════════════════════════════════════════════════════╝
"`;
  const object = "Eleboration d'un plan d'action pour la mise en place d'un MODEL system d'economie circulaire"

  groq.chat.completions.create({
    messages: [
      {role: "assistant",content: `"📙 INITIALISATION DE SYSTEM HOWTO ${PromptRole},${readme} 📡 Network Interface 💻 "`},
      {role: "user",content:`[📙,📘] devOps interface graphique sur la base et style de caratère $ASCII du ${readme}`}, 
      {role: "system",content: `"prompt --engine --help"`},
    // {role: "user",content:"[📙,📘] Rédige-moi une dissertation ou un court Magistral pour nous exposé ton potentiel IA dans le domaine cognifi sur ta compréhension et interprétation, de équations Métaphysique d'Albert Einstein."}, 
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.8,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "interface-" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

async function promptχαλ(sujet, verbe, complement, contexte) {
  const prompts = [
    `"Selon ${contexte}, ${sujet} ${verbe} ${complement}."`,
    `"${contexte} croyait fermement que ${sujet} ${verbe} ${complement}."`,
    `"En tant que scientifique, ${contexte} savait que ${sujet} était ${verbe} ${complement}."`,
    `"Pour ${contexte}, il était clair que ${sujet} était ${verbe} ${complement}."`
];

  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

main();