import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("keeps the brand logo on a stable public asset URL", async () => {
  const assetNames = await readdir(new URL("../dist/client/assets/", import.meta.url));
  const scripts = assetNames.filter((name) => name.endsWith(".js"));
  const bundles = await Promise.all(scripts.map((name) => readFile(new URL(`../dist/client/assets/${name}`, import.meta.url), "utf8")));
  const logo = await readFile(new URL("../dist/client/assets/ali-babaei-logo-v2.png", import.meta.url));

  assert.ok(bundles.some((bundle) => bundle.includes("/assets/ali-babaei-logo-v2.png")));
  assert.ok(bundles.every((bundle) => !bundle.includes("ali-babaei-logo-fj5Ez689.png")));
  assert.deepEqual(logo.subarray(1, 4).toString("ascii"), "PNG");
});

test("keeps the English About logo prominent above the intro", async () => {
  const stylesheet = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");

  assert.match(stylesheet, /\.about-logo\{width:128px;height:128px/);
  assert.match(stylesheet, /\.about-logo\{width:96px;height:96px/);
});

test("ships the temporary home hero artwork as a stable asset", async () => {
  const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
  const stylesheet = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const artwork = await readFile(new URL("../dist/client/assets/hero-artwork-trial.jpg", import.meta.url));

  assert.match(app, /className="hero-artwork" src="\/assets\/hero-artwork-trial\.jpg"/);
  assert.match(stylesheet, /\.hero-artwork\{display:block;width:clamp\(220px,22vw,360px\)/);
  assert.deepEqual(artwork.subarray(0, 3), Buffer.from([0xff, 0xd8, 0xff]));
});

test("keeps the shared footer governed by documented design tokens", async () => {
  const tokens = await readFile(new URL("../src/design-tokens.css", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
  const staticStyles = await readFile(new URL("../public/css/style.css", import.meta.url), "utf8");
  const designSystem = await readFile(new URL("../docs/design-system.md", import.meta.url), "utf8");
  const contentModel = await readFile(new URL("../docs/site-content-model.md", import.meta.url), "utf8");

  assert.match(tokens, /--ds-footer-padding-block: 64px/);
  assert.match(tokens, /--ds-type-footer-name-size: clamp\(42px, 4vw, 80px\)/);
  assert.match(styles, /\.unified-footer\{[^}]*var\(--ds-footer-padding-block\)/);
  assert.match(staticStyles, /--footer-padding-block: 64px/);
  assert.match(staticStyles, /\.site-footer\s*\{[^}]*var\(--footer-padding-block\)/);
  assert.match(designSystem, /### 2\.5 Shared footer/);
  assert.match(designSystem, /ali-babaei-logo-v2\.png/);
  assert.match(contentModel, /## 7\. Shared footer content contract/);
});

test("ships a focused Persian header and one shared footer system", async () => {
  const persianPage = await readFile(new URL("../dist/client/fa/index.html", import.meta.url), "utf8");
  const bookingPage = await readFile(new URL("../dist/client/book.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
  const stylesheet = await readFile(new URL("../dist/client/css/style.css", import.meta.url), "utf8");

  assert.match(persianPage, /class="language-switch" href="\.\.\/index\.html"[^>]*>EN<\/a>/);
  assert.doesNotMatch(persianPage, /class="menu-trigger"/);
  assert.doesNotMatch(persianPage, /class="site-menu"/);
  assert.match(persianPage, /<h1 class="hero-h1">تصمیم‌های طراحی که<br>\s*تیم‌تون می‌تونه <span class="mark-yellow">واقعاً بسازه<\/span><\/h1>/);
  assert.doesNotMatch(persianPage, /data-cycle-words/);
  assert.match(stylesheet, /html\[lang="fa"\] \.landing-hero \.hero-h1/);
  assert.match(stylesheet, /font-size:\s*clamp\(44px, 4vw, 72px\)/);
  assert.match(stylesheet, /font-size:\s*clamp\(20px, 5\.5vw, 24px\)/);
  assert.match(stylesheet, /html\[lang="fa"\] \.form-footer\s*\{\s*border-top:\s*0/);
  assert.match(app, /function SiteFooter\(\)/);
  assert.equal((app.match(/<SiteFooter \/>/g) || []).length, 3);
  for (const page of [persianPage, bookingPage]) {
    assert.match(page, /<footer class="site-footer">[\s\S]*Ali Babaei[\s\S]*alibabaeinote@gmail\.com[\s\S]*LinkedIn[\s\S]*© 2026 · All rights reserved[\s\S]*<\/footer>/);
    assert.doesNotMatch(page, /site-footer--bar|footer-mark/);
  }
  assert.match(stylesheet, /\.site-footer\s*\{/);
});
