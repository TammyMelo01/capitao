export type StudentProfileSlug = "tammy" | "camila";

export type StudyTopic = {
  subject: string;
  topic: string;
  concurso: string;
  banca: string;
};

export type MonthlyPlanItem = {
  day: number;
  subject: string;
  topic: string;
};

export type StudentProfile = {
  slug: StudentProfileSlug;
  name: string;
  title: string;
  description: string;
  defaultTopic: StudyTopic;
  monthlyPlan: MonthlyPlanItem[];
};

const tammyPlan: MonthlyPlanItem[] = Array.from({ length: 30 }, (_, index) => {
  const topics = [
    ["Direito Penal", "Teoria do Crime"],
    ["Português", "Interpretação de Texto"],
    ["Processo Penal", "Inquérito Policial"],
    ["Informática", "Segurança da Informação"],
    ["Direito Constitucional", "Direitos e Garantias Fundamentais"],
    ["Direitos Humanos", "Tratados e Convenções"],
    ["Direito Administrativo", "Atos Administrativos"],
    ["Legislação Penal Especial", "Lei de Drogas"],
    ["Raciocínio Lógico", "Proposições e conectivos"],
    ["Atualidades", "Segurança pública e cidadania"]
  ];

  const [subject, topic] = topics[index % topics.length];

  return {
    day: index + 1,
    subject,
    topic
  };
});

const camilaPlan: MonthlyPlanItem[] = Array.from({ length: 30 }, (_, index) => {
  const topics = [
    ["Português", "Interpretação de Texto"],
    ["SUS", "Princípios e diretrizes do Sistema Único de Saúde"],
    ["Saúde Pública", "Atenção básica e Estratégia Saúde da Família"],
    ["Enfermagem", "Ética e legislação profissional de enfermagem"],
    ["Enfermagem", "Administração de medicamentos"],
    ["Enfermagem", "Sinais vitais e avaliação do paciente"],
    ["Enfermagem", "Controle de infecção e biossegurança"],
    ["Enfermagem", "Curativos e tratamento de feridas"],
    ["Enfermagem", "Saúde da mulher"],
    ["Enfermagem", "Saúde da criança e do adolescente"],
    ["Enfermagem", "Urgência e emergência"],
    ["Enfermagem", "Imunização e calendário vacinal"],
    ["Legislação", "Normas do SUS e legislação municipal/estadual"],
    ["Informática", "Noções básicas de informática"],
    ["Matemática", "Porcentagem e raciocínio lógico"]
  ];

  const [subject, topic] = topics[index % topics.length];

  return {
    day: index + 1,
    subject,
    topic
  };
});

export const profiles: Record<StudentProfileSlug, StudentProfile> = {
  tammy: {
    slug: "tammy",
    name: "Tammy",
    title: "Concursos Policiais",
    description: "Polícia Civil do Ceará e PRF",
    defaultTopic: {
      subject: "Direito Penal",
      topic: "Teoria do Crime",
      concurso: "concurso policial polícia civil PRF",
      banca: "Cebraspe"
    },
    monthlyPlan: tammyPlan
  },
  camila: {
    slug: "camila",
    name: "Camila",
    title: "Técnica de Enfermagem",
    description: "Estado do Ceará e Prefeitura de Fortaleza",
    defaultTopic: {
      subject: "Enfermagem",
      topic: "Administração de medicamentos técnico de enfermagem",
      concurso: "concurso técnico de enfermagem Ceará Fortaleza",
      banca: "concurso público"
    },
    monthlyPlan: camilaPlan
  }
};

export function getProfileBySlug(value?: string | string[] | null) {
  const slug = Array.isArray(value) ? value[0] : value;

  if (slug === "camila") {
    return profiles.camila;
  }

  return profiles.tammy;
}
