"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { signIn } from "@/lib/auth-client"

export default function LoginForm(
) {
  
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    // setLoading(true)
    setError(null)
    try {
      await signIn.social({
        provider: "google"
      })
    } catch (err) {
      console.error(err)
      setError("Failed to sign in with Google. Please try again later.")
    } finally {
      // setLoading(false)
    }
  } 


  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Be part of State Vocational High School 1 Jakarta{"'"}s coolest tech club.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <Image
                    src={"/assets/google-icon.svg"}
                    width={18}
                    height={18}
                    alt="Google Icon"
                  />
                  <span className="ml-2">Login with Google</span>
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
