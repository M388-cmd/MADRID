const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed: ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  fs.mkdirSync('public/images', { recursive: true });
  
  try {
    console.log('Downloading Cercanias from wikimedia...');
    await download(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cercanias_Madrid_Network_Map.svg/2000px-Cercanias_Madrid_Network_Map.svg.png',
      'public/images/cercanias.png'
    );
    console.log('Cercanias done');
  } catch(e) {
    console.error('Cercanias failed:', e.message);
  }

  try {
    console.log('Downloading Metro from wikimedia...');
    await download(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg/2000px-Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg.png',
      'public/images/metro.png'
    );
    console.log('Metro done');
  } catch(e) {
    console.error('Metro failed:', e.message);
  }
}

run();
