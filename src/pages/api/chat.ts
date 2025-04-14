// src/pages/api/chat.ts
import type { APIRoute } from 'astro';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const response = await fetch("https://www.atlist.ai/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: body.messages,
      granted: false,
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
