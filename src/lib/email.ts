import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY!,
});
  
const sentFrom = new Sender("no-reply@siotics.org")

// const transporter = nodemailer.createTransport({
// 	host: process.env.SMTP_HOST,
// 	port: Number(process.env.SMTP_PORT),
// 	secure: false, // true for 465, false for other ports
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASS,
// 	},
// } as SMTPTransport.Options);


export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo([new Recipient(to)])
        .setSubject(subject)
        .setText(text)
    try {
        await mailerSend.email.send(emailParams)
    } catch (err) {
        console.error(err)
    }
}