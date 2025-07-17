
"use client";
import { useSession } from "@/lib/auth-client";
import Spinner from "@/components/ui/Spinner";
import ErrorPage from "@/components/pages/ErrorPage";
import { redirect } from "next/navigation";

export default function AuthPage({ children }: { children: React.ReactNode}) {
    const { data, isPending, error } = useSession();
    if(isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner></Spinner>
            </div>
        )
    }
    
    if(error) {
        return <ErrorPage />
    }

    if(data) return redirect("/")
    
    if(!data) return children
}