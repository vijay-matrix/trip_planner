import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_Dw3hxeso.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/matrixm/tripplanner/","cacheDir":"file:///Users/matrixm/tripplanner/node_modules/.astro/","outDir":"file:///Users/matrixm/tripplanner/dist/","srcDir":"file:///Users/matrixm/tripplanner/src/","publicDir":"file:///Users/matrixm/tripplanner/public/","buildClientDir":"file:///Users/matrixm/tripplanner/dist/","buildServerDir":"file:///Users/matrixm/tripplanner/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/places","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/places\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"places","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/places.ts","pathname":"/api/places","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.ts","pathname":"/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.mtnPcHx8.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/matrixm/tripplanner/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/api/places@_@ts":"pages/api/places.astro.mjs","\u0000@astro-page:src/pages/api/search@_@ts":"pages/api/search.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cqbq1n13.mjs","/Users/matrixm/tripplanner/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CpanJMyY.mjs","/Users/matrixm/tripplanner/src/components/Welcome.astro?astro&type=script&index=0&lang.ts":"_astro/Welcome.astro_astro_type_script_index_0_lang.D5t3d1Xm.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/matrixm/tripplanner/src/components/Welcome.astro?astro&type=script&index=0&lang.ts","const m=document.getElementById(\"chat-form\"),c=document.getElementById(\"chat-output\");m.addEventListener(\"submit\",async t=>{t.preventDefault();const r=t.target.message.value.trim();if(r){c.innerHTML='<p class=\"text-gray-500\">Loading...</p>';try{const o=await(await fetch(\"/api/chat\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({messages:[{role:\"user\",content:r}]})})).json();c.innerHTML=u(o),p(o.data)}catch(s){c.innerHTML='<p class=\"text-red-600\">Failed to fetch response.</p>',console.error(s)}t.target.reset()}});function u(t){if(!t||!t.data)return'<p class=\"text-gray-500\">No results found.</p>';const r=`\n\t\t\t<div class=\"bg-white p-6 rounded-xl shadow\">\n\t\t\t  <h2 class=\"text-2xl font-bold\">${t.name}</h2>\n\t\t\t  <h3 class=\"text-lg text-gray-600 mt-1\">${t.subtitle}</h3>\n\t\t\t  <p class=\"mt-4 text-gray-700\">${t.summary}</p>\n\t\t\t  <p class=\"mt-2 text-sm text-gray-500\">${t.location.city}, ${t.location.region}, ${t.location.country}</p>\n\t\t\t</div>\n\t\t  `,s=t.data.reduce((a,n)=>(a[n.group_name]||(a[n.group_name]=[]),a[n.group_name].push(n),a),{});let o=0;const e=Object.entries(s).map(([a,n])=>{const i=n.map(l=>{const d=`place-card-${o++}`;return l.__cardId=d,`\n\t\t\t\t  <div id=\"${d}\" class=\"bg-white p-4 rounded-lg shadow border border-gray-100 relative\">\n\t\t\t\t\t<h4 class=\"text-lg font-semibold\">${l.name}</h4>\n\t\t\t\t\t<p class=\"text-gray-700 text-sm mt-1\">${l.description}</p>\n\t\t\t\t\t<p class=\"text-xs text-gray-500 mt-2\">${l.address}</p>\n\t\t\t\t\t<div class=\"text-gray-400 text-sm mt-2 italic\">Loading details...</div>\n\t\t\t\t  </div>\n\t\t\t\t`}).join(\"\");return`\n\t\t\t\t<div>\n\t\t\t\t  <h3 class=\"text-xl font-semibold mt-6 mb-4\">${a}</h3>\n\t\t\t\t  <div class=\"grid md:grid-cols-2 gap-4\">${i}</div>\n\t\t\t\t</div>\n\t\t\t  `}).join(\"\");return`${r}<div>${e}</div>`}async function p(t){for(const r of t)g(r)}async function g(t){const r=document.getElementById(t.__cardId);if(r)try{const s=await fetch(\"/api/places\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({name:t.name,lat:t.lat,lng:t.lng})});if(!s.ok){let i=`Error ${s.status}`;try{i=(await s.json())?.error||i}catch{}console.warn(`Skipping ${t.name} due to error:`,i),r.querySelector(\".italic\")?.remove();return}const o=await s.json(),e=o?.data?.result?.results;if(!e){r.querySelector(\".italic\")?.remove();return}const a=`${o?.data?.result?.url}`,n=`\n\t\t\t\t\t<div class=\"mt-4 border-t pt-3 space-y-2\">\n\t\t\t\t\t\t${e.thumbnail?`\n\t\t\t\t\t\t\t<img \n\t\t\t\t\t\t\t\tsrc=\"${e.thumbnail}\" \n\t\t\t\t\t\t\t\talt=\"${e.title}\" \n\t\t\t\t\t\t\t\tclass=\"rounded-lg mb-2\" \n\t\t\t\t\t\t\t\tonerror=\"this.style.display='none'\" \n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t`:\"\"}\n\t\t\t\t\t\t<p class=\"text-sm text-gray-700\">${e.description||e.editorial_summary?.overview||\"\"}</p>\n\t\t\t\t\t\t${e.rating?`<p class=\"text-sm text-yellow-600\">⭐ ${e.rating} (${e.reviews||e.user_ratings_total} reviews)</p>`:\"\"}\n\t\t\t\t\t\t${e.website?`<a href=\"${e.website}\" target=\"_blank\" class=\"text-blue-600 underline text-sm block\">Official Website</a>`:\"\"}\n\t\t\t\t\t\t${e.phone?`<p class=\"text-sm text-gray-600\">📞 ${e.phone}</p>`:\"\"}\n\t\t\t\t\t\t${e.open_state?`<p class=\"text-sm text-gray-600\">🕒 ${e.open_state}</p>`:\"\"}\n\t\t\t\t\t\t<a href=\"${a}\" target=\"_blank\" class=\"text-sm text-blue-500 underline\">📍 Open in Google Maps</a>\n\t\t\t\t\t</div>\n\t\t\t\t`;r.querySelector(\".italic\")?.remove(),r.innerHTML+=n}catch(s){console.error(`Failed to enrich ${t.name}:`,s),r.querySelector(\".italic\")?.remove()}}"]],"assets":["/_astro/index.mtnPcHx8.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"b3sR9my0p3HaiCo2LRNNXiqPNHNse+yMwVvEhJWECKU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
