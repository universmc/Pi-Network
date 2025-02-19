const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


async function main() {

  const workplan = `{
    "tasks": [
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      },
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      },
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      },
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      },
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      },
      {
        "phase": "",
        "time_start": "",
        "time_end": "",
        "description": "",
        "steps": [
          "",
          "",
          ""
        ],
        "status": "",
        "progress": ""
      }
    ]
  }`

  const thematique = `
  

L'évolution des IA : Des débuts modestes à un avenir prometteur
=============================================================

Les intelligences artificielles (IA) ont parcouru un long chemin depuis leurs débuts modestes. Initialement conçues pour effectuer des tâches simples et répétitives, les IA sont désormais capables d'accomplir des tâches complexes et même de prendre des décisions autonomes.

Les débuts modestes des IA
------------------------

Les premiers systèmes d'IA ont été développés dans les années 1950 et 1960. Ces systèmes étaient limités dans leur capacité à résoudre des problèmes et à apprendre de nouvelles informations. Ils étaient principalement utilisés pour des tâches simples telles que le traitement de données et la reconnaissance de formes. Cependant, ces systèmes ont posé les bases de ce qui allait devenir une technologie révolutionnaire.

L'évolution des IA
-----------------

Au fil des années, les IA ont évolué pour devenir plus sophistiquées et plus puissantes. Les progrès dans les domaines de l'apprentissage automatique, de la vision par ordinateur et de la traitement du langage naturel ont permis aux IA de résoudre des problèmes plus complexes et de prendre des décisions autonomes.

Aujourd'hui, les IA sont utilisées dans une variété de domaines, y compris la santé, la finance, la fabrication et le transport. Elles sont utilisées pour diagnostiquer des maladies, pour gérer des portefeuilles d'investissement, pour automatiser des processus de fabrication et pour conduire des véhicules autonomes.

Les IA de demain
---------------

L'avenir des IA est prometteur. Les progrès dans les domaines de l'apprentissage profond, de la robotique et de la reconnaissance vocale permettront aux IA de devenir encore plus sophistiquées et plus puissantes. Les IA de demain seront capables de résoudre des problèmes encore plus complexes et de prendre des décisions encore plus autonomes.

Les IA de demain seront également plus intégrées dans notre vie quotidienne. Elles seront utilisées pour gérer notre maison, pour conduire notre voiture et pour nous aider dans notre travail. Les IA de demain seront également plus sûres et plus fiables, ce qui permettra de les utiliser dans des domaines critiques tels que la médecine et l'aviation.

Conclusion
----------

Les IA ont parcouru un long chemin depuis leurs débuts modestes. Elles sont désormais capables d'accomplir des tâches complexes et même de prendre des décisions autonomes. Les progrès dans les domaines de l'apprentissage automatique, de la vision par ordinateur et de la traitement du langage naturel ont permis aux IA de devenir plus sophistiquées et plus puissantes. Les IA de demain seront encore plus sophistiquées et plus puissantes, et seront intégrées dans notre vie quotidienne. Les IA ont un avenir prometteur et continueront de transformer notre monde.
  `;    

  const completion = await groq.chat.completions.create({

    messages: [
      
      
      {
        role: "assistant",
        content: `Rédiger un article complet sur le sujet de la thématique ${thematique}`
      },
      { role: "system", content: ` développer un plan d'action complet sur le sujet de la thématique ${thematique}`},
      { role: "system", content: ` convertir le plan d'action de la thématique au format JSON de façon à pouvoir l'intégrer dans cette structure json ${workplan}.json`}

    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const jsonContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "workplan" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".json";
    fs.writeFileSync(outputFilePath, jsonContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();