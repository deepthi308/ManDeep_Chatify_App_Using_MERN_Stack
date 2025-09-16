import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { resendClient, sender } from "../lib/resend.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  console.log(email, name, clientURL);
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome To ManDeep ChatApp",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome email sent successfully", data);
};
