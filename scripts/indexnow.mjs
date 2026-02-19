/**
 * IndexNow — Post-deploy URL submission for Bing/Copilot/Yandex
 *
 * Submits all site URLs to IndexNow API after each deployment.
 * Run via: node scripts/indexnow.mjs
 */

const SITE = "https://redsovereign.com";
const KEY = "b8f4e2a1c9d7403e9a5f6b1d8c2e7f3a";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Read the sitemap to discover all URLs
import { readFileSync } from "fs";

let urls;
try {
  const sitemap = readFileSync("dist/sitemap-0.xml", "utf-8");
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap`);
} catch {
  // Fallback to known pages if sitemap not available
  urls = [
    `${SITE}/`,
    `${SITE}/about/`,
    `${SITE}/pricing/`,
    `${SITE}/faq/`,
    `${SITE}/blog/`,
  ];
  console.log("Sitemap not found, using fallback URL list");
}

async function submitToIndexNow() {
  const payload = {
    host: "redsovereign.com",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 202) {
      console.log(`IndexNow accepted (${res.status}). URLs submitted:`);
      urls.forEach((url) => console.log(`  ${url}`));
    } else {
      const text = await res.text();
      console.error(`IndexNow error: ${res.status} ${res.statusText}`);
      console.error(text);
    }
  } catch (err) {
    console.error("IndexNow submission failed:", err.message);
  }
}

submitToIndexNow();
