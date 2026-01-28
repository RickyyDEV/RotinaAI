"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Logo from "./components/Logo";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <Hero />

      {/* Features Section */}
      <section id="features" className="relative py-20 lg:py-32">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-linear-to-br from-primary to-secondary blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Funcionalidades Poderosas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              RotinaAI combina inteligência artificial e design intuitivo para
              transformar sua rotina em um fluxo de produtividade.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                icon: "🤖",
                title: "IA Smart Parser",
                description:
                  "Converte suas tarefas em texto livre para agendas estruturadas. Nosso modelo inteligente entende contexto, urgência e duração automaticamente.",
              },
              {
                icon: "⏱️",
                title: "Scheduler Inteligente",
                description:
                  "Aloca blocos de tempo otimizados. Replica automaticamente quando algo atrasa, mantendo seu dia fluindo sem fricção.",
              },
              {
                icon: "📊",
                title: "Analytics Semanal",
                description:
                  "Visualize seu progresso com heatmaps, streaks e relatórios. Entenda seus padrões e melhore continuamente.",
              },
              {
                icon: "🎯",
                title: "Priorização Automática",
                description:
                  "Tarefas são organizadas por urgência, importância e impacto. Você sempre sabe o que fazer primeiro.",
              },
              {
                icon: "📱",
                title: "Mobile-First",
                description:
                  "Interface responsiva e rápida. Planeje seu dia em qualquer lugar, sincronizado em tempo real.",
              },
              {
                icon: "🔄",
                title: "Sync Cross-Device",
                description:
                  "Comece no celular, continue no desktop. Todos os dados sincronizados e sempre acessíveis.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-colors duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section id="how" className="relative py-20 lg:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Como Ajudamos Você
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reduzimos a fricção entre pensar e fazer, permitindo que você
              foque no que realmente importa.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "⚡",
                title: "Economia de Tempo",
                subtitle: "-30 min/dia",
                description:
                  "Converta planos vagos em tarefas práticas em minutos, não em horas. Seu tempo é valioso.",
              },
              {
                icon: "😌",
                title: "Reduz Ansiedade",
                subtitle: "Menos stress",
                description:
                  "Com um plano visual e realista, você dorme tranquilo sabendo exatamente o que fazer amanhã.",
              },
              {
                icon: "🎯",
                title: "Foco Real",
                subtitle: "Blocos dedicados",
                description:
                  "Blocos de concentração sugeridos pela IA. Sem distrações, sem procrastinação.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-background border border-border rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {item.subtitle}
                </p>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Benefícios Comprovados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milhares de usuários já transformaram sua rotina. Aqui está o que
              eles ganham.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              "✓ Organização visual automática",
              "✓ Estimativas confiáveis de tempo",
              "✓ Replanejamento inteligente em tempo real",
              "✓ Relatórios semanais de progresso",
              "✓ Sincronização entre dispositivos",
              "✓ Sugestões de foco baseadas em IA",
              "✓ Histórico e análise de produtividade",
              "✓ Integrações com calendário e ferramentas",
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors duration-300"
              >
                <p className="font-medium text-foreground">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who" className="relative py-20 lg:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Para Quem é RotinaAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Se você precisa organizar sua rotina, RotinaAI foi feito para
              você.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                emoji: "🎓",
                title: "Estudantes",
                description:
                  "Organize sessões de estudo, revise cronogramas de provas e mantenha uma rotina equilibrada entre aulas, trabalho e vida pessoal.",
                useCases: [
                  "Planejar semanas de provas",
                  "Distribuir leitura dos livros",
                  "Blocos de estudo eficientes",
                ],
              },
              {
                emoji: "💼",
                title: "Freelancers",
                description:
                  "Encaixe projetos entre reuniões, acompanhe deadlines de múltiplos clientes e mantenha a produtividade consistente.",
                useCases: [
                  "Múltiplos projetos paralelos",
                  "Gestão de deadlines",
                  "Faturas e entregáveis",
                ],
              },
              {
                emoji: "👔",
                title: "Profissionais",
                description:
                  "Melhore foco diário em tarefas críticas, reduza reuniões improdutivas e acompanhe progresso em relação a metas.",
                useCases: [
                  "Priorizar tarefas estratégicas",
                  "Proteger tempo de foco",
                  "Acompanhar OKRs",
                ],
              },
              {
                emoji: "🚀",
                title: "Empreendedores",
                description:
                  "Equilibre múltiplas responsabilidades, delegue com clareza e mantenha a visão estratégica enquanto executa.",
                useCases: [
                  "Visão de 360° das atividades",
                  "Priorização executiva",
                  "Scaling com clareza",
                ],
              },
              {
                emoji: "✍️",
                title: "Criadores de Conteúdo",
                description:
                  "Planeje conteúdo, organize calendário editorial e mantenha consistência em publicações.",
                useCases: [
                  "Calendário editorial",
                  "Ciclos de criação",
                  "Publicação agendada",
                ],
              },
              {
                emoji: "👨‍💻",
                title: "Desenvolvedores",
                description:
                  "Organize sprints, tarefas técnicas e balanceie entre código, reviews e mentoring.",
                useCases: [
                  "Gestão de PRs e reviews",
                  "Sprints e planejamento",
                  "Débito técnico",
                ],
              },
            ].map((person, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 transition-opacity duration-300" />
                <div className="relative bg-background border border-border rounded-2xl p-8 h-full">
                  <div className="text-5xl mb-4">{person.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{person.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {person.description}
                  </p>
                  <ul className="space-y-2">
                    {person.useCases.map((useCase, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary font-bold">→</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-linear-to-br from-primary to-secondary blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
              Pronto para transformar sua rotina?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Comece a planejar seu dia com IA em segundos. Sem cartão de
              crédito. Sem compromisso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#"
                className="inline-flex items-center px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg"
                style={{
                  background:
                    "linear-gradient(90deg,var(--primary),var(--secondary))",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(37, 99, 235, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Grátis
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center px-8 py-4 rounded-xl border border-border text-foreground font-semibold"
                whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Demo
              </motion.a>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Acesso instantâneo • 7 dias de trial • Sem cartão necessário
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border bg-card/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo />
              <p className="mt-3 text-sm text-muted-foreground">
                Organização + IA = Produtividade de verdade.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Carreiras
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RotinaAI. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.593 3.756 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.252-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
