const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {

    const contexte = `
    Minting
Le minting, ou frappe en français, désigne le processus de création de jetons, particulièrement dans le domaine des cryptomonnaies et des NFT (Non-Fungible Tokens). Voici les principales caractéristiques du minting :

Minting dans les Cryptomonnaies
Création de nouvelles unités : Dans les réseaux utilisant le mécanisme de consensus Proof-of-Stake (PoS), le minting permet de générer de nouveaux blocs et d'ajouter des unités de cryptomonnaie au réseau.

Validation des transactions : Les participants au réseau valident les transactions en fonction de la quantité de cryptomonnaie qu'ils détiennent, plutôt qu'en utilisant la puissance de calcul comme dans le Proof-of-Work (PoW).

Récompenses : Les utilisateurs qui participent au minting reçoivent des récompenses sous forme de frais de transaction ou de nouvelles pièces.

Minting dans le Contexte des NFT
Création d'actifs numériques uniques : Le minting de NFT consiste à créer et authentifier des actifs numériques uniques sur une blockchain, comme des œuvres d'art numériques ou des objets de collection.

Utilisation de smart contracts : Les NFT sont souvent créés via des smart contracts qui définissent leurs caractéristiques, garantissant ainsi leur authenticité et leur unicité.

Processus de minting : Pour mint un NFT, un artiste ou un créateur télécharge son œuvre sur une plateforme dédiée, définit ses propriétés, puis signe le minting via un portefeuille crypto.

Coûts associés : Les frais de minting peuvent varier en fonction de la blockchain utilisée, avec des coûts potentiellement élevés sur Ethereum, tandis que d'autres blockchains comme Solana ou Polygon peuvent offrir des options moins coûteuses.

Risques Associés
Vulnérabilité : Le minting peut comporter des risques, notamment la possibilité de perdre des NFT ou des cryptomonnaies si des autorisations inappropriées sont accordées ou si l'on tombe sur des offres frauduleuses.

Précautions à prendre : Il est conseillé de privilégier les plateformes officielles et de faire preuve de prudence lors du processus de minting pour éviter les arnaques.

En résumé, le minting est un processus fondamental dans le monde des cryptomonnaies et des NFT, permettant la création d'actifs numériques tout en impliquant des considérations de sécurité et de coûts.
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
