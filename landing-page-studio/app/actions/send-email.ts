"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: "Studio <onboarding@resend.dev>",
      to: "victorfneves99@gmail.com",
      subject: `Novo contato de ${name}`,
      replyTo: email,
      html: `
        <h2>Novo contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao enviar email");
  }
}
