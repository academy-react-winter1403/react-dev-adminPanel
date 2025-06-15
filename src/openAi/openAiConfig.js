import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://ai.liara.ir/api/v1/684e1c4ea1f75b3278c092e5",
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODRlMTk5NTJiNDhlNDYzMTY4Zjk5ZmMiLCJ0eXBlIjoiYXV0aCIsImlhdCI6MTc0OTk1MDM5MH0.moTt-bdr1_k2gWEMPr80xRtiKBQU-5iahVRnqcJoQto",
});

async function chatAi(text) {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message;
}

export default chatAi;
// main();
