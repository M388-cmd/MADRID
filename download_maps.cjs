const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download, status: ${response.statusCode} from ${url}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  try {
    console.log('Downloading maps...');
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg/2000px-Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg.png', 'public/images/metro.png');
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cercanias_Madrid_Network_Map.svg/2000px-Cercanias_Madrid_Network_Map.svg.png', 'public/images/cercanias.png');
    console.log('Done!');
  } catch(e) {
    console.error(e);
  }
}
run();
