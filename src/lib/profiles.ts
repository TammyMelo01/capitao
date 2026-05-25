export type StudentProfileSlug = "tammy" | "camila";

export const profileContent = {
  tammy: {
    name: "Tammy",
    title: "Concursos Policiais",
    description: "Polícia Civil do Ceará e PRF",
    defaultTopic: {
      subject: "Direito Penal",
      topic: "Teoria do Crime",
      concurso: "concurso policial",
      banca: "Cebraspe"
    }
  },
  camila: {
    name: "Camila",
    title: "Técnica de Enfermagem",
    description: "Estado do Ceará e Prefeitura de Fortaleza",
    defaultTopic: {
      subject: "Enfermagem",
      topic: "Administração de medicamentos técnico de enfermagem",
      concurso: "técnico de enfermagem Ceará Fortaleza concurso",
      banca: "concurso público"
    }
  }
} as const;
