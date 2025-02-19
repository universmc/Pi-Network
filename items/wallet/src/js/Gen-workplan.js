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

  const thematique ="Comment rédiger des titres accrocheurs pour vos articles de blog?";    

  const completion = await groq.chat.completions.create({

    messages: [
      
      
      {
        role: "assistant",
        content: `Rédiger un article complet sur le sujet de la thématique ${thematique}`
      },
      { role: "system", content: ` Développer un plan d'action complet sur le sujet de la thématique ${thematique}`},
      { role: "user", content: ` Convertir le plan d'action de la thématique au format JSON de façon à pouvoir l'intégrer dans cette structure json ${workplan}.json`}

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