---
applyTo: "**"
---

# RotinaAI — AI Contribution Rules & Design Instructions

⚠️ ESTE ARQUIVO DEFINE COMO A IA DEVE ATUAR NO PROJETO.
Qualquer IA que gerar código, design, telas ou refactors DEVE seguir estas regras.

Este projeto é um SaaS real de portfólio com padrão profissional.
Nada aqui é experimental ou amador.

---

# 🎯 OBJETIVO PRINCIPAL

Criar um SaaS de produtividade com IA chamado **RotinaAI** com:

- Design impecável
- Experiência premium
- Interface moderna
- Animações fluidas
- Totalmente responsivo
- Código limpo
- Zero arquivos mortos
- Zero componentes inúteis
- Arquitetura sólida
- Estilo memorável

---

# 📱 RESPONSIVIDADE É OBRIGATÓRIA

TODA tela, componente ou layout:

✅ Deve funcionar perfeitamente em:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1280px+)

✅ Usar:

- CSS Grid / Flex
- Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- Mobile-first
- Sidebar colapsável
- Menus adaptativos
- Modais e drawers responsivos

❌ Nunca criar telas desktop-only.

---

# 🎨 PADRÃO VISUAL EXIGIDO

O design deve ser:

- SaaS moderno
- Minimalista premium
- Criativo
- Chamativo sem exagero
- Animado
- Com identidade própria
- Futurista suave
- Profissional

Deve seguir o documento:

👉 `DESIGN_SYSTEM.md`

---

# ✨ ANIMAÇÕES SÃO OBRIGATÓRIAS

Sempre que possível:

- Transições suaves
- Hover states
- Micro-interações
- Skeleton loaders
- Motion feedback
- Cards animados
- Sidebar animada
- Timeline interativa

### 📦 LIBS PERMITIDAS / RECOMENDADAS

A IA PODE instalar e usar:

- **framer-motion** (PRIORIDADE)
- auto-animate
- motion-one
- tailwindcss-animate
- gsap (para interações avançadas)

Se instalar:
➡️ explicar por que  
➡️ adicionar no README  
➡️ usar com moderação e elegância

---

# 🧩 COMPONENTES UI

Pode e é incentivado:

✅ Usar **shadcn/ui** (já instalado)  
✅ Customizar tokens  
✅ Criar wrappers animados  
✅ Criar variantes próprias  
✅ Criar componentes reutilizáveis

---

# 🧼 CÓDIGO LIMPO É REGRA

Antes de entregar qualquer alteração:

🔍 ANALISAR:

- Arquivos não utilizados
- Componentes órfãos
- CSS morto
- Rotas não usadas
- Hooks esquecidos
- Imports inúteis
- Utils não utilizados

Se existir:

🗑️ EXCLUIR.

Este projeto NÃO aceita:

❌ Dead files  
❌ Código legado sem uso  
❌ Comentários inúteis  
❌ Gambiarras  
❌ TODOs permanentes

---

# 🧠 REFATORAÇÃO CONTÍNUA

Sempre que tocar numa área:

- Melhorar tipagem
- Melhorar nomes
- Reduzir complexidade
- Extrair componentes
- Padronizar pastas
- Atualizar estilos
- Consolidar helpers
- Seguir lint/prettier

---

# 🧭 UX É CRÍTICO

Toda funcionalidade deve:

- Ter feedback visual
- Ter loading state
- Ter empty state
- Ter erro elegante
- Ter confirmação
- Ser intuitiva
- Exigir poucos cliques
- Começar com input natural

---

# 🏆 PADRÃO DE QUALIDADE

A IA deve se perguntar:

> "Isso está no nível de um SaaS pago?"

Se a resposta for NÃO → refazer.

---

# 📦 ORGANIZAÇÃO DO REPO

Obrigatório:

- Pastas claras
- Componentes reutilizáveis
- `features/`
- `components/ui/`
- `lib/`
- `hooks/`
- `services/`
- `types/`

Arquivos temporários devem ser removidos.

---

# 📊 PERFORMANCE

Priorizar:

- Server Components
- Lazy loading
- Skeleton UI
- Cache
- Otimização de bundle
- Imagens otimizadas
- Fonts otimizadas

---

# 🧪 TESTES (quando possível)

- Componentes críticos testados
- Lógica IA validada
- Parsing protegido
- Edge cases tratados

---

# 🚀 MENTALIDADE

Este SaaS:

- Precisa impressionar recrutadores
- Precisa parecer startup real
- Precisa ser memorável
- Precisa ter identidade visual forte
- Precisa ser divertido de usar
- Precisa parecer vivo

---

# 🧠 FRASE QUE A IA DEVE LEMBRAR:

"Estou construindo o RotinaAI.
Ele precisa ser impecável.
Visual absurdo.
Responsivo em tudo.
Animado.
Código limpo.
Zero lixo.
SaaS sério.
Portfólio de elite."

---

# 📎 STATUS

Este documento é obrigatório.
Qualquer contribuição futura deve seguir estas regras.
