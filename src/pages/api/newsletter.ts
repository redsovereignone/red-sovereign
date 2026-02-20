import type { APIContext } from "astro";
import type { Runtime } from "@astrojs/cloudflare";

export const prerender = false;

export async function POST(context: APIContext) {
  const origin = new URL(context.request.url).origin;

  try {
    const body = await context.request.json() as { email?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      });
    }

    const { env } = (context.locals as Runtime<{ NEWSLETTER?: KVNamespace }>).runtime;
    const kv = env.NEWSLETTER;

    if (!kv) {
      return new Response(JSON.stringify({ error: "Newsletter service unavailable" }), {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      });
    }

    await kv.put(`subscriber:${email}`, JSON.stringify({
      email,
      subscribedAt: new Date().toISOString(),
    }));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  }
}
