-- ─────────────────────────────────────────────────────────────────────────────
-- InstaSolutions — Schema Supabase
-- Execute este arquivo no SQL Editor do painel Supabase:
-- https://supabase.com/dashboard → seu projeto → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Tabela de vagas
create table if not exists vagas (
  id            text primary key,
  title_pt      text not null,
  title_en      text not null default '',
  location_pt   text not null default '',
  location_en   text not null default '',
  excerpt_pt    text not null default '',
  excerpt_en    text not null default '',
  body          jsonb not null default '[]'::jsonb,
  requirements  jsonb not null default '[]'::jsonb,
  image_src     text not null default '',
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- 2. Tabela de candidaturas
create table if not exists candidaturas (
  id            uuid primary key default gen_random_uuid(),
  vaga_id       text,
  vaga_titulo   text,
  nome_completo text not null,
  email         text not null,
  celular       text not null,
  estado        text,
  cidade        text,
  linkedin      text,
  portfolio_url text,
  mensagem      text not null,
  cv_path       text,
  idioma        text,
  created_at    timestamptz not null default now()
);

-- 3. RLS — vagas
alter table vagas enable row level security;

-- Qualquer pessoa pode ler vagas ativas (site público)
create policy "Leitura pública de vagas ativas"
  on vagas for select
  using (active = true);

-- Usuários autenticados (admin) podem fazer tudo
create policy "Admin gerencia vagas"
  on vagas for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4. RLS — candidaturas
alter table candidaturas enable row level security;

-- Qualquer pessoa pode inserir (formulário público)
create policy "Inserção pública de candidaturas"
  on candidaturas for insert
  with check (true);

-- Somente admin lê e deleta
create policy "Admin lê candidaturas"
  on candidaturas for select
  using (auth.role() = 'authenticated');

create policy "Admin deleta candidaturas"
  on candidaturas for delete
  using (auth.role() = 'authenticated');

-- 5. Storage bucket para currículos
insert into storage.buckets (id, name, public)
values ('curriculos', 'curriculos', false)
on conflict (id) do nothing;

-- Qualquer pessoa pode fazer upload (formulário público)
create policy "Upload público de currículos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'curriculos');

-- Somente admin pode baixar
create policy "Admin baixa currículos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'curriculos');
