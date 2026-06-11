import fetch from 'node-fetch';
import * as fs from 'fs';

async function main() {
  try {
    console.log("Fetching sitemap.xml...");
    const url = 'https://oktransportemadrid.com/sitemap.xml';
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch sitemap: ${res.status}`);
      return;
    }
    const text = await res.text();
    console.log(`Downloaded sitemap size: ${text.length} bytes`);

    const regex = /<loc>https:\/\/oktransportemadrid\.com\/paradas\/([^<]+)<\/loc>/gi;
    let match;
    const ids: string[] = [];
    while ((match = regex.exec(text)) !== null) {
      ids.push(match[1]);
    }

    console.log(`Total paradas IDs extracted: ${ids.length}`);

    const prefixes: Record<string, number> = {};
    for (const id of ids) {
      const parts = id.split('-');
      const pref = parts[0];
      prefixes[pref] = (prefixes[pref] || 0) + 1;
    }

    // Let's write the complete list of 4- and 5- prefixed IDs to a JSON file
    const metroIds = ids.filter(id => id.startsWith('4-'));
    const trainIds = ids.filter(id => id.startsWith('5-'));

    console.log(`Extracted ${metroIds.length} Metro IDs and ${trainIds.length} Cercanías IDs`);

    fs.writeFileSync('./extracted_ids.json', JSON.stringify({ metroIds, trainIds }, null, 2));
    console.log("Saved extracted IDs to ./extracted_ids.json");

  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

main();
