# 🤖 RotinaAI

> Um assistente diário que organiza sua rotina com inteligência artificial

## ✨ Visão Geral

**RotinaAI** é um SaaS de produtividade moderno que transforma texto livre em agendas inteligentes, tarefas priorizadas e planos diários automatizados. Usando IA avançada, o sistema entende suas necessidades e cria estruturas de trabalho otimizadas automaticamente.

Diga simplesmente o que precisa fazer e deixe a IA organizar tudo para você.

---

## 🎯 Problema Resolvido

### O Desafio

- ⏰ **Procrastinação** — Dificuldade em começar tarefas
- 🔀 **Falta de Priorização** — Não saber o que fazer primeiro
- 📝 **Organização Manual** — Gastar tempo estruturando tarefas
- 😓 **Sobrecarga Cognitiva** — Muitas tarefas, pouca clareza
- ❌ **Abandono de Planejadores** — Ferramentas complexas e chatas

### A Solução

RotinaAI simplifica tudo com uma interface intuitiva e IA que:

- 🤖 Entende linguagem natural
- 🎯 Prioriza tarefas automaticamente
- ⏱️ Cria timelines realistas
- 📊 Sugere otimizações
- 💡 Aprende com seu padrão

---

## 🚀 Recursos Principais

### 📝 Input Natural

Digite ou fale em linguagem natural — "Preciso entregar um projeto web, estudar React e fazer exercício hoje"

### 🧠 IA

- Analisa tarefas complexas
- Quebra em subtarefas
- Estima tempo realista
- Sugere melhor sequência

### 📅 Timeline Interativa

- Visualização do dia em cards
- Drag & drop para reorganizar
- Estimativas de tempo
- Indicadores de prioridade

### 📊 Dashboard Intuitivo

- Visão geral do dia
- Estatísticas de produtividade
- Histórico de semana
- Streaks e motivação

### 🎨 Design Premium

- Interface moderna e responsiva
- Dark mode
- Animações
- Totalmente mobile-friendly

---

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 16** — Framework React com App Router
- **TypeScript** — Type safety e DX melhorado
- **Tailwind CSS v4** — Styling utility-first
- **Framer Motion** — Animações e micro-interações
- **React Hook Form** — Validação de formulários
- **Zod** — Type-safe validation
- **shadcn/ui** — Componentes UI reutilizáveis
- **Lucide Icons** — Ícones limpos e modernos

### Backend

- **Better Auth** — Autenticação segura
- **MailerSend** — Email verification
- **Server Actions** — Funções server-side com Next.js

### Dados

- **Prisma** — ORM type-safe
- **PostgreSQL** — Banco de dados robusto

### DevOps & Quality

- **Bun** — Runtime rápido
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **TypeScript** — Type checking

---

### Tipografia

- **Fonte primária**: Geist Sans / Inter
- **Fonte mono**: Geist Mono / JetBrains Mono
- **Hierarquia**: H1 (4xl) → Body (base) → Small (sm)

### Componentes

- Cards flutuantes com shadow suave
- Bordas arredondadas (radius: 0.625rem)
- Gradientes suaves (primary → secondary)
- Transições 0.2s ease
- Estado de loading com skeleton

---

## 📱 Responsividade

Totalmente responsivo em todos os dispositivos:

```
📱 Mobile     (320px+)
📱 Tablet     (768px+)
🖥️  Desktop    (1280px+)
```

- Layout adaptativo com CSS Grid/Flex
- Sidebar colapsável em mobile
- Touch-friendly em todos os elementos
- Performance otimizada

---

## 🔐 Segurança

- ✅ Autenticação com Better Auth
- ✅ Validação de formulários (Zod)
- ✅ Email verification com tokens
- ✅ Type-safe queries com Prisma
- ✅ Server-side validation

---

## 📦 Instalação & Setup

### Requisitos

- Node.js 18+
- Bun (recomendado)
- PostgreSQL 14+

### Passos de Setup

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/rotinai.git
cd rotinai

# 2. Instale dependências
bun install

# 3. Configure variáveis de ambiente
cp .env.example .env.local

# 4. Setup do banco de dados
bun prisma migrate dev

# 5. Inicie o servidor
bun dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🌍 Público-Alvo

Perfeito para:

- 👨‍💻 **Desenvolvedores** que querem organizar projetos
- 🎓 **Estudantes** que procrastinam
- 💼 **Freelancers** com múltiplos projetos
- 🏢 **Profissionais remotos** sem estrutura
- ✍️ **Criadores de conteúdo** com rotinas complexas
- 😴 **Qualquer um que procrastina**

---

## 🚦 Status do Projeto

### ✅ Concluído

- [] Design completo
- [x] Autenticação com Better Auth
- [x] Sistema de login/registro
- [x] Verificação de email
- [x] Interface responsiva

### 🚧 Em Desenvolvimento

- [ ] Dashboard principal
- [ ] Integração com IA
- [ ] Timeline interativa
- [ ] Criação de tarefas
- [ ] Estatísticas
- [ ] Mobile app
- [ ] Integrações (Google Calendar, etc)

### 📋 Roadmap

- [ ] v1.0 — MVP funcional
- [ ] v1.5 — Dark mode + Otimizações
- [ ] v2.0 — API pública
- [ ] v2.5 — Mobile app nativa
- [ ] v3.0 — Funcionalidades avançadas

---

## 🎯 Padrões & Boas Práticas

### Código Limpo

- ✅ Estrutura organizada
- ✅ TypeScript
- ✅ ESLint

### Performance

- ✅ Server Components por padrão
- ✅ Lazy loading de componentes
- ✅ Skeleton para loading
- ✅ Image optimization
- ✅ Font optimization

### UX/Design

- ✅ Feedback visual em todas ações
- ✅ Estados de erro tratados
- ✅ Empty states
- ✅ Loading states
- ✅ Animações

---

## 🤝 Contribuição

Este é um projeto em desenvolvimento ativo.

## 👨‍💻 Autor

Desenvolvido por **Ricardo** como projeto de portfólio.

### Links

- 🌐 [Portfólio](https://ricardomarinho.tech)
- 💼 [LinkedIn](https://www.linkedin.com/in/ricardo-marinho-7b6b66244/)
- 🐙 [GitHub](https://github.com/RickyyDEV)

---

## 📞 Contato & Suporte

- 📧 Email: seu-email@example.com
- 💬 Discord: [$icky](https://discord.com/users/409801761470152704)
- 🐛 Issues: Use GitHub Issues para reportar bugs

<div align="center">

**Desenvolvido para aumentar sua produtividade**

![Status](https://img.shields.io/badge/Status-Development-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square)

</div>
