import AuthPage from "@/components/pages/AuthPage";
import ResetForm from "@/components/layouts/ResetForm";

export default function ResetPage() {
    return (
        <AuthPage>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm">
                <ResetForm></ResetForm>
            </div>
        </div>
        </AuthPage>
    )
}