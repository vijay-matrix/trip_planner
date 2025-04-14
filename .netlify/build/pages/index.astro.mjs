import { e as createComponent, i as renderHead, j as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, k as renderSlot, l as renderComponent } from '../chunks/astro/server_Dw3hxeso.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Welcome = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><title>Location finder – AI Chat</title>${renderHead()}</head> <body class="bg-gray-100 text-gray-900 min-h-screen p-6"> <main class="max-w-4xl mx-auto space-y-12"> <h1 class="text-3xl font-bold mb-4 text-center">🧠 AI Location Finder</h1> <!-- Chat Form --> <section class="bg-white p-6 rounded-xl shadow"> <form id="chat-form" class="space-y-4"> <input type="text" name="message" placeholder="Ask about North India..." class="w-full p-3 border border-gray-300 rounded-lg" required> <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
Send
</button> </form> </section> <!-- Chat Response Display --> <section id="chat-output" class="space-y-8"></section> </main> ${renderScript($$result, "/Users/matrixm/tripplanner/src/components/Welcome.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/matrixm/tripplanner/src/components/Welcome.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Map your Location</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/matrixm/tripplanner/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Welcome", $$Welcome, {})} ` })}`;
}, "/Users/matrixm/tripplanner/src/pages/index.astro", void 0);

const $$file = "/Users/matrixm/tripplanner/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
