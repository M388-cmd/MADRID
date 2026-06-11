import fetch from 'node-fetch';

async function main() {
  const stationPlaceIds = [
    // Let's search and parse first
    { name: 'Sol Subway', id: 'LhE5KwlENxM2KUccPB5AMyogXQMFMjExAgEh' },
    // Let's search and grab Chamartín Subway
    { name: 'Chamartín Subway', id: 'LhE5K0MpBCEWGSYDPB5AMzIkXQEJGV5GWksD' },
    // Let's also search Banco de España subway
    { name: 'Banco de España Subway', id: 'LhE5KzwpXTAaKCIcPB5AM0BDAUo2MR4xPA0p' }
  ];

  for (const item of stationPlaceIds) {
    try {
      const url = `https://api.oktransit.app/place-details?placeId=${item.id}&lang=es&region=es`;
      const res = await fetch(url);
      console.log(`Place: ${item.name} (${item.id})`);
      console.log(`  Details Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json() as any;
        console.log(`  Details Response Keys: ${Object.keys(data)}`);
        console.log(`  Full Details:`, JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      console.log(`Error:`, e.message);
    }
  }
}

main();
