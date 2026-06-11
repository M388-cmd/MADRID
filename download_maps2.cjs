const fs = require('fs');

async function download(url, dest) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
  });
  if (!response.ok) throw new Error(`Failed! ${response.status} from ${url}`);
  const arrBuffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrBuffer));
}

async function run() {
  try {
    console.log('Downloading maps...');
    await download('https://www.planometromadrid.org/mapas-metro/plano-metro-madrid-2024.png', 'public/images/metro.png');
    await download('https://metromadrid.es/sites/default/files/documentos/Plano%20Red%20Metro%20y%20Ligero.pdf', 'public/images/metro.pdf');
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cercanias_Madrid_Network_Map.svg/2560px-Cercanias_Madrid_Network_Map.svg.png', 'public/images/cercanias.png');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();
