import fetch from 'node-fetch';
import * as fs from 'fs';

async function main() {
  console.log("Loading extracted IDs from ./extracted_ids.json...");
  const rawIds = JSON.parse(fs.readFileSync('./extracted_ids.json', 'utf8'));
  const trainIds: string[] = rawIds.trainIds;

  console.log(`Found ${trainIds.length} Cercanías/Train IDs to scrape.`);
  
  const scrapedStations: any[] = [];
  let processed = 0;

  for (const id of trainIds) {
    const url = `https://api-u.oktransit.app/v1/stops/${id}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json() as any;
        const name = data.stopName;
        const lines = data.itineraries ? Array.from(new Set(data.itineraries.map((it: any) => it.lineNumber))) as string[] : [];
        const coordinates = data.coordinates || { lat: 0, long: 0 };
        const address = data.address || '';
        
        console.log(`[Success] ID ${id}: ${name} (Lines: ${lines.join(', ')})`);
        scrapedStations.push({
          id,
          name,
          lines,
          coordinates,
          address,
          network: 'cercanias',
          description: `Estación de Renfe Cercanías, Línea(s) ${lines.join(', ')}. Dirección: ${address}`
        });
      } else {
        console.log(`[Failed] ID ${id}: status ${res.status}`);
      }
    } catch (e: any) {
      console.log(`[Error] ID ${id}: ${e.message}`);
    }
    processed++;
    if (processed % 10 === 0) {
      console.log(`Processed ${processed}/${trainIds.length} stations...`);
    }
    // Small delay
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`Scraping complete. Total successfully scraped Cercanías stations: ${scrapedStations.length}`);
  fs.writeFileSync('./scraped_cercanias_stations.json', JSON.stringify(scrapedStations, null, 2));
  console.log("Saved results to ./scraped_cercanias_stations.json");
}

main();
