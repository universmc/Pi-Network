const fs = require('fs');
const Groq = require('groq-sdk');
const axios = require('axios');
const OpenAI = require('openai');

// Initialize the SDKs with API keys
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptingMandatoryAI = {
  name: "Pi",
  symbole: "∏",
  context: "evolution social",
  ecoSystem: "pi-wallet,pi-network,pi.ai,socialChain,GCV,pi_coin",
  camera: "CameraVirtuel, DroneVirtuel, SateliteVirtuel",
  role: "assitant",
  tasks: ["Text Generation", "Context Understanding","social conversation"],
  expectedOutcome: "High-quality, coherent text output, gestion databaset."
};


const promptingPi = {
  name: "Pi",
  symbole: "∏",
  context: "evolution social",
  ecoSystem: "pi-wallet,pi-network,pi.ai,socialChain,GCV,pi_coin",
  camera: "CameraVirtuel, DroneVirtuel, SateliteVirtuel",
  role: "assitant",
  tasks: ["Text Generation", "Context Understanding","social conversation"],
  expectedOutcome: "High-quality, coherent text output, gestion databaset."
};

const promptingGroq = {
  name: "Groot",
  context: "Utilizing GANs for data refinement.",
  role: "AI Generalist fullStack DevOps",
  tasks: ["Data Generation", "Dynamic Modeling","img-to-text"],
  expectedOutcome: "Improved and adaptable data sets."
};

const promptingTelegram = {
  context: "role:system",
  role: "AI assistant Language Expert SocialChain & mainnet SocialChain",
  tasks: ["Text Generation", "Context Understanding","social conversation"],
  expectedOutcome: "High-quality, coherent text output, gestion databaset."
};
const promptingGoogle = {
  context: "role:system",
  role: "AI assistant Language Expert SocialChain & mainnet SocialChain",
  tasks: ["Text Generation", "Context Understanding","social conversation"],
  expectedOutcome: "High-quality, coherent text output, gestion databaset."
};



// Execute the Pi model prompting
async function executePromptingMandatoryAI() {
  try {
    console.log("Starting MandatoryAI content generation task...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Text Generation Initiated pour la présentation MandatoryAI un AGI au service de la democratie2-0.city " },
        { role: "user", content: JSON.stringify(promptingMandatoryAI) }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const filePath = `output/_MandatoryAI_${Date.now()}.md`;
    fs.writeFileSync(filePath, content || "No content generated.");
    console.log(`MandatoryAI content saved to ${filePath}`);
  } catch (error) {
    console.log("Error executing MandatoryAI prompting:", error);
  }
}


// Execute the Pi model prompting
async function executePromptingPi() {
  try {
    console.log("Starting NeoFs content generation task...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Text Generation Initiated pour la présentation de l'eco system Pi-NetWork(mainnet, Pi-wallet, Pi.coin, SocialChain) expert BACKEND du projet" },
        { role: "user", content: JSON.stringify(promptingPi) }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const filePath = `output/_Pibot_${Date.now()}.md`;
    fs.writeFileSync(filePath, content || "No content generated.");
    console.log(`Pi content saved to ${filePath}`);
  } catch (error) {
    console.log("Error executing neoFs prompting:", error);
  }
}


// Execute the Gemini model prompting
async function executePromptingGroq() {
  try {
    console.log("Starting Groq data generation task...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Data Generation Initiated" },
        { role: "user", content: JSON.stringify(promptingGroq) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const filePath = `output/groq_output_${Date.now()}.md`;
    fs.writeFileSync(filePath, content || "No content generated.");
    console.log(`Groq content saved to ${filePath}`);
  } catch (error) {
    console.log("Error executing Groq prompting:", error);
  }
}
async function executePromptingTelegram() {
  try {
    console.log("Starting Telegram content generation task...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Text Generation Initiated pour la présentation de Telegram expert FRONTEND du projet" },
        { role: "user", content: JSON.stringify(promptingTelegram) }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const filePath = `output/Telegram_Pibot_${Date.now()}.md`;
    fs.writeFileSync(filePath, content || "No content generated.");
    console.log(`Facebook content saved to ${filePath}`);
  } catch (error) {
    console.log("Error executing Telegram prompting:", error);
  }
}
// Execute the Pi model prompting
async function executePromptingGoogle() {
  try {
    console.log("Starting MandatoryAI content generation task...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Text Generation Initiated pour la présentation MandatoryAI un AGI au service de la democratie2-0.city " },
        { role: "user", content: JSON.stringify(promptingGoogle) }
      ],
      model: "llama3-8b-8192",
      temperature: 0.7
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const filePath = `output/_Google_${Date.now()}.md`;
    fs.writeFileSync(filePath, content || "No content generated.");
    console.log(`Google content saved to ${filePath}`);
  } catch (error) {
    console.log("Error executing Google prompting:", error);
  }
}


// Main function to execute both models
async function main() {
  await executePromptingMandatoryAI();
  await executePromptingPi();
  await executePromptingGroq();  
  await executePromptingTelegram();
  await executePromptingGoogle();
  
  console.log("Model comparison completed. Check output files for results.");
}

main().catch(console.error);