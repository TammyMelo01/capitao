import { PdfSpeechReader } from "@/components/audio/PdfSpeechReader";

const sampleText = `
Direito Penal é uma das matérias centrais em concursos policiais.
O estudante deve dominar teoria do crime, crimes contra a administração pública,
crimes contra a pessoa, crimes contra o patrimônio e legislação penal especial.
`;

export default function StudyPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Modo estudo</h1>
      <PdfSpeechReader text={sampleText} />
    </main>
  );
}
