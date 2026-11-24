import test from "node:test";
import assert from "node:assert/strict";
import { GA_ID, HOST, currentView, itemOpen, outboundClick, start } from "../analytics/analytics.mjs";

const data = {
  groups: [{ name: "SQL Tab", normalized_name: "sql-tab" }, { name: "Analytics Tab", normalized_name: "analytics-tab" }],
  items: [{ id: "compute--query--trino", name: "Trino", category: "Compute", subcategory: "Query" }],
};
const base = `https://${HOST}/landscape/`;

test("an outbound link in an item says which item, layer and tab", () => {
  const event = outboundClick("https://github.com/trinodb/trino", `${base}?group=analytics-tab&item=compute--query--trino`, data);
  assert.deepEqual(event, {
    name: "landscape_click",
    params: { link_url: "https://github.com/trinodb/trino", link_type: "github", item: "Trino", category: "Compute",
              subcategory: "Query", group: "Analytics Tab", page: "explore" },
  });
});

test("link types", () => {
  const type = (url, page = `${base}?item=compute--query--trino`) => outboundClick(url, page, data).params.link_type;
  assert.equal(type("https://trino.io/"), "website");
  assert.equal(type("https://github.com/trinodb/trino"), "github");
  assert.equal(type("https://x.com/trinodb"), "social");
  assert.equal(type("https://www.youtube.com/@datainconsistencies"), "social");
  assert.equal(type("https://landscape.cncf.io", base), "other");
});

test("links outside an item have no item", () => {
  const { params } = outboundClick("https://landscape.cncf.io", `${base}guide`, data);
  assert.equal(params.item, "");
  assert.equal(params.page, "guide");
  assert.equal(params.group, "SQL Tab", "the first tab is the default");
});

test("only links to other sites count, the main site included", () => {
  assert.equal(outboundClick(`${base}guide`, base, data), null);
  assert.equal(outboundClick("mailto:someone@example.com", base, data), null);
  assert.equal(outboundClick("javascript:void(0)", base, data), null);
  assert.equal(outboundClick("not a url", base, data), null);
  assert.equal(outboundClick(`https://${HOST}/rankings/`, base, data).params.link_type, "main site");
});

test("opening an item, and an item that is not in the data", () => {
  assert.deepEqual(itemOpen(`${base}?item=compute--query--trino`, data).params,
    { item: "Trino", category: "Compute", subcategory: "Query", group: "SQL Tab" });
  assert.equal(itemOpen(base, data), null);
  assert.equal(itemOpen(`${base}?item=nope`, data), null);
  assert.equal(currentView(`${base}stats`, data).page, "stats");
});

// A tiny browser: enough to check that nothing is loaded or sent without consent.
function fakeBrowser({ host = HOST } = {}) {
  const scripts = [], listeners = {};
  const win = {
    location: { hostname: host, href: `https://${host}/landscape/` }, baseDS: data, open: () => null,
    history: { pushState() {}, replaceState() {} }, addEventListener: (name, fn) => (listeners[name] = fn),
    __cookiehub: { settings: { general: { domain: "old.example" } } },
    cookiehub: { load(config) { win.consent = config; }, hasConsented: () => win.allowed === true },
  };
  const doc = {
    readyState: "complete", addEventListener: (name, fn) => (listeners[name] = fn),
    createElement: () => ({}), head: { append: (s) => { scripts.push(s.src); s.onload?.(); } },
  };
  const click = (href) => listeners.click({ target: { closest: () => ({ href }) } });
  const sent = () => (win.dataLayer ?? []).map((a) => [...a]).filter((a) => a[0] === "event").map((a) => a[1]);
  const ga = () => scripts.filter((s) => s.includes("googletagmanager"));
  return { win, doc, click, sent, ga, scripts };
}

test("nothing is loaded anywhere but the public site", () => {
  const b = fakeBrowser({ host: "localhost" });
  start(b.win, b.doc);
  assert.deepEqual(b.scripts, []);
});

test("Google Analytics waits for consent, then works, and stops when consent is withdrawn", () => {
  const b = fakeBrowser();
  start(b.win, b.doc);
  assert.equal(b.ga().length, 0);
  b.click("https://trino.io/");
  assert.deepEqual(b.sent(), [], "a click before consent is not recorded");

  b.win.consent.onAllow("marketing");
  assert.equal(b.ga().length, 0, "other consent is not analytics consent");
  b.win.consent.onAllow("analytics");
  b.win.consent.onAllow("analytics");
  assert.deepEqual(b.ga(), [`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`], "loaded once");
  b.click("https://trino.io/");
  assert.deepEqual(b.sent(), ["landscape_click"]);

  b.win.consent.onRevoke("analytics");
  assert.equal(b.win[`ga-disable-${GA_ID}`], true);
  b.click("https://trino.io/");
  assert.deepEqual(b.sent(), ["landscape_click"]);
  b.win.consent.onAllow("analytics");
  assert.equal(b.win[`ga-disable-${GA_ID}`], false);
});

test("the consent cookie is set for the site it is on", () => {
  const b = fakeBrowser();
  start(b.win, b.doc);
  assert.equal(b.win.__cookiehub.settings.general.domain, HOST);
});

test("buttons that call window.open and item opens are recorded, and the app still gets its calls", () => {
  const b = fakeBrowser();
  const opened = [], pushed = [];
  b.win.open = (...a) => opened.push(a);
  b.win.history.replaceState = (...a) => { pushed.push(a); b.win.location.href = a[2]; };
  start(b.win, b.doc);
  b.win.consent.onAllow("analytics");
  b.win.open("https://trino.io/", "_blank");
  b.win.history.replaceState({}, "", `${base}?item=compute--query--trino`);
  b.win.history.replaceState({}, "", `${base}?item=compute--query--trino&x=1`);
  assert.deepEqual(opened, [["https://trino.io/", "_blank"]]);
  assert.equal(pushed.length, 2);
  assert.deepEqual(b.sent(), ["landscape_click", "item_open"], "one open per item");
});
