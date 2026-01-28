"use server";

import mailerSend from "@/app/lib/smtp";
import { env } from "@/env";
import { EmailParams, Recipient, Sender } from "mailersend";

function generateResetPasswordEmailTemplate({
  url,
  email,
  name,
}: {
  url: string;
  email: string;
  name?: string;
}) {
  const safeName = (name ?? "").trim();
  const firstName = safeName ? safeName.split(" ")[0] : "";
  const greeting = firstName ? `Olá, ${firstName}!` : "Olá!";

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redefinir senha - RotinaAI</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 40px 20px;
          color: #111827;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .header {
          background: linear-gradient(90deg, #2563EB 0%, #7C3AED 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: rgba(255, 255, 255, 0.95);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .header h1 {
          color: white;
          font-size: 28px;
          margin-bottom: 8px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin: 0;
        }
        .content { padding: 40px 32px; }
        .greeting {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 14px;
        }
        .description {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .box {
          background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.06) 100%);
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 28px 22px;
          text-align: center;
          margin: 24px 0;
        }
        .box-title {
          font-size: 16px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 8px;
        }
        .box-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 18px;
        }
        .btn {
          display: inline-block !important;
          background: linear-gradient(90deg, #2563EB 0%, #7C3AED 100%) !important;
          color: #ffffff !important;
          padding: 13px 26px !important;
          border-radius: 10px !important;
          text-decoration: none !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25) !important;
          border: none !important;
        }
        .btn:hover { filter: brightness(1.02); }
        .alt {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(0,0,0,0.08);
          word-break: break-word;
        }
        .alt a {
          color: #2563EB;
          text-decoration: none;
          word-break: break-all;
          font-size: 11px;
        }
        .warning {
          background: #fff7ed;
          border-left: 4px solid #f59e0b;
          padding: 12px 16px;
          border-radius: 6px;
          margin: 22px 0;
          font-size: 13px;
          color: #92400e;
        }
        .warning strong { display: block; margin-bottom: 4px; }
        .footer {
          background: #f9fafb;
          padding: 24px 32px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          font-size: 12px;
          color: #9ca3af;
          margin: 6px 0;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">RotinaAI • Segurança</div>
          <h1>Redefinir senha</h1>
          <p>Um passo rápido para proteger sua conta</p>
        </div>

        <div class="content">
          <p class="greeting">${greeting}</p>
          <p class="description">
            Recebemos um pedido para redefinir sua senha. Clique no botão abaixo para continuar.
            Se você não solicitou, ignore este email.
          </p>

          <div class="box">
            <div class="box-title">Ação rápida</div>
            <p class="box-subtitle">Abra o link e escolha uma nova senha</p>
            <a href="${url}" class="btn">Redefinir senha</a>

            <div class="alt">
              Se o botão não funcionar, copie e cole este link:<br>
              <a href="${url}">${url}</a>
            </div>
          </div>

          <div class="warning">
            <strong>🔒 Segurança:</strong>
            Este link pode expirar. Se necessário, solicite novamente.
          </div>
        </div>

        <div class="footer">
          <p>© 2026 RotinaAI. Todos os direitos reservados.</p>
          <p style="margin-top: 10px; font-size: 11px;">
            Este email foi enviado para <strong>${email}</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default async function SendResetPasswordEmailUrl(
  email: string,
  token: string,
  name?: string,
) {
  try {
    const sentFrom = new Sender(env.SMTP_USERNAME, "RotinaAI");
    const url =
      env.NEXT_PUBLIC_BETTER_AUTH_URL +
      "/auth/forgot-password/change-password?token=" +
      token;
    const html = generateResetPasswordEmailTemplate({ url, email, name });
    const recipients = [new Recipient(email, name)];
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(`✉️ Redefinir senha - RotinaAI`)
      .setHtml(html);

    const sendResult = await mailerSend.email.send(emailParams);
    return {
      success: true,
      message: "Email de redefinição de senha enviado com sucesso",
      data: sendResult,
    };
  } catch (error) {
    console.error("❌ Erro ao enviar email de redefinição de senha:", error);
    return {
      success: false,
      message: "Erro ao enviar email de redefinição de senha",
      error: error,
    };
  }
}
