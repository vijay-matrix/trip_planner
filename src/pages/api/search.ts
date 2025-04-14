// src/pages/api/search.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const response = await fetch("https://www.atlist.ai/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: body.q,  // The query term (location or keyword)
      location: body.location, // Specific location (could be dynamic)
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
