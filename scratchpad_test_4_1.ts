import fetch from 'node-fetch';

async function main() {
  try {
    const url = 'https://oktransportemadrid.com/paradas/4-1';
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      console.log(`Page length: ${text.length}`);
      
      // Let's find all script contents or any lines containing JSON or window
      const lines = text.split('\n');
      console.log("Lines containing script or json or window:");
      for (const line of lines) {
        if (line.includes('<script') || line.includes('window.') || line.includes('__INITIAL_STATE__') || line.includes('{') && line.length > 50) {
          console.log(`  ${line.substring(0, 300)}`);
        }
      }
      
      // Print the first 2000 chars of HTML
      console.log("\nFirst 1000 chars:");
      console.log(text.substring(0, 1000));
      
      // Print any H1 or H2 or H3
      const headings = text.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi);
      if (headings) {
        console.log("\nFound headings:", headings);
      }
      
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
