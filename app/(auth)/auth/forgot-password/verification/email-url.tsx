"use server";

import resend from "@/app/lib/smtp";
import { renderToStaticMarkup } from "react-dom/server";

type ResetPasswordEmailTemplateProps = {
  url: string;
  email?: string;
  name?: string;
};

function ResetPasswordEmailTemplate({
  url,
  email,
  name,
}: ResetPasswordEmailTemplateProps) {
  const safeName = (name ?? "").trim();
  const firstName = safeName ? safeName.split(" ")[0] : "";
  const greeting = firstName ? `Olá, ${firstName}` : "Olá";

  const container: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#F8FAFC",
    margin: 0,
    padding: "32px 16px",
    color: "#111827",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
  };

  const card: React.CSSProperties = {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid #E5E7EB",
    boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)",
  };

  const header: React.CSSProperties = {
    padding: "26px 22px",
    background:
      "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(124,58,237,1) 100%)",
    color: "#FFFFFF",
  };

  const badge: React.CSSProperties = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.02em",
  };

  const body: React.CSSProperties = {
    padding: "26px 22px",
  };

  const title: React.CSSProperties = {
    margin: "14px 0 6px",
    fontSize: 22,
    lineHeight: "28px",
    fontWeight: 800,
  };

  const text: React.CSSProperties = {
    margin: "0 0 14px",
    fontSize: 14,
    lineHeight: "22px",
    color: "#334155",
  };

  const highlight: React.CSSProperties = {
    margin: "14px 0 0",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.06) 100%)",
    border: "1px solid rgba(37,99,235,0.14)",
    borderRadius: 14,
    padding: "16px 14px",
  };

  const button: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 12,
    background:
      "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(124,58,237,1) 100%)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 800,
  };

  const small: React.CSSProperties = {
    margin: "10px 0 0",
    fontSize: 12,
    lineHeight: "18px",
    color: "#64748B",
  };

  const codeBox: React.CSSProperties = {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #E5E7EB",
    backgroundColor: "#F1F5F9",
    color: "#0F172A",
    fontSize: 12,
    lineHeight: "18px",
    wordBreak: "break-all",
  };

  const footer: React.CSSProperties = {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    backgroundColor: "#F8FAFC",
  };

  const preheader: React.CSSProperties = {
    display: "none",
    fontSize: 1,
    lineHeight: "1px",
    maxHeight: 0,
    maxWidth: 0,
    opacity: 0,
    overflow: "hidden",
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Redefinir senha - RotinaAI</title>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={preheader}>
          Redefina sua senha do RotinaAI com segurança.
        </div>

        <div style={container}>
          <div style={card}>
            <div style={header}>
              <div style={badge}>ROTINAAI • SEGURANÇA</div>
              <div style={title}>Redefinir sua senha</div>
              <div
                style={{ ...text, color: "rgba(255,255,255,0.92)", margin: 0 }}
              >
                {greeting}, recebemos um pedido para redefinir sua senha.
              </div>
            </div>

            <div style={body}>
              <p style={text}>
                Para continuar, clique no botão abaixo. Se você não solicitou,
                pode ignorar este email com tranquilidade.
              </p>

              <div style={highlight}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>
                  Ação rápida
                </div>
                <a href={url} style={button} target="_blank" rel="noreferrer">
                  Redefinir senha
                </a>
                <p style={small}>
                  Dica: por segurança, esse link pode expirar. Se não funcionar,
                  solicite novamente.
                </p>

                <div style={codeBox}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>
                    Não conseguiu clicar? Copie e cole o link:
                  </div>
                  <div>{url}</div>
                </div>
              </div>

              <p style={{ ...small, marginTop: 14 }}>
                {email ? (
                  <>
                    Este email foi enviado para <strong>{email}</strong>.
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>

            <div style={footer}>
              <div
                style={{ fontSize: 12, color: "#64748B", lineHeight: "18px" }}
              >
                <strong style={{ color: "#0F172A" }}>RotinaAI</strong> — um
                assistente diário que organiza sua rotina com IA.
              </div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>
                © 2026 RotinaAI. Se você não solicitou, ignore este email.
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export function renderResetPasswordEmailHtml(
  props: ResetPasswordEmailTemplateProps,
) {
  return `<!doctype html>${renderToStaticMarkup(
    <ResetPasswordEmailTemplate {...props} />,
  )}`;
}

export default async function SendResetPasswordEmailUrl(
  email: string,
  url: string,
  name?: string,
) {
  const html = renderResetPasswordEmailHtml({ url, email, name });
  const to = name?.trim() ? `${name} <${email}>` : email;

  const { data, error } = await resend.emails.send({
    from: "RotinaAI <onboarding@resend.dev>",
    to,
    subject: "🔐 Redefinir senha — RotinaAI",
    html,
  });
  if (error) {
    console.error("❌ Erro ao enviar email de redefinição de senha:", error);
    return {
      success: false,
      message: "Erro ao enviar email de redefinição de senha",
      error: error,
    };
  } else {
    return {
      success: true,
      message: "Email de redefinição de senha enviado com sucesso",
      data,
    };
  }
}
