"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5">
      {/* Header */}
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
            <h1 className="text-4xl font-bold mb-2">Política de Privacidade</h1>
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
            <h2 className="text-2xl font-bold">1. Introdução</h2>
            <p className="text-foreground/80 leading-relaxed">
              Na RotinaAI, levamos sua privacidade muito a sério. Esta Política
              de Privacidade explica como coletamos, usamos, divulgamos e
              protegemos suas informações quando você usa nosso serviço.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">2. Informações que Coletamos</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Coletamos vários tipos de informações:
            </p>
            <ul className="space-y-3 text-foreground/80">
              <li>
                <strong>Informações de Conta:</strong> Nome, email, senha
                (criptografada) e preferências
              </li>
              <li>
                <strong>Dados de Uso:</strong> Tarefas, agendas, histórico de
                uso e padrões de interação
              </li>
              <li>
                <strong>Informações Técnicas:</strong> Endereço IP, tipo de
                navegador, sistema operacional e cookies
              </li>
              <li>
                <strong>Dados de Comunicação:</strong> Emails, mensagens de
                suporte e feedback
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">
              3. Como Usamos Suas Informações
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Usamos as informações coletadas para:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside">
              <li>Fornecer, manter e melhorar nosso serviço</li>
              <li>Personalizar sua experiência com IA</li>
              <li>Responder a suas consultas e fornecer suporte</li>
              <li>Enviar atualizações, notícias e ofertas promocionais</li>
              <li>Analisar tendências de uso e melhorar funcionalidades</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">4. Compartilhamento de Dados</h2>
            <p className="text-foreground/80 leading-relaxed">
              Não vendemos ou alugamos suas informações pessoais. Podemos
              compartilhar informações com:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside mt-3">
              <li>Provedores de serviço que nos ajudam a operar o serviço</li>
              <li>Autoridades legais quando obrigado por lei</li>
              <li>
                Outros usuários, apenas o que você optar por compartilhar
                publicamente
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">5. Segurança de Dados</h2>
            <p className="text-foreground/80 leading-relaxed">
              Implementamos medidas de segurança técnicas, administrativas e
              físicas para proteger suas informações contra acesso não
              autorizado, alteração, divulgação ou destruição. Usamos
              criptografia SSL/TLS para proteger dados em trânsito.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">6. Retenção de Dados</h2>
            <p className="text-foreground/80 leading-relaxed">
              Retemos suas informações pessoais enquanto sua conta estiver ativa
              ou conforme necessário para fornecer nossos serviços. Você pode
              solicitar a exclusão de seus dados a qualquer momento.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">7. Seus Direitos</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Você tem o direito de:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar exclusão de seus dados</li>
              <li>Optar por não receber comunicações de marketing</li>
              <li>Portabilidade de dados</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">8. Cookies e Rastreamento</h2>
            <p className="text-foreground/80 leading-relaxed">
              Usamos cookies para melhorar sua experiência. Você pode controlar
              o uso de cookies através das configurações do seu navegador.
              Alguns cookies são essenciais para o funcionamento do serviço.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">
              9. Alterações a Esta Política
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente.
              Notificaremos você sobre mudanças significativas por email ou
              através de um aviso em nosso serviço.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-bold">Entre em Contato</h2>
            <p className="text-foreground/80">
              Se tiver dúvidas ou preocupações sobre esta Política de
              Privacidade, entre em contato conosco em:
            </p>
            <p className="font-semibold">privacy@rotinaai.com</p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
