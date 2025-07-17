import SignUpForm from "@/components/layouts/SignUpForm";
import AuthPage from "@/components/pages/AuthPage";

export default function SignUpPage() {
  return (
    <AuthPage>
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
    </AuthPage>
  );
}