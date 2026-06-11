import fetch from 'node-fetch';
import * as fs from 'fs';

async function main() {
  console.log("Loading extracted IDs from ./extracted_ids.json...");
  const rawIds = JSON.parse(fs.readFileSync('./extracted_ids.json', 'utf8'));
  const metroIds: string[] = rawIds.metroIds;

  console.log(`Found ${metroIds.length} Metro IDs to scrape.`);
  
  const scrapedStations: any[] = [];
  let processed = 0;

  // Let's scrape them with a concurrency limit or simple loop with small delay
  for (const id of metroIds) {
    const url = `https://api-u.oktransit.app/v1/stops/${id}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json() as any;
        const name = data.stopName;
        const lines = data.itineraries ? Array.from(new Set(data.itineraries.map((it: any) => it.lineNumber))) as string[] : [];
        const coordinates = data.coordinates || { lat: 0, long: 0 };
        const address = data.address || '';
        const postCode = data.postCode || '';
        
        console.log(`[Success] ID ${id}: ${name} (Lines: ${lines.join(', ')})`);
        scrapedStations.push({
          id,
          name,
          lines,
          coordinates,
          address,
          postCode,
          network: 'metro',
          description: `Estación de Metro de Madrid, Línea(s) ${lines.join(', ')}. Dirección: ${address}`
        });
      } else {
        console.log(`[Failed] ID ${id}: status ${res.status}`);
      }
    } catch (e: any) {
      console.log(`[Error] ID ${id}: ${e.message}`);
    }
    processed++;
    if (processed % 10 === 0) {
      console.log(`Processed ${processed}/${metroIds.length} stations...`);
    }
    // Small delay to be polite to the API
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`Scraping complete. Total successfully scraped metro stations: ${scrapedStations.length}`);
  fs.writeFileSync('./scraped_metro_stations.json', JSON.stringify(scrapedStations, null, 2));
  console.log("Saved results to ./scraped_metro_stations.json");
}

main();
