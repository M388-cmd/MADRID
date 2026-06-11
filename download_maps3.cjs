const fs = require('fs');

async function download(url, dest) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }
  });
  if (!response.ok) throw new Error(`Failed! ${response.status} from ${url}`);
  const arrBuffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(arrBuffer));
}

async function run() {
  try {
    console.log('Downloading Wikimedia MRT...');
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg/2000px-Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg.png', 'public/images/metro.png');
    console.log('Downloading Wikimedia Cercanias...');
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cercanias_Madrid_Network_Map.svg/2000px-Cercanias_Madrid_Network_Map.svg.png', 'public/images/cercanias.png');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();
