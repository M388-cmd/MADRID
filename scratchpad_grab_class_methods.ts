import fetch from 'node-fetch';

async function main() {
  const url = 'https://oktransportemadrid.com/static/js/9072.d63bcfef.chunk.js';
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      const pos = text.indexOf('apiGateway');
      if (pos !== -1) {
        console.log("Snippet from position:");
        console.log(text.substring(pos, pos + 2500));
      } else {
        console.log("apiGateway not found.");
      }
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
