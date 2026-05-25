import { z } from "zod";

const GroqMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string()
});

type GroqMessage = z.infer<typeof GroqMessageSchema>;

export async function groqChat(messages: GroqMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY não configurada.");

  const parsed = z.array(GroqMessageSchema).parse(messages);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: parsed
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro Groq: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content as string;
}
