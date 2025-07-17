import nodemailer from "nodemailer"

import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
} as SMTPTransport.Options);


export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    console.log("Sending email", { to, subject, text });
    const info = await transporter.sendMail({
        from: '"Siotics" <no-reply@siotics.org>',
        subject: "Verify your Siotics Portal Account",
        to,
        text
    })
    console.log("Message sent!", info.messageId)
}