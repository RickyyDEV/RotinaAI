  # RotinaAI — Plano Completo do Site (Rotas, Features, Schema e Lógica)

Data: 28 de janeiro de 2026

Este documento descreve o plano completo do RotinaAI: mapa de rotas (incluindo subrotas), responsabilidades de cada tela/feature, APIs internas/Server Actions e as tabelas necessárias no schema Prisma.

> Objetivo do produto: transformar texto livre em agenda inteligente, tarefas priorizadas e um plano diário automatizado, com UI premium e feedback claro.

---

## 1) Estado atual do projeto (o que já existe)

### Rotas e grupos (App Router)

- Público:
  - `/` (landing) — `app/page.tsx`
  - Layout global — `app/layout.tsx`

- Auth (`app/(auth)`):
  - `/auth/login` — `app/(auth)/auth/login/page.tsx` (client)
  - `/auth/register` — `app/(auth)/auth/register/page.tsx` (client)
  - Guard de auth — `app/(auth)/auth/layout.tsx` redireciona para `/dashboard` se já estiver logado
  - BetterAuth server — `app/(auth)/auth.ts`
  - BetterAuth client — `app/(auth)/auth/client.tsx`

- Dashboard (`app/(dashboard)`):
  - `/dashboard` — `app/(dashboard)/dashboard/page.tsx`
  - Layout com proteção por sessão — `app/(dashboard)/dashboard/layout.tsx`

- API (`app/(api)`):
  - `/api/auth/*` — `app/(api)/api/auth/[...all]/route.ts` (BetterAuth handler)

- Termos:
  - `/terms` — `app/(terms)/terms`
  - `/privacy` — `app/(terms)/privacy`

### Banco (Prisma)

- Prisma schema atual: `app/(database)/schema/schema.prisma`
- Contém entidades de autenticação (User/Session/Account/Verification/TwoFactor) mapeadas para Postgres.

---

## 2) Sitemap proposto (rotas + subrotas + responsabilidades)

Abaixo está o plano completo de rotas. Onde fizer sentido, a implementação pode ser feita por:

- **Server Components** para carregamento seguro e rápido (dados de sessão, queries, SSR)
- **Client Components** para interações (drag & drop na timeline, animações, filtros)
- **Route Handlers** em `app/(api)/api/**` para endpoints
- **Server Actions** (preferível para operações internas simples do dashboard)

### 2.1 Rotas públicas (marketing)

- `/`
  - Função: landing, proposta, CTA para login/cadastro.
  - Componentes: Hero + demo de “texto livre → plano”.
  - CTA: “Planejar meu dia com IA” (leva para `/auth/register`).

- `/pricing`
  - Função: planos (MVP pode ser placeholder).

- `/about`
  - Função: sobre o produto.

- `/changelog`
  - Função: novidades (pode ser estático).

### 2.2 Legais

- `/terms`
  - Função: termos de uso.

- `/privacy`
  - Função: política de privacidade.

### 2.3 Auth (conta e segurança)

Base: `/auth/*`

- `/auth/login`
  - Função: login por email/senha + social.
  - Ações:
    - `authClient.signIn.email`
    - `authClient.signIn.social`
  - Estados: loading, erro, link “Esqueci minha senha”.

- `/auth/register`
  - Função: cadastro e início do onboarding.
  - Ações:
    - `SignUp(name, email, password)` (Server Action)
  - Pós-cadastro:
    - Mostrar “verifique seu email”.

- `/auth/verify`
  - Função: confirmar email via token/URL.
  - Ob  servação: BetterAuth já dá suporte via Verification; esta rota serve como UX para instruir e confirmar.

- `/auth/forgot-password`
  - Função: solicitar reset.

- `/auth/reset-password`
  - Função: trocar senha via token.

- `/auth/two-factor`
  - Função: setup e verificação 2FA.

### 2.4 Dashboard (app principal)

Base: `/dashboard/*`

#### 2.4.1 Home e planejamento

- `/dashboard`
  - Função: visão do dia + CTA de IA.
  - Blocos:
    - Resumo do dia (tarefas pendentes, foco)
    - Botão “Planejar meu dia com IA”
    - Últimos planos gerados

- `/dashboard/planejar`
  - Função: tela principal do produto (texto livre → plano).
  - Subseções:
    - Input grande (textarea): “Escreva tudo o que você precisa fazer hoje…”
    - Configurações rápidas: horário de trabalho, energia, pausas, prioridade
    - Resultado: tarefas extraídas + timeline sugerida
  - Ações:
    - “Gerar plano” (IA)
    - “Aplicar no meu dia” (cria/atualiza tarefas + agenda)
    - “Por que sugerimos isso?” (explicabilidade)

- `/dashboard/inbox`
  - Função: capturar ideias soltas (rápido, sem fricção).
  - Ações:
    - adicionar itens
    - converter itens em tarefas (manual ou IA)

#### 2.4.2 Tarefas

- `/dashboard/tarefas`
  - Função: lista completa com filtros.
  - Filtros:
    - status (aberta, feita, arquivada)
    - data (hoje, semana, atrasadas)
    - prioridade
    - projeto/tag
  - Ações:
    - criar tarefa
    - marcar como feita
    - editar inline

- `/dashboard/tarefas/nova`
  - Função: criação (form + NLP opcional).

- `/dashboard/tarefas/[taskId]`
  - Função: detalhe (ideal como drawer/modal), histórico, subtarefas.
  - Ações:
    - editar
    - duplicar
    - arquivar

#### 2.4.3 Agenda / timeline

- `/dashboard/timeline`
  - Função: timeline do dia (blocos de tempo).
  - Ações:
    - arrastar bloco
    - ajustar duração
    - resolver conflitos

- `/dashboard/timeline/[date]`
  - Função: timeline por data.

- `/dashboard/calendario`
  - Função: visão mensal/semana (MVP pode ser simples).

#### 2.4.4 Projetos e tags

- `/dashboard/projetos`
  - Função: lista de projetos.

- `/dashboard/projetos/[projectId]`
  - Função: tarefas do projeto + métricas.

- `/dashboard/tags`
  - Função: gerenciamento de tags.

#### 2.4.5 Estatísticas

- `/dashboard/stats`
  - Função: visão geral semanal.

- `/dashboard/stats/weekly`
- `/dashboard/stats/monthly`

Métricas base:

- tarefas criadas/concluídas
- taxa de conclusão
- tempo planejado vs realizado
- “streak”

#### 2.4.6 Notificações

- `/dashboard/notificacoes`
  - Função: central de notificações.

#### 2.4.7 Configurações

- `/dashboard/settings`
  - Função: hub.

- `/dashboard/settings/profile`
  - nome, avatar, timezone.

- `/dashboard/settings/preferences`
  - horário de trabalho, pausas, duração padrão, dia começa às X.

- `/dashboard/settings/notifications`
  - email/push, lembretes.

- `/dashboard/settings/security`
  - senha, 2FA, sessões ativas.

- `/dashboard/settings/integrations`
  - Google Calendar (V2), etc.

#### 2.4.8 (Opcional) Billing

- `/dashboard/billing`
  - Função: plano e pagamentos (pode ser placeholder no MVP).

---

## 3) APIs internas (Route Handlers) e Server Actions

### 3.1 APIs existentes

- `GET/POST /api/auth/*`
  - BetterAuth.

### 3.2 APIs propostas (MVP)

Sugestão de padrão: `app/(api)/api/**/route.ts` com autenticação via sessão.

- `/api/tasks`
  - `GET`: lista com filtros
  - `POST`: cria tarefa

- `/api/tasks/[taskId]`
  - `GET`: detalhe
  - `PATCH`: atualiza
  - `DELETE`: remove/arquiva

- `/api/plans/daily`
  - `GET`: plano do dia (por date)
  - `POST`: cria/atualiza plano do dia

- `/api/timeline`
  - `GET`: blocos do dia
  - `POST`: cria bloco

- `/api/timeline/[blockId]`
  - `PATCH`: mover/redimensionar
  - `DELETE`: remover

- `/api/ai/parse`
  - Entrada: texto livre
  - Saída: itens estruturados (tarefas, datas, durações)

- `/api/ai/plan-day`
  - Entrada: lista de tarefas + preferências
  - Saída: agenda sugerida (blocos) + justificativas

### 3.3 Server Actions (preferível para UX do dashboard)

Para operações simples que não exigem endpoint público:

- `createTaskAction`
- `updateTaskAction`
- `completeTaskAction`
- `generateDailyPlanAction`

---

## 4) Modelo de domínio (entidades)

### Entidades principais

- **User** (já existe)
- **Task**: unidade básica (pode vir de IA)
- **Project**: agrupador
- **Tag**: classificação
- **DailyPlan**: snapshot do planejamento do dia
- **TimeBlock**: blocos na timeline (agenda)
- **AI_Run**: histórico das execuções de IA (prompt, input, output, custos)
- **Notification**: avisos e lembretes
- **UserPreference**: preferências de rotina

---

## 5) Schema Prisma — tabelas a adicionar (proposta)

Abaixo é uma proposta de modelos para adicionar em `app/(database)/schema/schema.prisma`.

Observações importantes:

- Manter compatível com Postgres.
- Usar `@@index` nos campos de busca/filtro.
- Usar `@@map("nome_tabela")` para manter padrão existente.

### 5.1 Task

Campos sugeridos:

- `id` (String @id)
- `userId` (String, FK)
- `title` (String)
- `notes` (String?)
- `status` (enum: `OPEN`, `DONE`, `ARCHIVED`)
- `priority` (enum: `LOW`, `MEDIUM`, `HIGH`)
- `dueDate` (DateTime?)
- `estimatedMinutes` (Int? — usado na IA)
- `energy` (enum: `LOW`, `MEDIUM`, `HIGH`?)
- `source` (enum: `MANUAL`, `AI`)
- `projectId` (String?)
- `createdAt`, `updatedAt`

Índices:

- `(userId, status)`
- `(userId, dueDate)`
- `(userId, priority)`

### 5.2 Project

- `id`
- `userId`
- `name`
- `color` (String?)
- `archivedAt` (DateTime?)

### 5.3 Tag + TaskTag (N:N)

- `Tag`: `id`, `userId`, `name`, `color?`
- `TaskTag`: `taskId`, `tagId` (composite key)

### 5.4 DailyPlan

Representa o “plano do dia” (resultado da IA + ajustes do usuário):

- `id`
- `userId`
- `date` (DateTime — normalizado para dia)
- `source` (`MANUAL`/`AI`)
- `summary` (String? — “top priorities”)
- `createdFromText` (String? — input original)
- `createdAt`, `updatedAt`

Índice:

- `(userId, date)` unique

### 5.5 TimeBlock

- `id`
- `userId`
- `date` (DateTime)
- `startMinute` (Int) — minutos desde 00:00
- `endMinute` (Int)
- `type` (enum: `TASK`, `BREAK`, `FOCUS`, `MEETING`)
- `taskId` (String? — se bloco ligado a tarefa)
- `titleOverride` (String?)
- `locked` (Boolean @default(false))
- `createdAt`, `updatedAt`

Índices:

- `(userId, date)`
- `(taskId)`

### 5.6 UserPreference

- `id`
- `userId` unique
- `timezone` (String)
- `workdayStartMinute` (Int)
- `workdayEndMinute` (Int)
- `breakEveryMinutes` (Int?)
- `breakDurationMinutes` (Int?)
- `defaultTaskMinutes` (Int?)
- `createdAt`, `updatedAt`

### 5.7 AI_Run (observabilidade e explicabilidade)

- `id`
- `userId`
- `kind` (enum: `PARSE_TEXT`, `PLAN_DAY`, `REWRITE_TASK`)
- `inputText` (String?)
- `inputJson` (Json?)
- `outputJson` (Json?)
- `model` (String?)
- `tokensIn` (Int?)
- `tokensOut` (Int?)
- `latencyMs` (Int?)
- `createdAt`

### 5.8 Notification

- `id`
- `userId`
- `type` (enum: `REMINDER`, `SYSTEM`, `PLAN_READY`)
- `title`
- `body` (String?)
- `readAt` (DateTime?)
- `createdAt`

---

## 6) Lógica principal (como o produto funciona)

### 6.1 Fluxo “Texto livre → tarefas” (IA Parse)

Entrada: texto do usuário.

Pipeline sugerido:

1. Normalizar texto (trim, remover duplicatas óbvias)
2. Chamar IA para extrair itens:
   - tarefas (título)
   - estimativa (quando possível)
   - urgência (quando houver sinais)
   - datas e horários mencionados
3. Validar saída (schema Zod no server)
4. Mostrar preview para o usuário editar
5. Confirmar → persistir `Task` (source=AI)
6. Registrar `AI_Run(kind=PARSE_TEXT)`

### 6.2 Fluxo “Tarefas → plano do dia” (IA Plan)

Entrada:

- tarefas candidatas (open + dueDate <= hoje + backlog)
- preferências (UserPreference)
- constraints (blocos fixos, reuniões, horários bloqueados)

Saída:

- blocos `TimeBlock` sugeridos
- justificativas (“por que”) por prioridade/bloco

Regras importantes:

- nunca ultrapassar janela de trabalho
- sempre inserir pausas se definido
- respeitar tarefas “locked”
- minimizar fragmentação (menos blocos pequenos)

Persistência:

- criar/atualizar `DailyPlan(date)`
- gravar `TimeBlock`
- registrar `AI_Run(kind=PLAN_DAY)`

### 6.3 CRUD de tarefas

- Criar: manual (form) ou IA (parse)
- Atualizar: título/nota, status, prioridade, projeto/tags
- Concluir: marca `DONE` e remove/ajusta blocos na timeline (regra a definir)

### 6.4 Timeline / Agenda

- Renderização: ler `TimeBlock` do dia
- Interação:
  - drag para mover
  - resize para alterar duração
  - resolver conflitos (se sobrepor)

Regra de consistência:

- validar no server: `startMinute < endMinute` e não sobrepor se bloqueado

---

## 7) Regras de autenticação e segurança

- Todas rotas `/dashboard/*` exigem sessão.
- APIs internas (exceto `/api/auth/*`) devem validar sessão antes de acessar dados.
- Sempre filtrar por `userId` em todas queries.

---

## 8) Checklist de implementação (ordem sugerida)

### MVP (prioridade)

1. Tabelas: Task, DailyPlan, TimeBlock, UserPreference
2. Rotas dashboard:
   - `/dashboard` (home)
   - `/dashboard/planejar` (IA input)
   - `/dashboard/tarefas` (lista)
   - `/dashboard/timeline` (dia)
   - `/dashboard/settings/preferences`
3. APIs/Actions:
   - tasks CRUD
   - plan-day
4. UI:
   - empty states e loading states claros
   - explicabilidade (mostrar “por quê”)

### V2

- Projetos, tags, notificações
- Integração calendário
- Estatísticas avançadas

---

## 9) Observações de arquitetura (para manter o repo limpo)

- Evitar excesso de componentes minúsculos: agrupar por feature.
- Preferir `features/` quando começar a crescer:
  - `app/(dashboard)/dashboard/features/tasks/*`
  - `app/(dashboard)/dashboard/features/planning/*`
- Manter UI genérica em `app/components/ui/*` apenas se realmente reutilizável.

---

Se você quiser, eu também posso:

1. gerar um segundo arquivo só com o “Schema Prisma final” em bloco pronto para colar, ou
2. já criar as rotas vazias (pages/layouts) com skeleton mínimo e navegação no Sidebar.
