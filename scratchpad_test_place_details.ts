import fetch from 'node-fetch';

async function main() {
  const ids = ['4-1', '4-2', '4-10', '5-1', '5-18001'];
  for (const id of ids) {
    try {
      const url = `https://api.oktransit.app/place-details?placeId=${id}&lang=es&region=es`;
      const res = await fetch(url);
      console.log(`ID ${id} place-details:`);
      console.log(`  Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json() as any;
        console.log(`  Data content:`, JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      console.log(`ID ${id} error:`, e.message);
    }
  }
}

main();
