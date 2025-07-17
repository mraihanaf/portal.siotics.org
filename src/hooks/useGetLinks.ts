import { useEffect, useState } from "react";

export function useGetLinks() {
  const [data, setData] = useState<{ whatsapp: string; discord: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/socialLinks", {
          credentials: "include", // send cookies for auth
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError((err as Error)?.message)
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { data, loading, error };
}
