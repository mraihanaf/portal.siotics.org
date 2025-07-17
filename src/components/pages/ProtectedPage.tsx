
"use client";
import { useSession } from "@/lib/auth-client";
import Spinner from "@/components/ui/Spinner";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/pages/ErrorPage";

export default function ProtectedPage({ children }: { children: React.ReactNode}) {
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

    if(!data) return redirect("/sign-in")
    
    if(data) return children
}