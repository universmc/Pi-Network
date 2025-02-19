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
const promptingPost = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};

const promptingRequest = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};



// Function to execute and compare GROque and Gemini outputs
async function executeAndMatchAIModels() {

  const match = { Model: null, POST: null,REQUEST:null }; // Initialize match results

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

    // Execute Post data generation task
    console.log("génération de la solution aux problèmes données...");
    const PostCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "`" },
        { role: "user", content: JSON.stringify(promptingPost) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6
    });

    const PostContent = PostCompletion.choices[0]?.message?.content;
    const PostFilePath = `output/Post_output_${Date.now()}.md`;
    fs.writeFileSync(PostFilePath, PostContent || "No content generated.");
    console.log(` les solutions aux problèmes données ont bien été généré dans le répertoire ${PostFilePath}`);
    match.POST = PostContent ? "Success" : "Failure";

  // Execute Pi data generation task
        console.log("explication du problème donné et de la liste des tâches à mettre en place pour se connecter aux solutions.");
        const RequestCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: "``" },
            { role: "user", content: JSON.stringify(promptingRequest) }
          ],
          model: "gemma2-9b-it",
          temperature: 0.6
        });
    
        const RequestContent = RequestCompletion.choices[0]?.message?.content;
        const RequestFilePath = `output/XRequest_output_${Date.now()}.md`;
        fs.writeFileSync(RequestFilePath,RequestContent || "No content generated.");
        console.log(`Documentation et définition du problème donné généré dans le répertoire donner ${RequestFilePath}`);
        match.REQUEST = RequestContent ? "Success" : "Failure";

  } catch (error) {
    console.error("Error during AI model execution:", error);
  }

  // Log the match results
  console.log("Match Results:");
  console.log(`Arbitre Goal :${match.Model}`);
  console.log(`dev op - Generation: ${match.POST}`);
  console.log(`dev op - - 3 Model Generation: ${match.REQUEST}`);

  return match;
}

// Main function to initiate the match and log results
async function main() {
  const matchResults = await executeAndMatchAIModels();
  console.log("Final Match Results:", matchResults);
}

main().catch(console.error);