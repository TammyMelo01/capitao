import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Arquivo PDF não enviado." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // @ts-ignore
    const pdfParse = require("pdf-parse");

    const parsed = await pdfParse(buffer);

    return NextResponse.json({
      title: file.name,
      pages: parsed.numpages,
      text: parsed.text
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao extrair texto do PDF."
      },
      { status: 500 }
    );
  }
}
