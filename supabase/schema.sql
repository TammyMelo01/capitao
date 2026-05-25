create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists public.concursos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  banca text,
  cargo text,
  created_at timestamptz not null default now()
);

create table if not exists public.materias (
  id uuid primary key default gen_random_uuid(),
  concurso_id uuid not null references public.concursos(id) on delete cascade,
  nome text not null,
  peso numeric default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.topicos (
  id uuid primary key default gen_random_uuid(),
  materia_id uuid not null references public.materias(id) on delete cascade,
  nome text not null,
  prioridade int not null default 3,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create table if not exists public.editais (
  id uuid primary key default gen_random_uuid(),
  concurso_id uuid not null references public.concursos(id) on delete cascade,
  cargo text,
  banca text,
  orgao text,
  url_oficial text,
  arquivo_pdf_url text,
  data_publicacao date,
  versao text default '1',
  status text default 'ativo',
  texto_extraido text,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  topico_id uuid references public.topicos(id) on delete set null,
  youtube_id text unique not null,
  titulo text not null,
  canal text,
  descricao text,
  thumbnail text,
  duracao text,
  url text,
  qualidade numeric default 0,
  visualizacoes int,
  data_publicacao timestamptz,
  transcricao text,
  created_at timestamptz not null default now()
);

create table if not exists public.pdfs (
  id uuid primary key default gen_random_uuid(),
  topico_id uuid references public.topicos(id) on delete set null,
  titulo text not null,
  url text,
  origem text default 'manual',
  texto_extraido text,
  resumo text,
  audio_url text,
  confiabilidade numeric default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.questoes (
  id uuid primary key default gen_random_uuid(),
  topico_id uuid references public.topicos(id) on delete set null,
  tipo text not null default 'certo_errado',
  banca text default 'Cebraspe',
  pergunta text not null,
  resposta text not null,
  explicacao text,
  dificuldade text default 'media',
  fonte text default 'ia_simulada',
  created_at timestamptz not null default now()
);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  materia_id uuid references public.materias(id) on delete set null,
  topico_id uuid references public.topicos(id) on delete set null,
  inicio timestamptz not null,
  fim timestamptz,
  tempo_total int default 0,
  tipo_estudo text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  questao_id uuid not null references public.questoes(id) on delete cascade,
  resposta_usuario text not null,
  correto boolean not null,
  tempo_resposta int,
  created_at timestamptz not null default now()
);

create table if not exists public.performance_metrics (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  percentual_edital numeric default 0,
  media_acertos numeric default 0,
  score_aprovacao numeric default 0,
  nivel text default 'iniciante',
  consistencia numeric default 0,
  horas_totais numeric default 0,
  ultima_atualizacao timestamptz default now()
);

create table if not exists public.topic_mastery (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  topico_id uuid not null references public.topicos(id) on delete cascade,
  nivel_dominio numeric default 0,
  percentual_acerto numeric default 0,
  revisoes int default 0,
  ultima_revisao timestamptz,
  tendencia text default 'estavel',
  unique(usuario_id, topico_id)
);

create table if not exists public.simulated_exams (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  concurso_id uuid references public.concursos(id) on delete set null,
  percentual numeric default 0,
  total_questoes int default 0,
  acertos int default 0,
  erros int default 0,
  tempo_total int default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.audio_sessions (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null,
  pdf_id uuid references public.pdfs(id) on delete set null,
  topico_id uuid references public.topicos(id) on delete set null,
  titulo text not null,
  texto_base text,
  audio_url text,
  progresso_segundos int default 0,
  velocidade numeric default 1,
  concluido boolean default false,
  ultima_execucao timestamptz,
  created_at timestamptz not null default now()
);

alter table public.concursos enable row level security;
alter table public.materias enable row level security;
alter table public.topicos enable row level security;
alter table public.editais enable row level security;
alter table public.videos enable row level security;
alter table public.pdfs enable row level security;
alter table public.questoes enable row level security;
alter table public.study_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.performance_metrics enable row level security;
alter table public.topic_mastery enable row level security;
alter table public.simulated_exams enable row level security;
alter table public.audio_sessions enable row level security;

-- MVP: leitura liberada para conteúdo público.
create policy "public read concursos" on public.concursos for select using (true);
create policy "public read materias" on public.materias for select using (true);
create policy "public read topicos" on public.topicos for select using (true);
create policy "public read videos" on public.videos for select using (true);
create policy "public read pdfs" on public.pdfs for select using (true);
create policy "public read questoes" on public.questoes for select using (true);

-- Dados do aluno: restringir ao próprio usuário autenticado.
create policy "own study sessions" on public.study_sessions
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "own attempts" on public.question_attempts
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "own metrics" on public.performance_metrics
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "own mastery" on public.topic_mastery
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "own simulated exams" on public.simulated_exams
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

create policy "own audio sessions" on public.audio_sessions
  for all using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);
