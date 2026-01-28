import { env } from "@/env";
import { MailerSend } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: env.SMTP_TOKEN,
});

export default mailerSend;
