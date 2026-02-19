import type { APIContext } from "astro";

export const prerender = false;

export async function POST(context: APIContext) {
  const origin = new URL(context.request.url).origin;

  try {
    const body = await context.request.json();
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

    const { env } = context.locals.runtime as { env: { NEWSLETTER: KVNamespace } };

    await env.NEWSLETTER.put(`subscriber:${email}`, JSON.stringify({
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
