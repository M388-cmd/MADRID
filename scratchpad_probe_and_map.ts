import fetch from 'node-fetch';

async function main() {
  console.log("Scanning metro stop IDs on live arrivals API...");
  
  const results: any[] = [];
  
  // We can scan first 200 stop IDs sequentially as a representative sample
  for (let i = 1; i <= 200; i++) {
    const id = `4-${i}`;
    try {
      const url = `https://api-u.oktransit.app/v1/stops/madrid/${id}/arrivals`;
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json() as any;
        const arrivals = data.arrivals || [];
        if (arrivals.length > 0) {
          const lines = Array.from(new Set(arrivals.map((a: any) => a.lineNumber))) as string[];
          const bounds = Array.from(new Set(arrivals.map((a: any) => a.lineBound))) as string[];
          console.log(`ID ${id}: Lines [${lines.join(', ')}], Destinations [${bounds.join(', ')}]`);
          results.push({ id, lines, bounds });
        } else {
          // Valid ID but no arrivals
          console.log(`ID ${id}: Valid (Active, but 0 arrivals at this moment)`);
          results.push({ id, lines: [], bounds: [], empty: true });
        }
      }
    } catch (e: any) {
      // Ignored
    }
    // Respectful tiny delay
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nScan complete. Discovered ${results.length} active stops.`);
}

main();
