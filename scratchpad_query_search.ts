import fetch from 'node-fetch';

async function main() {
  const queries = ['Sol', 'Atocha', 'Chamartín', 'Nuevos Ministerios', 'Banco de España', 'Quevedo', 'Canal'];
  for (const q of queries) {
    try {
      const url = `https://api.oktransit.app/place-autocomplete?q=${encodeURIComponent(q)}&lang=es&region=es`;
      const res = await fetch(url);
      console.log(`Query: ${q}`);
      console.log(`  Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json() as any;
        console.log(`  Data type: ${typeof data}`);
        console.log(`  Response Preview: ${JSON.stringify(data).substring(0, 600)}`);
      }
    } catch (e: any) {
      console.log(`Error on Query ${q}:`, e.message);
    }
  }
}

main();
