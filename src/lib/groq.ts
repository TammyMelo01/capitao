import { z } from "zod";

const GroqMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string()
});

type GroqMessage = z.infer<typeof GroqMessageSchema>;

export async function groqChat(messages: GroqMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada.");
  }

  const parsed = z.array(GroqMessageSchema).parse(messages);

  const prompt = parsed
    .map((message) => {
      return `${message.role}: ${message.content}`;
    })
    .join("\\n\\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2
        }
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(`Erro Gemini: ${response.status} ${text}`);
  }

  const data = await response.json();

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Erro ao gerar resposta."
  );
}
