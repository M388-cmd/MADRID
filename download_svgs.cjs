const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed with status code ${response.statusCode} from ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve); 
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  try {
    console.log('Downloading SVGs...');
    await download('https://upload.wikimedia.org/wikipedia/commons/e/eb/Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg', 'public/images/metro.svg');
    console.log('Downloaded Metro');
    await download('https://upload.wikimedia.org/wikipedia/commons/1/15/Cercanias_Madrid_Network_Map.svg', 'public/images/cercanias.svg');
    console.log('Downloaded Cercanias');
  } catch (err) {
    console.error(err);
  }
}
run();
