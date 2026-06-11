import fetch from 'node-fetch';

async function main() {
  try {
    const url = 'https://oktransportemadrid.com/paradas/4-1';
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      console.log(`Length: ${text.length}`);
      // Remove long scripts to focus on text markup
      let cleanText = text.replace(/<script[\s\S]*?<\/script>/gi, '[SCRIPT]');
      cleanText = cleanText.replace(/<style[\s\S]*?<\/style>/gi, '[STYLE]');
      cleanText = cleanText.replace(/<svg[\s\S]*?<\/svg>/gi, '[SVG]');
      
      console.log("Clean HTML preview:");
      console.log(cleanText);
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
