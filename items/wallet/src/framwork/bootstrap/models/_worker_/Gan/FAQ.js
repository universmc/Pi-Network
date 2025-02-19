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
const promptingQuestion = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};

const promptingResponse = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};



// Function to execute and compare GROque and Gemini outputs
async function executeAndMatchAIModels() {

  const match = { Model: null, QUESTION: null,REPONSE:null }; // Initialize match results

  try {
    // Execute GROQ content generation task
    console.log("Starting Model content generation task...");
    const ModelCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `` },
        { role: "user", content: JSON.stringify(promptingModel) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const ModelContent = ModelCompletion.choices[0]?.message?.content;
    const ModelFilePath = `output/Model_output_${Date.now()}.md`;
    fs.writeFileSync(ModelFilePath, ModelContent || "No content generated.");
    console.log(`groq content saved to ${ModelFilePath}`);
    match.Model = ModelContent ? "Success" : "Failure";

    // Execute Question data generation task
    console.log("génération de la solution aux problèmes données...");
    const QuestionCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "`" },
        { role: "user", content: JSON.stringify(promptingQuestion) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6
    });

    const QuestionContent = QuestionCompletion.choices[0]?.message?.content;
    const QuestionFilePath = `output/Question_output_${Date.now()}.md`;
    fs.writeFileSync(QuestionFilePath, QuestionContent || "No content generated.");
    console.log(` les solutions aux problèmes données ont bien été généré dans le répertoire ${QuestionFilePath}`);
    match.QUESTION = QuestionContent ? "Success" : "Failure";

  // Execute Pi data generation task
        console.log("explication du problème donné et de la liste des tâches à mettre en place pour se connecter aux solutions.");
        const ResponseCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: "``" },
            { role: "user", content: JSON.stringify(promptingResponse) }
          ],
          model: "gemma2-9b-it",
          temperature: 0.6
        });
    
        const ResponseContent = ResponseCompletion.choices[0]?.message?.content;
        const ResponseFilePath = `output/XResponse_output_${Date.now()}.md`;
        fs.writeFileSync(ResponseFilePath,ResponseContent || "No content generated.");
        console.log(`Documentation et définition du problème donné généré dans le répertoire donner ${ResponseFilePath}`);
        match.REPONSE = ResponseContent ? "Success" : "Failure";

  } catch (error) {
    console.error("Error during AI model execution:", error);
  }

  // Log the match results
  console.log("Match Results:");
  console.log(`Arbitre Goal :${match.Model}`);
  console.log(`dev op - Generation: ${match.QUESTION}`);
  console.log(`dev op - - 3 Model Generation: ${match.REPONSE}`);

  return match;
}

// Main function to initiate the match and log results
async function main() {
  const matchResults = await executeAndMatchAIModels();
  console.log("Final Match Results:", matchResults);
}

main().catch(console.error);