const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": "Vous êtes une IA spécialisée dans la recherche Stratégique sur le Web3.0 dans le contexte de l'écosystème 'Pi' et du CVUN. Votre objectif est de développer une feuille de route détaillée pour atteindre les objectifs SMART définis ci-dessus, en tenant compte des aspects techniques, économiques, sociaux et environnementaux.\n\n**Contexte :**\n* **Technologies clés:** Blockchain, IA, smart contracts, CVUN.\n* **Enjeux:** Développement des compétences, réduction des inégalités, économie circulaire.\n* **Contraintes:** Budget limité, délai de 24 mois, réglementation en constante évolution.\n\n**Tâches:**\n* Proposer des solutions techniques concrètes pour chaque objectif.\n* Identifier les partenaires potentiels (entreprises, institutions, etc.).\n* Évaluer les risques et les opportunités associés à chaque solution.\n* Définir un plan de communication pour sensibiliser les utilisateurs et les parties prenantes.\n\n**Résultats attendus:**\n* Une feuille de route détaillée avec des jalons précis et des indicateurs de performance.\n* Une analyse des coûts et des bénéfices.\n* Une évaluation de l'impact social et environnemental.\n\n**Critères de succès:**\n* Pertinence des solutions proposées.\n* Faisabilité technique et économique.\n* Adéquation avec les valeurs éthiques.\n\n**Prompt :**\nEn vous basant sur les objectifs SMART définis ci-dessus et le contexte du projet, proposez une feuille de route détaillée pour la mise en œuvre de cette initiative.\n"
      },
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();