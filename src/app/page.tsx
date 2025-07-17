"use client";
import { useEffect, useState } from "react";
import IntroCard from "@/components/layouts/IntroCard";
import ApplicationFormCard from "@/components/layouts/ApplicationFormCard";
import ProtectedPage from "@/components/pages/ProtectedPage";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

enum AppState {
  INTRO,
  APPLICATION,
}

export default function ApplicationPage() {
  const [appState, setAppState] = useState(AppState.INTRO);
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.isApplied) {
      redirect("/home");
    }
  }, [session.data?.user.isApplied]);

  return (
    <ProtectedPage>
      <div className="flex items-center justify-center min-h-screen">
        {appState === AppState.INTRO
          ? <IntroCard toNextPage={() => setAppState(AppState.APPLICATION)} />
          : <ApplicationFormCard toBackPage={() => setAppState(AppState.INTRO)} />}
      </div>
    </ProtectedPage>
  );
}
