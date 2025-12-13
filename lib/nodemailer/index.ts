import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./template";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,

    }
})

// helper function to send the email using transporter

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace("{{name}}", name)
    .replace("{{intro}}", intro);

    const mailOptions = {
        from: `"InsightTicker" <insightticker@gmail.com>`,
        to: email,
        subject: `Welcome to InsightTicker - your stock market toolkit is ready!`,
        text: "Thanks for joining InsightTicker",
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions)

}