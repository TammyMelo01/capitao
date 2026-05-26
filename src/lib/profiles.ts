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

export type LibraryItem = {
  title: string;
  description: string;
  duration?: string;
  pages?: string;
};

export type QuestionItem = {
  id: string;
  statement: string;
  answer: "Certo" | "Errado";
  explanation: string;
  reinforcement: {
    correct: string;
    wrong: string;
  };
};

export type StudentProfile = {
  slug: StudentProfileSlug;
  name: string;
  title: string;
  description: string;
  defaultTopic: StudyTopic;
  monthlyPlan: MonthlyPlanItem[];
  videos: LibraryItem[];
  pdfs: LibraryItem[];
  questions: QuestionItem[];
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
    ["Português", "Interpretação de Texto para concursos"],
    ["SUS", "Princípios e diretrizes do Sistema Único de Saúde"],
    ["Saúde Pública", "Atenção básica e Estratégia Saúde da Família"],
    ["Enfermagem", "Ética e legislação profissional de enfermagem"],
    ["Enfermagem", "Administração de medicamentos"],
    ["Enfermagem", "Cálculo de medicação"],
    ["Enfermagem", "Sinais vitais e avaliação do paciente"],
    ["Enfermagem", "Controle de infecção e biossegurança"],
    ["Enfermagem", "Curativos e tratamento de feridas"],
    ["Enfermagem", "Saúde da mulher"],
    ["Enfermagem", "Saúde da criança e do adolescente"],
    ["Enfermagem", "Urgência e emergência"],
    ["Enfermagem", "Imunização e calendário vacinal"],
    ["Legislação", "Normas do SUS e legislação local"],
    ["Informática", "Noções básicas de informática"]
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
    monthlyPlan: tammyPlan,
    videos: [
      {
        title: "Direito Penal — Teoria do Crime",
        description: "Aula principal para concursos policiais",
        duration: "2h"
      },
      {
        title: "Processo Penal — Inquérito Policial",
        description: "Revisão com questões comentadas",
        duration: "1h"
      },
      {
        title: "Informática — Segurança da Informação",
        description: "Conteúdo recorrente em concursos policiais",
        duration: "1h"
      }
    ],
    pdfs: [
      {
        title: "Resumo de Direito Penal",
        description: "Teoria do crime, ilicitude e culpabilidade",
        pages: "42 páginas"
      },
      {
        title: "Legislação Penal Especial",
        description: "Leis especiais mais cobradas",
        pages: "88 páginas"
      },
      {
        title: "Português para Cebraspe",
        description: "Interpretação, gramática e reescrita",
        pages: "61 páginas"
      }
    ],
    questions: [
      {
        id: "tammy-q1",
        statement:
          "No conceito analítico de crime, fato típico, ilicitude e culpabilidade são elementos analisados de forma estruturada.",
        answer: "Certo",
        explanation:
          "O conceito analítico normalmente divide o crime em fato típico, ilicitude e culpabilidade.",
        reinforcement: {
          correct:
            "Muito bem. Você identificou corretamente a estrutura clássica do conceito analítico de crime.",
          wrong:
            "Atenção: essa afirmação está correta. Revise fato típico, ilicitude e culpabilidade."
        }
      },
      {
        id: "tammy-q2",
        statement:
          "A legítima defesa é causa de exclusão da culpabilidade.",
        answer: "Errado",
        explanation:
          "A legítima defesa exclui a ilicitude, não a culpabilidade.",
        reinforcement: {
          correct:
            "Correto. O ponto-chave é lembrar que legítima defesa exclui a ilicitude.",
          wrong:
            "Cuidado: legítima defesa não exclui culpabilidade. Ela exclui a ilicitude."
        }
      }
    ]
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
    monthlyPlan: camilaPlan,
    videos: [
      {
        title: "SUS — Princípios e Diretrizes",
        description: "Base para concursos de técnica de enfermagem",
        duration: "2h"
      },
      {
        title: "Administração de Medicamentos",
        description: "Cuidados, vias, segurança e cálculo",
        duration: "1h"
      },
      {
        title: "Biossegurança e Controle de Infecção",
        description: "EPI, precauções e prevenção de infecção",
        duration: "1h"
      }
    ],
    pdfs: [
      {
        title: "Resumo do SUS para Técnica de Enfermagem",
        description: "Princípios, diretrizes, organização e atenção básica",
        pages: "50 páginas"
      },
      {
        title: "Administração de Medicamentos",
        description: "Vias, cuidados, cálculo e segurança do paciente",
        pages: "38 páginas"
      },
      {
        title: "Biossegurança e Controle de Infecção",
        description: "EPI, higienização das mãos e precauções",
        pages: "44 páginas"
      }
    ],
    questions: [
      {
        id: "camila-q1",
        statement:
          "A higienização das mãos é uma das principais medidas para prevenção de infecções relacionadas à assistência à saúde.",
        answer: "Certo",
        explanation:
          "A higienização das mãos reduz a transmissão de microrganismos e é medida básica de biossegurança.",
        reinforcement: {
          correct:
            "Muito bem. Esse é um ponto central em biossegurança e controle de infecção.",
          wrong:
            "Atenção: higienização das mãos é uma das medidas mais importantes para prevenir infecções."
        }
      },
      {
        id: "camila-q2",
        statement:
          "Na administração de medicamentos, o técnico de enfermagem pode ignorar a identificação do paciente quando o leito estiver correto.",
        answer: "Errado",
        explanation:
          "A identificação correta do paciente é etapa obrigatória para segurança na administração de medicamentos.",
        reinforcement: {
          correct:
            "Correto. A identificação do paciente nunca deve ser ignorada.",
          wrong:
            "Cuidado: a segurança do paciente exige identificação correta antes da medicação."
        }
      },
      {
        id: "camila-q3",
        statement:
          "O SUS tem como princípios doutrinários a universalidade, integralidade e equidade.",
        answer: "Certo",
        explanation:
          "Universalidade, integralidade e equidade são princípios doutrinários do SUS.",
        reinforcement: {
          correct:
            "Boa. Esse trio é muito cobrado em concursos de saúde.",
          wrong:
            "Revise os princípios doutrinários do SUS: universalidade, integralidade e equidade."
        }
      }
    ]
  }
};

export function getProfileBySlug(value?: string | string[] | null) {
  const slug = Array.isArray(value) ? value[0] : value;

  if (slug === "camila") {
    return profiles.camila;
  }

  return profiles.tammy;
}

