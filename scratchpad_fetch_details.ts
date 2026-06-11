import fetch from 'node-fetch';

async function main() {
  const ids = ['4-10', '4-30', '5-18001', '5-17000', '4-325'];
  for (const id of ids) {
    const url = `https://api-u.oktransit.app/v1/stops/${id}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json() as any;
        console.log(`ID ${id}:`, JSON.stringify(data, null, 2));
      } else {
        console.log(`ID ${id} failed with status ${res.status}`);
      }
    } catch (e: any) {
      console.log(`ID ${id} error:`, e.message);
    }
  }
}

main();
