import { NextResponse } from "next/server";
import { z } from "zod";
import { groqChat } from "@/lib/groq";

const BodySchema = z.object({
  profileName: z.string().default("Aluno"),
  profileTitle: z.string().default("Concurso"),
  subject: z.string().min(2),
  topic: z.string().min(3),
  quantity: z.number().int().min(1).max(100).default(100),
  banca: z.string().default("concurso público")
});

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = BodySchema.parse(await request.json());

    const content = await groqChat([
      {
        role: "system",
        content:
          "Você é um professor especialista em concursos públicos. Gere questões simuladas, inéditas, objetivas e didáticas. Responda somente em JSON válido, sem markdown."
      },
      {
        role: "user",
        content: `
Gere exatamente ${body.quantity} questões diferentes de CERTO/ERRADO.

Perfil do aluno: ${body.profileName}
Área/concurso: ${body.profileTitle}
Matéria: ${body.subject}
Assunto do dia: ${body.topic}
Banca/estilo: ${body.banca}

Regras:
- Todas as questões devem ser diferentes.
- Foco total no assunto do dia.
- Linguagem de concurso público.
- Não diga que são questões oficiais.
- Cada questão precisa ter gabarito e explicação curta.
- Misture itens Certo e Errado.
- Evite repetição de enunciado.
- Gere comentários de reforço para acerto e erro.

Retorne somente este JSON:

[
  {
    "id": "q1",
    "statement": "Enunciado da questão...",
    "answer": "Certo",
    "explanation": "Comentário técnico curto.",
    "reinforcement": {
      "correct": "Comentário breve para quando o aluno acertar.",
      "wrong": "Comentário breve para quando o aluno errar."
    }
  }
]
`
      }
    ]);

    const parsed = safeJsonParse(content);

    if (!Array.isArray(parsed)) {
      return NextResponse.json(
        {
          error: "A IA não retornou JSON válido.",
          raw: content
        },
        { status: 502 }
      );
    }

    const questions = parsed
      .slice(0, body.quantity)
      .map((item, index) => ({
        id: String(item.id ?? `q${index + 1}`),
        statement: String(item.statement ?? item.enunciado ?? ""),
        answer:
          item.answer === "Errado" || item.gabarito === "Errado"
            ? "Errado"
            : "Certo",
        explanation: String(
          item.explanation ?? item.explicacao ?? "Revise o conteúdo do dia."
        ),
        reinforcement: {
          correct: String(
            item.reinforcement?.correct ??
              item.reforco?.acerto ??
              "Muito bem. Você aplicou corretamente o conteúdo."
          ),
          wrong: String(
            item.reinforcement?.wrong ??
              item.reforco?.erro ??
              "Revise esse ponto e tente associar o conceito ao enunciado."
          )
        }
      }))
      .filter((item) => item.statement.length > 10);

    return NextResponse.json({
      questions,
      total: questions.length,
      subject: body.subject,
      topic: body.topic,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 400 }
    );
  }
}
