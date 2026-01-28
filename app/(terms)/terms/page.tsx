"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5">
      <div className="border-b border-border sticky top-0 z-40 bg-card/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="scale-75 -ml-2" />
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-primary hover:text-primary/80 transition"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Termos de Serviço</h1>
            <p className="text-muted-foreground">
              Última atualização: 27 de janeiro de 2026
            </p>
          </div>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">1. Aceitação dos Termos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Ao acessar e usar o RotinaAI, você aceita estar vinculado por
              estes Termos de Serviço. Se você não concorda com qualquer parte
              destes termos, você não pode usar nosso serviço.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">2. Descrição do Serviço</h2>
            <p className="text-foreground/80 leading-relaxed">
              RotinaAI é uma plataforma SaaS que utiliza inteligência artificial
              para ajudá-lo a organizar tarefas, gerenciar prazos e aumentar sua
              produtividade. O serviço inclui processamento de linguagem
              natural, agendamento automático e análise de tarefas.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">3. Contas de Usuário</h2>
            <div className="space-y-3 text-foreground/80">
              <p className="leading-relaxed">
                Você é responsável por manter a confidencialidade de sua senha e
                informações de conta. Você concorda em aceitar responsabilidade
                por todas as atividades que ocorrem sob sua conta.
              </p>
              <p className="leading-relaxed">
                Você concorda em fornecer informações precisas, correntes e
                completas durante o processo de registro e manter essas
                informações atualizadas.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">
              4. Direitos de Propriedade Intelectual
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              O RotinaAI, incluindo seu código, design, funcionalidades e
              conteúdo, é de nossa propriedade exclusiva. Você recebe uma
              licença limitada e não transferível para usar nosso serviço apenas
              para fins pessoais ou comerciais legítimos.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">5. Uso Aceitável</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Você concorda em não usar o RotinaAI para:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside">
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>
                Infringir direitos de propriedade intelectual de terceiros
              </li>
              <li>Enviar conteúdo abusivo, obsceno ou ofensivo</li>
              <li>Tentar acessar contas não autorizadas ou sistemas</li>
              <li>Distribuir malware ou código prejudicial</li>
              <li>Coletar dados através de web scraping não autorizado</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Na máxima extensão permitida pela lei, RotinaAI não será
              responsável por danos indiretos, incidentais, especiais ou
              consequentes, mesmo que tenha sido avisado da possibilidade de
              tais danos.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">7. Rescisão</h2>
            <p className="text-foreground/80 leading-relaxed">
              Podemos encerrar ou suspender sua conta e acesso imediatamente,
              sem aviso prévio ou responsabilidade, por qualquer motivo,
              incluindo se você violar estes Termos de Serviço.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">8. Alterações aos Termos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Reservamos o direito de modificar estes Termos de Serviço a
              qualquer momento. Alterações significativas serão comunicadas por
              email. Seu uso contínuo do serviço após mudanças constitui
              aceitação dos novos termos.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-bold">Entre em Contato</h2>
            <p className="text-foreground/80">
              Se tiver dúvidas sobre estes Termos de Serviço, entre em contato
              conosco em:
            </p>
            <p className="font-semibold">support@rotinaai.com</p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
