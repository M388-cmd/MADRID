import fetch from 'node-fetch';

async function main() {
  const paths = [
    'v1/madrid/stops/4-1',
    'v1/madrid/stops/4-10',
    'v1/stops/4-1',
    'v1/madrid/bicimad/stations', // we know this works
    'v1/madrid/lines',
    'v1/madrid/metro/stops',
    'v1/madrid/stations/4-10',
    'v1/madrid/metro/stations',
    'v1/madrid/cercanias/stations',
    'v1/stops/madrid/4-10/arrivals' // we know this works
  ];

  for (const path of paths) {
    const url = `https://api-u.oktransit.app/${path}`;
    try {
      const res = await fetch(url);
      console.log(`Path ${path}: status ${res.status}`);
      if (res.ok) {
        const bodyPreview = (await res.text()).substring(0, 200);
        console.log(`  Preview: ${bodyPreview}`);
      }
    } catch (e: any) {
      console.log(`Path ${path} error: ${e.message}`);
    }
  }
}

main();
