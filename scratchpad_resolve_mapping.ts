import fetch from 'node-fetch';

async function main() {
  const ids = ['4-1501', '4-1502', '4-30', '4-1', '4-2', '4-3', '4-10'];
  for (const id of ids) {
    try {
      const url = `https://api-u.oktransit.app/v1/stops/madrid/${id}/arrivals`;
      const res = await fetch(url);
      console.log(`ID ${id}: status ${res.status}`);
      if (res.ok) {
        const data = await res.json() as any;
        console.log(`  Arrivals count: ${data.arrivals ? data.arrivals.length : 0}`);
        if (data.arrivals && data.arrivals.length > 0) {
          console.log(`  Sample: Line ${data.arrivals[0].lineNumber} bound for ${data.arrivals[0].lineBound} in ${data.arrivals[0].departureTime}`);
        }
      }
    } catch (e: any) {
      console.log(`Error on ID ${id}:`, e.message);
    }
  }
}

main();
