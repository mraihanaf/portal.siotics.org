import SignInForm from "@/components/layouts/SignInForm";
import AuthPage from "@/components/pages/AuthPage";

export default function SignInPage() {
  return (
    <AuthPage>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
    </AuthPage>
  );
}