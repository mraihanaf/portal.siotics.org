import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "./email";
import db from "@/lib/db";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    onAPIError: {
        errorURL: "/"
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`
            });
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({user, url}) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email",
                text: `Click the link to verify your email: ${url}`
            })
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "consent",
            accessType: "offline",
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
                input: false,
            },
            avatar: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            preferedName: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            grade: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            major: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            gradeParallel: {
                type: "number",
                required: false,
                defaultValue: null
            },
            phone: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            reasonToJoin: {
                type: "string",
                required: false,
                defaultValue: "",
                input: true
            },
            isApplied: {
                type: "boolean",
                required: false,
                defaultValue: false,    
            }
        }
    }
})