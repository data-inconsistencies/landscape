// Google Analytics for the public site, only after the visitor allows analytics in the CookieHub banner.
// Added to the page by scripts/add_analytics.py. Tests: tests/analytics.test.mjs. Events: intent/spec.md.
export const HOST = "data-inconsistencies.github.io";
export const GA_ID = "G-GV8QDDVB6Q"; // the same property as the main site
const COOKIEHUB = "https://cdn.cookiehub.eu/c2/9df5f782.js";
const SITE = `https://${HOST}/landscape/`;
const SOCIAL = /(^|\.)(x|twitter|linkedin|youtube|facebook|instagram|discord|slack)\.com$/;

const parse = (url, base) => { try { return new URL(url, base); } catch { return null; } };

// What the visitor is looking at, from the address and the data in the page (window.baseDS).
export function currentView(href, data) {
  const url = new URL(href);
  const item = data.items.find((i) => i.id === url.searchParams.get("item"));
  const group = data.groups?.find((g) => g.normalized_name === url.searchParams.get("group")) ?? data.groups?.[0];
  return {
    item: item?.name ?? "", category: item?.category ?? "", subcategory: item?.subcategory ?? "",
    group: group?.name ?? "", page: url.pathname.replace(/^\/landscape\/?/, "").split("/")[0] || "explore",
  };
}

function linkType(url, hasItem) {
  if (url.hostname === HOST) return "main site";
  if (/(^|\.)github\.com$/.test(url.hostname)) return "github";
  if (SOCIAL.test(url.hostname)) return "social";
  return hasItem ? "website" : "other";
}

export function outboundClick(link, href, data) {
  const url = parse(link);
  if (!url || !/^https?:$/.test(url.protocol)) return null;
  if (url.href.startsWith(SITE) || url.href === SITE.slice(0, -1)) return null;
  const { item, category, subcategory, group, page } = currentView(href, data);
  return {
    name: "landscape_click",
    params: { link_url: link, link_type: linkType(url, item !== ""),
              item, category, subcategory, group, page },
  };
}

export function itemOpen(href, data) {
  const { item, category, subcategory, group } = currentView(href, data);
  return item ? { name: "item_open", params: { item, category, subcategory, group } } : null;
}

export function start(win = window, doc = document) {
  if (win.location.hostname !== HOST) return;
  const data = win.baseDS;
  let loaded = false;
  let allowed = false;
  let lastItem = "";

  const addScript = (src, onload) => doc.head.append(Object.assign(doc.createElement("script"), { src, async: true, onload }));
  function gtag() { win.dataLayer.push(arguments); } // must be `arguments`: gtag.js ignores arrays
  const send = (event) => { if (allowed && event) gtag("event", event.name, event.params); };

  function allow(category) {
    if (category !== "analytics") return;
    allowed = true;
    win[`ga-disable-${GA_ID}`] = false;
    if (loaded) return;
    loaded = true;
    win.dataLayer = win.dataLayer ?? [];
    gtag("js", new Date());
    gtag("set", { cookie_flags: "SameSite=None;Secure" });
    gtag("config", GA_ID);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    opened();
  }
  function revoke(category) {
    if (category !== "analytics") return;
    allowed = false;
    win[`ga-disable-${GA_ID}`] = true;
  }

  function opened() {
    const event = allowed ? itemOpen(win.location.href, data) : null;
    const item = event?.params.item ?? "";
    if (item !== lastItem) send(event);
    lastItem = item;
  }

  // Capture phase: landscape2 links stop the event from bubbling.
  const clicked = (e) => {
    const link = e.target?.closest?.("a[href]");
    if (link) send(outboundClick(link.href, win.location.href, data));
  };
  doc.addEventListener("click", clicked, true);
  doc.addEventListener("auxclick", clicked, true); // middle click
  const open = win.open; // landscape2 also has buttons that open links
  win.open = function (url, ...rest) {
    send(outboundClick(String(url), win.location.href, data));
    return open.call(win, url, ...rest);
  };

  for (const method of ["pushState", "replaceState"]) {
    const original = win.history[method];
    win.history[method] = function (...args) {
      const result = original.apply(win.history, args);
      opened();
      return result;
    };
  }
  win.addEventListener("popstate", opened);

  addScript(COOKIEHUB, () => {
    // The CookieHub account has the old domain, and a cookie for another domain is not saved.
    if (win.__cookiehub?.settings?.general) win.__cookiehub.settings.general.domain = HOST;
    // CookieHub announces onAllow once per page for a category, not again after onRevoke: onStatusChange fills the gap.
    const changed = () => (win.cookiehub.hasConsented("analytics") === true ? allow : revoke)("analytics");
    const load = () => win.cookiehub.load({ onAllow: allow, onRevoke: revoke, onStatusChange: changed });
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", load);
    else load();
  });
}

if (typeof window !== "undefined" && typeof document !== "undefined") start();
