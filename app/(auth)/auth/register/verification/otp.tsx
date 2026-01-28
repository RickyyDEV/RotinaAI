"use server";
import mailerSend from "@/app/lib/smtp";
import { EmailParams, Recipient, Sender } from "mailersend";

// Template HTML para Email de Verificação com Botão
function generateVerificationEmailTemplate(
  verificationLink: string,
  email: string,
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifique seu Email - RotinaAI</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
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
        }
        .header {
          background: linear-gradient(90deg, #2563EB 0%, #7C3AED 100%);
          padding: 40px 20px;
          text-align: center;
        }
        .logo {
          display: inline-block;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          margin-bottom: 16px;
          font-size: 24px;
          line-height: 48px;
          font-weight: bold;
          color: white;
        }
        .header h1 {
          color: white;
          font-size: 28px;
          margin-bottom: 8px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin: 0;
        }
        .content {
          padding: 40px 32px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }
        .description {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .verification-section {
          background: linear-gradient(135deg, #f0f4ff 0%, #f9f5ff 100%);
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          margin: 32px 0;
        }
        .verification-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }
        .verification-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .verification-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 24px;
        }
        .verification-button {
          display: inline-block !important;
          background: linear-gradient(90deg, #2563EB 0%, #7C3AED 100%) !important;
          color: #ffffff !important;
          padding: 14px 40px !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3) !important;
          border: none !important;
          cursor: pointer !important;
          letter-spacing: 0 !important;
        }
        .verification-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4) !important;
        }
        .alternative-text {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .alternative-link {
          color: #2563EB;
          text-decoration: none;
          word-break: break-all;
          font-size: 11px;
        }
        .warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 12px 16px;
          border-radius: 4px;
          margin: 24px 0;
          font-size: 13px;
          color: #92400e;
        }
        .warning strong {
          display: block;
          margin-bottom: 4px;
        }
        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 32px 0;
        }
        .info-box {
          background: #f9fafb;
          padding: 16px;
          border-radius: 8px;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
        }
        .info-box strong {
          color: #111827;
        }
        .footer {
          background: #f9fafb;
          padding: 24px 32px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          font-size: 12px;
          color: #9ca3af;
          margin: 8px 0;
          line-height: 1.5;
        }
        .social-links {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }
        .social-links a {
          display: inline-block;
          margin: 0 12px;
          color: #6b7280;
          text-decoration: none;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✓</div>
          <h1>RotinaAI</h1>
          <p>Organize sua Rotina com IA</p>
        </div>

        <div class="content">
          <p class="greeting">Bem-vindo ao RotinaAI! 🎉</p>
          
          <p class="description">
            Obrigado por se registrar! Clique no botão abaixo para verificar seu email e ativar sua conta. Este link expira em 24 horas.
          </p>

          <div class="verification-section">
            <span class="verification-icon">✉️</span>
            <div class="verification-title">Verifique seu Email</div>
            <p class="verification-subtitle">Confirme seu endereço de email para continuar</p>
            
            <a href="${verificationLink}" class="verification-button">
              Verificar Email Agora
            </a>
            
            <div class="alternative-text">
              Ou copie este link:<br>
              <span class="alternative-link">${verificationLink}</span>
            </div>
          </div>

          <div class="warning">
            <strong>🔒 Segurança:</strong>
            Se você não criou uma conta no RotinaAI, ignore este email.
          </div>

          <div class="divider"></div>

          <div class="info-box">
            <strong>Por que verificar?</strong><br>
            Verificar seu email garante acesso total à sua conta.
          </div>
        </div>

        <div class="footer">
          <p>© 2026 RotinaAI. Todos os direitos reservados.</p>
          <p style="margin-top: 16px; font-size: 11px;">
            Este email foi enviado para <strong>${email}</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default async function SendVerificationEmail(
  email: string,
  name: string,
  verificationLink: string,
) {
  try {
    const sentFrom = new Sender(
      "MS_IAgz7T@test-vz9dlem7qwn4kj50.mlsender.net",
      "RotinaAI",
    );

    const recipients = [new Recipient(email, name)];

    const emailHTML = generateVerificationEmailTemplate(
      verificationLink,
      email,
    );

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(`✉️ Verifique seu Email - RotinaAI`)
      .setHtml(emailHTML);

    const send = await mailerSend.email.send(emailParams);

    return {
      success: true,
      message: "Email de verificação enviado com sucesso",
      data: send,
    };
  } catch (error) {
    console.error("❌ Erro ao enviar email de verificação:", error);
    return {
      success: false,
      message: "Erro ao enviar email de verificação",
      error: error,
    };
  }
}
