const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


async function main() {

  const réthorique = "La rhétorique est l'art de persuader ou de convaincre par la parole ou l'écriture. Elle se base sur l'utilisation de techniques de langage et de structure pour rendre un discours plus efficace et plus convaincant"


  const thematique =" rédiger un texte qui explique le fonctionnement La rhétorique avec d'un algorithme en utilisant des analogies ou des comparaisons pour rendre l'explication plus facile à comprendre.Ou encore, tu pourrais me demander de rédiger un discours qui utilise des techniques de persuasion pour convaincre un public d'adopter une idée ou un produit";    

  const completion = await groq.chat.completions.create({

    messages: [
      
      
      {
        role: "assistant",
        content: `Rédiger un article complet sur le sujet de la thématique ${réthorique}`
      },
      { role: "system", content: ` Développer un plan d'action complet sur le sujet de la thématique ${thematique}`},
      { role: "user", content: `Convertir le plan d'action de la thématique au format html avec un style intégré de façon à pouvoir présenté la responce dans page index.json`}

    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "index" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();