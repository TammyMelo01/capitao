# Capitão — MVP técnico

Projeto base em Next.js + Supabase + Groq + YouTube Data API para organizar estudos de concursos policiais.

## O que este MVP entrega

- Dashboard de evolução
- Cadastro de concursos, matérias e tópicos
- Importação estruturada de edital
- Busca de vídeos no YouTube
- Geração de questões via Groq
- Leitor de PDF em voz usando Web Speech API
- Score de aprovação
- Base SQL Supabase com RLS

## Stack

- Next.js 15
- React
- TypeScript
- TailwindCSS
- Supabase
- PostgreSQL
- Groq API
- YouTube Data API
- Recharts

## Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase

Execute o arquivo:

```txt
supabase/schema.sql
```

no SQL Editor do Supabase.

## Variáveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GROQ_API_KEY=
YOUTUBE_API_KEY=
```


