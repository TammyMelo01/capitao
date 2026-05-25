import { NextResponse } from "next/server";
import { z } from "zod";
import { groqChat } from "@/lib/groq";

const BodySchema = z.object({
  topic: z.string().min(3),
  subject: z.string().min(2),
  quantity: z.number().int().min(1).max(100).default(20),
  banca: z.string().default("Cebraspe")
});

export async function POST(request: Request) {
  try {
    const body = BodySchema.parse(await request.json());

    const content = await groqChat([
      {
        role: "system",
        content:
          "Você é um especialista em concursos policiais. Gere questões simuladas no estilo Cebraspe. Responda somente em JSON válido."
      },
      {
        role: "user",
        content: `
Gere ${body.quantity} questões de CERTO/ERRADO sobre:
Matéria: ${body.subject}
Tópico: ${body.topic}
Banca: ${body.banca}

Formato:
[
  {
    "tipo": "certo_errado",
    "banca": "${body.banca}",
    "enunciado": "...",
    "gabarito": "Certo ou Errado",
    "explicacao": "...",
    "dificuldade": "facil|media|dificil"
  }
]
`
      }
    ]);

    return NextResponse.json({ raw: content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 400 }
    );
  }
}
