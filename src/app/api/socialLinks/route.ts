import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const links = {
    whatsapp: process.env.WHATSAPP_GROUP_LINK,
    discord: process.env.DISCORD_SERVER_LINK,
  };

  return new Response(JSON.stringify(links), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
