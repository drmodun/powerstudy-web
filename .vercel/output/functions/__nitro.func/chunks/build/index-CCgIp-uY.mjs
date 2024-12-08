import { jsx, jsxs } from 'react/jsx-runtime';
import { e as eventHandler, W, S as Se, L as Le, f as ft, T as Te, d as dt, M as M$1 } from '../nitro/nitro.mjs';
import w from 'tiny-invariant';
import { useRouter, defaultTransformer, isRedirect, isNotFound, isPlainObject, encode } from '@tanstack/react-router';
import * as v from 'node:fs';
import * as y from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:async_hooks';
import 'jsesc';
import 'isbot';
import 'react-dom/server';
import '@tanstack/react-cross-context';

function g(e, n) {
  const t = n || e || {};
  return typeof t.method > "u" && (t.method = "GET"), { options: t, middleware: (r) => g(void 0, Object.assign(t, { middleware: r })), validator: (r) => g(void 0, Object.assign(t, { validator: r })), handler: (...r) => {
    const [o, s] = r;
    Object.assign(t, { ...o, extractedFn: o, serverFn: s }), w(o.url, "createServerFn must be called with a function that is marked with the 'use server' pragma. Are you using the @tanstack/start-vite-plugin ?");
    const a = [...t.middleware || [], ne(t)];
    return Object.assign(async (i) => j(a, "client", { ...o, method: t.method, data: i == null ? void 0 : i.data, headers: i == null ? void 0 : i.headers, context: Object.assign({}, o) }).then((d) => d.result), { ...o, __executeServer: (i) => {
      const d = i instanceof FormData ? Z(i) : i;
      return j(a, "server", { ...o, ...d }).then((c) => ({ result: c.result, context: c.sendContext }));
    } });
  } };
}
function Z(e) {
  const n = e.get("__TSR_CONTEXT");
  if (e.delete("__TSR_CONTEXT"), typeof n != "string") return { context: {}, data: e };
  try {
    return { context: defaultTransformer.parse(n), data: e };
  } catch {
    return { data: e };
  }
}
function ee(e) {
  const n = [], t = (r) => {
    r.forEach((o) => {
      o.options.middleware && t(o.options.middleware), n.push(o);
    });
  };
  return t(e), n;
}
const _ = (e, n, t) => e({ data: n.data, context: n.context, sendContext: n.sendContext, method: n.method, next: (r) => {
  var _a, _b;
  const o = { ...n.context, ...r == null ? void 0 : r.context }, s = { ...n.sendContext, ...(_a = r == null ? void 0 : r.sendContext) != null ? _a : {} }, a = M$1(n.headers, r == null ? void 0 : r.headers);
  return t({ method: n.method, data: n.data, context: o, sendContext: s, headers: a, result: (_b = r == null ? void 0 : r.result) != null ? _b : n.result });
} });
function te(e, n) {
  if (e == null) return {};
  if ("~standard" in e) {
    const t = e["~standard"].validate(n);
    if (t instanceof Promise) throw new Error("Async validation not supported");
    if (t.issues) throw new Error(JSON.stringify(t.issues, void 0, 2));
    return t.value;
  }
  if ("parse" in e) return e.parse(n);
  if (typeof e == "function") return e(n);
  throw new Error("Invalid validator type!");
}
async function j(e, n, t) {
  const r = ee(e), o = async (s) => {
    const a = r.shift();
    if (!a) return s;
    a.options.validator && (n !== "client" || a.options.validateClient) && (s.data = await te(a.options.validator, s.data));
    const i = n === "client" ? a.options.client : a.options.server;
    return i ? _(i, s, async (d) => {
      if (n === "client" && a.options.clientAfter) {
        const c = await o(d);
        return _(a.options.clientAfter, c, (f) => f);
      }
      return o(d);
    }) : o(s);
  };
  return o({ ...t, headers: t.headers || {}, sendContext: t.sendContext || {}, context: t.context || {} });
}
function ne(e) {
  return { _types: void 0, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: n, sendContext: t, ...r }) => {
    var o;
    const s = await ((o = e.extractedFn) == null ? void 0 : o.call(e, { ...r, context: t }));
    return n(s);
  }, server: async ({ next: n, ...t }) => {
    var r;
    const o = await ((r = e.serverFn) == null ? void 0 : r.call(e, t));
    return n({ result: o });
  } } };
}
async function re(e, n, t) {
  var r;
  const o = n[0];
  if (isPlainObject(o) && o.method) {
    const c = o, f = c.data instanceof FormData ? "formData" : "payload", u = new Headers({ ...f === "payload" ? { "content-type": "application/json", accept: "application/json" } : {}, ...c.headers instanceof Headers ? Object.fromEntries(c.headers.entries()) : c.headers || {} });
    if (c.method === "GET") {
      const v = encode({ payload: defaultTransformer.stringify({ data: c.data, context: c.context }) });
      v && (e += `&${v}`);
    }
    const l = new Request(e, { method: c.method, headers: u, ...oe(c) }), m = await t(l), h = await O(m);
    if ((r = h.headers.get("content-type")) != null && r.includes("application/json")) {
      const v = await h.text(), y = v ? defaultTransformer.parse(v) : void 0;
      if (isRedirect(y) || isNotFound(y)) throw y;
      return y;
    }
    return h;
  }
  const s = new Request(e, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(n) }), a = await O(await t(s)), i = a.headers.get("content-type"), d = await a.text();
  return i && i.includes("application/json") ? d ? JSON.parse(d) : void 0 : d;
}
function oe(e) {
  var _a;
  return e.method === "POST" ? e.data instanceof FormData ? (e.data.set("__TSR_CONTEXT", defaultTransformer.stringify(e.context)), { body: e.data }) : { body: defaultTransformer.stringify({ data: (_a = e.data) != null ? _a : null, context: e.context }) } : {};
}
async function O(e) {
  if (!e.ok) {
    const n = e.headers.get("content-type"), t = n && n.includes("application/json"), r = await (async () => t ? await e.json() : await e.text())(), o = `Request failed with status ${e.status}`;
    throw t ? new Error(JSON.stringify({ message: o, body: r })) : new Error([o, `${JSON.stringify(r, null, 2)}`].join(`

`));
  }
  return e;
}
function ae(e) {
  return e.replace(/^\/|\/$/g, "");
}
function se(e, n, t) {
  return `${e}/${ae("/_server")}/?_serverFnId=${encodeURI(n)}&_serverFnName=${encodeURI(t)}`;
}
eventHandler(ie);
async function ie(e) {
  return C(Se(e));
}
async function C(e, n) {
  var t, r;
  const o = e.method, s = new URL(e.url, "http://localhost:3000"), a = Object.fromEntries(s.searchParams.entries()), i = a._serverFnId, d = a._serverFnName;
  if (!i || !d) throw new Error("Invalid request");
  w(typeof i == "string", "Invalid server action");
  const c = (r = await ((t = Le("server").chunks[i]) == null ? void 0 : t.import())) == null ? void 0 : r[d], f = await (async () => {
    try {
      const u = await (async () => {
        var m;
        if ((m = e.headers.get("Content-Type")) != null && m.includes("multipart/form-data")) return w(o.toLowerCase() !== "get", "GET requests with FormData payloads are not supported"), await e.formData();
        if (o.toLowerCase() === "get") return a.payload ? defaultTransformer.parse(a.payload) : void 0;
        const h = await e.text();
        return defaultTransformer.parse(h);
      })(), l = await c(u);
      return l instanceof Response ? l : isRedirect(l) || isNotFound(l) ? S(l) : new Response(l !== void 0 ? defaultTransformer.stringify(l) : void 0, { status: ft(Te()), headers: { "Content-Type": "application/json" } });
    } catch (u) {
      return u instanceof Response ? u : isRedirect(u) || isNotFound(u) ? S(u) : (console.error("Server Fn Error!"), console.error(u), console.info(), new Response(JSON.stringify(u), { status: 500, headers: { "Content-Type": "application/json" } }));
    }
  })();
  if (f.headers.get("Content-Type") === "application/json") {
    const l = await f.clone().text();
    l && JSON.stringify(JSON.parse(l));
  }
  return f;
}
function S(e) {
  const { headers: n, ...t } = e;
  return new Response(JSON.stringify(t), { status: 200, headers: { "Content-Type": "application/json", ...e.headers || {} } });
}
const F = "http://localhost:3000";
function E(e, n, t) {
  const r = se(F, n, t);
  return Object.assign((...s) => (w(s.length === 1, "Server functions can only accept a single argument"), re(r, s, async (a) => {
    const i = Te(), d = dt(i);
    return Object.entries(d).forEach(([c, f]) => {
      a.headers.has(c) || a.headers.append(c, f);
    }), C(a);
  })), { url: r.replace(F, ""), filename: n, functionId: t });
}
function ce(...e) {
  return twMerge(clsx(e));
}
const de = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", { variants: { variant: { default: "bg-primary text-primary-foreground shadow hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90", outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-9 px-4 py-2", sm: "h-8 rounded-md px-3 text-xs", lg: "h-10 rounded-md px-8", icon: "h-9 w-9" } }, defaultVariants: { variant: "default", size: "default" } }), N = y.forwardRef(({ className: e, variant: n, size: t, asChild: r = false, ...o }, s) => jsx(r ? Slot : "button", { className: ce(de({ variant: n, size: t, className: e })), ref: s, ...o }));
N.displayName = "Button";
const $ = "count.txt";
async function I() {
  return parseInt(await v.promises.readFile($, "utf-8").catch(() => "0"));
}
const J = g({ method: "GET" }).handler(E(ue, "c_1h7ajdd", "$$function0"), () => I()), M = g({ method: "POST" }).validator((e) => e).handler(E(le, "c_1h7ajdd", "$$function1"), async ({ data: e }) => {
  const n = await I();
  await v.promises.writeFile($, `${n + e}`);
}), Re = function() {
  const n = useRouter(), t = W.useLoaderData();
  return jsxs(N, { variant: "outline", onClick: () => {
    M({ data: 1 }).then(() => {
      n.invalidate();
    });
  }, children: ["Add 1 to ", t, "?"] });
}, Ce = async () => await J();
function ue(e) {
  return J.__executeServer(e);
}
function le(e) {
  return M.__executeServer(e);
}

export { ue as $$function0, le as $$function1, Re as component, Ce as loader };
//# sourceMappingURL=index-CCgIp-uY.mjs.map
