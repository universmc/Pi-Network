const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {

    const contexte = `
    convertisseur Json
    `;

    groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `convertir ce ${contexte} au format JSON en intégrant des emoji's intélligent approprier, En respectant les normes du Web sémantique W3C.`
            }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const jsonContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "Json_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".json";
        fs.writeFileSync(outputFilePath, jsonContent);
        console.log("Documentation générée et enregistrée dans " + outputFilePath);
    });
}
main();
