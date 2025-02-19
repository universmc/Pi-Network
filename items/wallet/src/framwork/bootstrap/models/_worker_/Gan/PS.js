const fs = require('fs');
const Groq = require('groq-sdk');

// Initialize the SDKs with API keys
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const promptingGroq
 = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: "."
};
// Define the prompts and roles for each model
const promptingSolution = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};

const promptingProbleme = {
  context: "",
  role: "",
  tasks: [""],
  expectedOutcome: ""
};



// Function to execute and compare GROque and Gemini outputs
async function executeAndMatchAIModels() {

  const match = { Groq: null, SOLUTION: null,PROBLEME:null }; // Initialize match results

  try {
    // Execute GROQ content generation task
    console.log("Starting Groq content generation task...");
    const GroqCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `` },
        { role: "user", content: JSON.stringify(promptingGroq) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const GroqContent = GroqCompletion.choices[0]?.message?.content;
    const GroqFilePath = `output/Groq_output_${Date.now()}.md`;
    fs.writeFileSync(GroqFilePath, GroqContent || "No content generated.");
    console.log(`groq content saved to ${GroqFilePath}`);
    match.Groq = GroqContent ? "Success" : "Failure";

    // Execute Solution data generation task
    console.log("génération de la solution aux problèmes données...");
    const SolutionCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "`" },
        { role: "user", content: JSON.stringify(promptingSolution) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6
    });

    const SolutionContent = SolutionCompletion.choices[0]?.message?.content;
    const SolutionFilePath = `output/Solution_output_${Date.now()}.md`;
    fs.writeFileSync(SolutionFilePath, SolutionContent || "No content generated.");
    console.log(` les solutions aux problèmes données ont bien été généré dans le répertoire ${SolutionFilePath}`);
    match.SOLUTION = SolutionContent ? "Success" : "Failure";

  // Execute Pi data generation task
        console.log("explication du problème donné et de la liste des tâches à mettre en place pour se connecter aux solutions.");
        const ProblemeCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: "``" },
            { role: "user", content: JSON.stringify(promptingProbleme) }
          ],
          model: "gemma2-9b-it",
          temperature: 0.6
        });
    
        const ProblemeContent = ProblemeCompletion.choices[0]?.message?.content;
        const ProblemeFilePath = `output/XProbleme_output_${Date.now()}.md`;
        fs.writeFileSync(ProblemeFilePath,ProblemeContent || "No content generated.");
        console.log(`Documentation et définition du problème donné généré dans le répertoire donner ${ProblemeFilePath}`);
        match.PROBLEME = ProblemeContent ? "Success" : "Failure";

  } catch (error) {
    console.error("Error during AI model execution:", error);
  }

  // Log the match results
  console.log("Match Results:");
  console.log(`Arbitre Goal :${match.GROQ}`);
  console.log(`dev op - Generation: ${match.SOLUTION}`);
  console.log(`dev op - - 3 Groq Generation: ${match.PROBLEME}`);

  return match;
}

// Main function to initiate the match and log results
async function main() {
  const matchResults = await executeAndMatchAIModels();
  console.log("Final Match Results:", matchResults);
}

main().catch(console.error);