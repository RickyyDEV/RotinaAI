"use client";

import {
  Sparkles,
  Calendar,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

interface DashboardWelcomeProps {
  userName: string;
}

export default function DashboardWelcome({ userName }: DashboardWelcomeProps) {
  const stats = [
    {
      label: "Tarefas Hoje",
      value: "12",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Produtividade",
      value: "65%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Tempo Gasto",
      value: "4h 32m",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Streak",
      value: "7 dias",
      icon: Sparkles,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -mr-36 -mt-36" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -ml-36 -mb-36" />

        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 animate-in fade-in zoom-in-95 duration-300 delay-200">
            <span className="text-sm font-semibold text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Bem-vindo de volta!
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-300">
            Vamos organizar seu dia, {userName.split(" ")[0]}? 🚀
          </h2>

          <p className="text-lg text-muted-foreground mb-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 delay-400">
            Com RotinaAI, você transforma suas ideias em um plano diário
            estruturado e alcançável. Comece digitando tudo o que precisa fazer
            hoje.
          </p>

          <button className="px-6 py-3 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-fit animate-in fade-in zoom-in-95 duration-300 delay-500 hover:scale-105 active:scale-95">
            ✨ Planejar Meu Dia com IA
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-linear-to-br ${stat.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <div className="h-1 bg-linear-to-r from-primary to-secondary rounded-full mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500 delay-600">
        {/* Recent Tarefas */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tarefas Recentes
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all cursor-pointer group hover:translate-x-1"
              >
                <div className="w-5 h-5 rounded border border-border group-hover:bg-primary group-hover:border-primary transition-all" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Tarefa de exemplo {i}
                  </p>
                  <p className="text-xs text-muted-foreground">Hoje às 14:30</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtividade Semanal */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Produtividade Semanal
          </h3>
          <div className="space-y-4">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((day, i) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-8">
                  {day}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${(i * 19 + 42) % 100}%` }}
                  />
                </div>
                {/* <span className="text-xs text-muted-foreground w-8 text-right">
                  {Math.floor(Math.random() * 100)}%
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
