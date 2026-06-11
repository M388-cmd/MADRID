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
    // Real map images from third-party sites
    await download('https://metromadrid.es/sites/default/files/documentos/Plano_Metro_Madrid_2021.jpg', 'public/images/metro.jpg');
    // Using a different cercanias image
    await download('https://www.renfe.com/content/dam/renfe/es/Viajeros/Secciones/Cercanias/Mapas/mapa-cercanias-madrid.jpg', 'public/images/cercanias.jpg');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();
