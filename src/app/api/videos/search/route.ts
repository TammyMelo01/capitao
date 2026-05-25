import { NextResponse } from "next/server";
import { z } from "zod";
import { searchYoutubeVideos } from "@/lib/youtube";

const BodySchema = z.object({
  subject: z.string().min(2),
  topic: z.string().min(3),
  concurso: z.string().default("concurso policial"),
  banca: z.string().default("Cebraspe")
});

export async function POST(request: Request) {
  try {
    const body = BodySchema.parse(await request.json());

    const query = `${body.subject} ${body.topic} ${body.concurso} ${body.banca} aula completa questões comentadas`;
    const videos = await searchYoutubeVideos({ query, maxResults: 10 });

    return NextResponse.json({ query, videos });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 400 }
    );
  }
}
