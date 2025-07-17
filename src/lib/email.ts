export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    console.log("Sending email", { to, subject, text });
    // Here you would implement the actual email sending logic
    // For example, using a service like SendGrid, Nodemailer, etc.
}