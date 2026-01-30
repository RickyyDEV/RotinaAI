"use client";
import { useState } from "react";

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
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at top left, var(--primary), transparent 50%), radial-gradient(circle at bottom right, var(--secondary), transparent 50%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="animate-in fade-in slide-in-from-left-6 duration-700">
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
              <button
                type="submit"
                className="px-7 py-3 rounded-xl text-primary-foreground font-semibold whitespace-nowrap transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(90deg,var(--primary),var(--secondary))",
                }}
              >
                Gerar Minha Agenda
              </button>
            </form>

            {preview && (
              <div className="mt-6 bg-card border border-border rounded-xl p-5 text-base shadow-md animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="font-semibold mb-2 text-primary">
                  Sua agenda gerada:
                </div>
                <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {preview}
                </pre>
                <button
                  className="mt-4 w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                  onClick={() => setPreview(null)}
                >
                  Limpar Preview
                </button>
              </div>
            )}
          </div>

          <div className="relative h-full min-h-100 animate-in fade-in slide-in-from-right-6 duration-700 [animation-delay:120ms]">
            <div
              className="absolute inset-0 bg-card shadow-2xl rounded-3xl p-7 flex flex-col justify-between transform rotate-3 hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 ease-in-out will-change-transform"
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
                  <li className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-left-4 duration-500 [animation-delay:240ms]">
                    <div>
                      <div className="text-base font-medium">
                        Preparar apresentação de vendas
                      </div>
                      <div className="text-xs text-muted-foreground">
                        90m • Alta Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">09:00</div>
                  </li>
                  <li className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-left-4 duration-500 [animation-delay:340ms]">
                    <div>
                      <div className="text-base font-medium">
                        Revisar PRs do time
                      </div>
                      <div className="text-xs text-muted-foreground">
                        60m • Média Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">11:00</div>
                  </li>
                  <li className="p-4 rounded-lg border border-border bg-popover flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-left-4 duration-500 [animation-delay:440ms]">
                    <div>
                      <div className="text-base font-medium">
                        Planejar conteúdo para redes sociais
                      </div>
                      <div className="text-xs text-muted-foreground">
                        45m • Baixa Prioridade
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">14:00</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
