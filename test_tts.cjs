const https = require('https');
https.get('https://api.streamelements.com/kappa/v2/speech?voice=Mia&text=Hola', (res) => {
  console.log(res.statusCode, res.headers['content-type']);
});
