"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [value, setValue] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setPreview(
      `- ${value
        .split(",")
        .map((s) => s.trim())
        .join("\n- ")}`,
    );
    setValue("");
  }

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at top left, var(--primary), transparent 50%), radial-gradient(circle at bottom right, var(--secondary), transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tighter">
              Maximize sua produtividade com{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                IA inteligente
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Transforme texto livre em agendas organizadas, tarefas priorizadas
              e planos diários automatizados.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mb-8"
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ex.: Planejar viagem, ligar para cliente, escrever blog post"
                className="flex-1 p-4 rounded-xl border border-border bg-popover text-base outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <motion.button
                type="submit"
                className="px-7 py-3 rounded-xl text-primary-foreground font-semibold whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(90deg,var(--primary),var(--secondary))",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px rgba(var(--primary-rgb), 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Gerar Minha Agenda
              </motion.button>
            </form>

            {preview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-card border border-border rounded-xl p-5 text-base shadow-md"
              >
                <div className="font-semibold mb-2 text-primary">
                  Sua agenda gerada:
                </div>
                <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {preview}
                </pre>
                <motion.button
                  className="mt-4 w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreview(null)}
                >
                  Limpar Preview
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="relative h-full min-h-100"
          >
            <motion.div
              className="absolute inset-0 bg-card shadow-2xl rounded-3xl p-7 flex flex-col justify-between transform rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out"
              whileHover={{ rotate: 0, scale: 1.02 }}
              style={{ top: "5%", left: "5%", right: "-5%", bottom: "-5%" }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold">Minha Agenda Diária</h3>
                    <p className="text-sm text-muted-foreground">
                      Sua rotina otimizada pela IA
                    </p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    HOJE
                  </span>
                </div>
                <ul className="space-y-4">
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="text-base font-medium">
                        Preparar apresentação de vendas
                      </div>
                      <div className="text-xs text-muted-foreground">
                        90m • Alta Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">09:00</div>
                  </motion.li>
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="text-base font-medium">
                        Revisar PRs do time
                      </div>
                      <div className="text-xs text-muted-foreground">
                        60m • Média Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">11:00</div>
                  </motion.li>
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="text-base font-medium">
                        Planejar conteúdo para redes sociais
                      </div>
                      <div className="text-xs text-muted-foreground">
                        45m • Baixa Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">14:00</div>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
