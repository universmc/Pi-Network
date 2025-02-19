const fs = require('fs');
const Groq = require('groq-sdk');

// Initialize the SDKs with API keys
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const promptingModel
 = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: "."
};
// Define the prompts and roles for each model
const promptingCVnu = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};

const promptingSmartContract = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};
const promptingRIB = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};
const promptingActivity = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};


// Function to execute and compare GROque and Gemini outputs
async function executeAndMatchAIModels() {



  const prompt = {
    groq: {
        description: 'Génération de texte cohérent et contextuel',
        promptGroq: {
            context: "Améliorer la génération de texte en utilisant EXO.",
            role: "système",
            taches: ["Génération de texte", "Compréhension contextuelle"],
            résultatAttendu: "Un texte de haute qualité et cohérent."
        }
    },
    gemini: {
        description: "Amélioration des données par le biais de GANs",
        promptGemini: {
            context: "Utilisation de GANs pour le raffinement des données  CTF emoji /mode Campagne.",
            role: "assistant",
            taches: ["Génération de données", "Modélisation dynamique"],
            résultatAttendu: "Des ensembles de données améliorés et adaptables."
        }
    }
  };

  const match = { MODEL: null, CVNU: null,SMART:null, RIB:null, ACTIVITY:null }; // Initialize match results

  try {
    // Execute Model content generation task
    console.log("Starting Model content generation task...");
    const ModelCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: JSON.stringify(prompt) },
        { role: "user", content: JSON.stringify(promptingModel) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const ModelContent = ModelCompletion.choices[0]?.message?.content;
    const ModelFilePath = `output/Model_output_${Date.now()}.md`;
    fs.writeFileSync(ModelFilePath, ModelContent || "No content generated.");
    console.log(`groq content saved to ${ModelFilePath}`);
    match.MODEL = ModelContent ? "Success" : "Failure";

    // Execute CVnu data generation task
    console.log("génération de la solution aux problèmes données...");
    const CVnuCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: JSON.stringify(prompt) },
        { role: "user", content: JSON.stringify(promptingCVnu) }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.6
    });

    const CVnuContent = CVnuCompletion.choices[0]?.message?.content;
    const CVnuFilePath = `output/CVnu_output_${Date.now()}.md`;
    fs.writeFileSync(CVnuFilePath, CVnuContent || "No content generated.");
    console.log(` les solutions aux problèmes données ont bien été généré dans le répertoire ${CVnuFilePath}`);
    match.CVNU = CVnuContent ? "Success" : "Failure";



  // Execute smartContract data generation task
        console.log("explication du problème donné et de la liste des tâches à mettre en place pour se connecter aux solutions.");
        const SmartContractCompletion = await groq.chat.completions.create({
          messages: [
            { role: "assistant", content: JSON.stringify(prompt) },
            { role: "user", content: JSON.stringify(promptingSmartContract) }
          ],
          model: "gemma2-9b-it",
          temperature: 0.6
        });
    
        const SmartContractContent = SmartContractCompletion.choices[0]?.message?.content;
        const SmartContractFilePath = `output/XSmartContract_output_${Date.now()}.md`;
        fs.writeFileSync(SmartContractFilePath,SmartContractContent || "No content generated.");
        console.log(`Documentation et définition du problème donné généré dans le répertoire donner ${SmartContractFilePath}`);
        match.SMART = SmartContractContent ? "Success" : "Failure";

        // Execute RIBcontent generation task
        console.log("Starting Model content generation task...");
        const RIBCompletion = await groq.chat.completions.create({
          messages: [
            { role: "assistant", content: JSON.stringify(prompt) },
            { role: "user", content: JSON.stringify(promptingRIB) }
          ],
          model: "llama3-8b-8192",
          temperature: 0.7
        });
    
        const RIBContent = RIBCompletion.choices[0]?.message?.content;
        const RIBFilePath = `output/RIB_output_${Date.now()}.md`;
        fs.writeFileSync(RIBFilePath, RIBContent || "No RIB content generated.");
        console.log(`RIB crypto content saved to ${RIBFilePath}`);
        match.RIB = RIBContent ? "Success" : "Failure";



        // Execute Activity content generation task
        console.log("Starting Model content generation task...");
        const ActivityCompletion = await groq.chat.completions.create({
          messages: [
            { role: "assistant", content: JSON.stringify(prompt) },
            { role: "user", content: JSON.stringify(promptingActivity) }
          ],
          model: "llama3-8b-8192",
          temperature: 0.7
        });
    
        const ActivityContent = ActivityCompletion.choices[0]?.message?.content;
        const ActivityFilePath = `output/Activity_output_${Date.now()}.md`;
        fs.writeFileSync(ActivityFilePath, ActivityContent || "No Activity generated.");
        console.log(`Activity content saved to ${ActivityFilePath}`);
        match.ACTIVITY = ActivityContent ? "Success" : "Failure";

  } catch (error) {
    console.error("Error during AI model execution:", error);
  }

  // Log the match results
  console.log("Match Results:");
  console.log(`Arbitre Goal :${match.MODEL}`);
  console.log(`dev op - Generation: ${match.CVNU}`);
  console.log(`Arbitre Goal :${match.SMART}`);
  console.log(`dev op - - 3 Model Generation: ${match.RIB}`);
  console.log(`dev op - - 3 Model Generation: ${match.ACTIVITY}`);

  return match;
}

// Main function to initiate the match and log results
async function main() {
  const matchResults = await executeAndMatchAIModels();
  console.log("Final Match Results:", matchResults);
}

main().catch(console.error);