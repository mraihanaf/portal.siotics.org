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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { EyeIcon, EyeClosed } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export default function LoginForm(
) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isView, setIsView] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signIn.social({
        provider: "google"
      })
    } catch (err) {
      console.error(err)
      setError("Failed to sign in with Google. Please try again later.")
    } finally {
      setLoading(false)
    }
  } 

  const handleEmailSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const user = await signIn.email({
        email: email,
        password: password
      })
      if(!user.data) return setError("Wrong Email or Password.")
    } catch (err) {
      console.error(err)
      setError("Failed to sign in with Email. Please try again later.")
    } finally {
      setLoading(false)
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
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rai@siotics.org"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/reset-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>
                <div className="relative flex items-center">
  <Input
    id="password"
    type={isView ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="pr-10" // add padding-right to make space for the icon
  />
  <button
    type="button"
    onClick={() => setIsView(!isView)}
    className="absolute right-2 text-gray-500"
  >
    {isView ? (
      <EyeIcon className="w-5 h-5" />
    ) : (
      <EyeClosed className="w-5 h-5" />
    )}
  </button>
</div>

                
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading} onClick={handleEmailSignIn}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
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
