const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {

  const userInput = process.argv[2] || '> make autoPrompt';

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": userInput
      },
      {
        "role": "assistant",
        "content": "lang:Fr,Français"
      }
    ],
    "model": "gemma2-9b-it",
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