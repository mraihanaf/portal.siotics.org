"use client"
import { useSession, signOut, sendVerificationEmail } from "@/lib/auth-client"
import { useState } from "react"
import ProtectedPage from "@/components/pages/ProtectedPage"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VerifyPage() {
    const { data } = useSession()
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleResend = async () => {
        setLoading(true)
        try {
            await sendVerificationEmail({ email: data?.user.email as string })
            setSuccessMessage("Verification email sent successfully.")
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000)
        } catch (err) {
            console.error(err)
        } finally {
        setLoading(false)
        }
    }

    return (
        <ProtectedPage>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-lg">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Verify your email</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p>
                                We{`'`}ve sent a verification link to your email address (<span className="font-bold">{data?.user.email}</span>). Please check your inbox and click the link to verify your account.
                            </p>
                            <p className="my-4">
                                Didn{`'`}t receive the email? Check your spam folder or click the button below to resend.
                            </p>
                            {successMessage && (
                                <p className="text-green-600 my-2 text-center">{successMessage}</p>
                            )}
                            <Button className="w-full my-3" onClick={handleResend} disabled={loading}>
                                {loading ? "Sending..." : "Resend Verification Email"}
                            </Button>
                            <p className="text-center my-3">
                                Want to try a different account?{" "}
                                <span
                                    onClick={async () => await signOut()}
                                    className="font-bold underline cursor-pointer"
                                >
                                    Back to Sign In
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ProtectedPage>
    )
}
