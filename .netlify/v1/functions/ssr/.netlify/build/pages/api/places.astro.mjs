export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.name || typeof body.lat !== "number" || typeof body.lng !== "number") {
      return new Response(
        JSON.stringify({ error: "Invalid request body. Expected name, lat, and lng." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const response = await fetch("https://www.atlist.ai/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        lat: body.lat,
        lng: body.lng
      })
    });
    if (!response.ok) {
      const errorData = await response.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch from Atlist API.", details: errorData }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Server error in /api/places:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
