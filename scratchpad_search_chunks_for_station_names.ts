import fetch from 'node-fetch';

const CHUNKS = [
  'main.668307ec.js',
  '8206.df8165ee.chunk.js',
  '5070.cdc43e0f.chunk.js',
  '1803.4bea8e55.chunk.js',
  '472.edd9c96b.chunk.js',
  '4943.a8cf6947.chunk.js',
  '7228.6466b797.chunk.js',
  '8871.43ff3b2e.chunk.js',
  '9622.6662cd4a.chunk.js',
  '8570.ec433231.chunk.js',
  '413.a4cfa0a5.chunk.js',
  '4369.e942ef23.chunk.js',
  '3987.f1257747.chunk.js',
  '6220.d20398e3.chunk.js',
  '9786.70861de0.chunk.js',
  '9072.d63bcfef.chunk.js',
  '3754.36945435.chunk.js',
  '1175.c30dde46.chunk.js',
  '9249.70c2ae19.chunk.js',
  '4999.9419f3e7.chunk.js',
  '818.bd9ba194.chunk.js',
  '5620.fde906b8.chunk.js',
  '6319.855a9b9f.chunk.js',
  '5740.926a9daf.chunk.js',
  '5556.9fb1e6ee.chunk.js',
  '4756.7e6e9085.chunk.js',
  '5192.488f6c19.chunk.js',
  '2650.01f3bbb4.chunk.js',
  '6476.c3039552.chunk.js',
  '1884.8d26745b.chunk.js',
  '991.e1a16f7d.chunk.js',
  '4865.3b96141d.chunk.js',
  '6803.0f2056a7.chunk.js',
  '8836.82e88d90.chunk.js',
  '4471.568a1aa6.chunk.js',
  '4845.4a472e68.chunk.js',
  '9058.52f02dc5.chunk.js',
  '2318.0d5ff1ec.chunk.js',
  '174.4c65e532.chunk.js',
  '5381.18fdc755.chunk.js',
  '9516.2ac650d1.chunk.js',
  '3958.db54b8ea.chunk.js',
  '570.49885c8b.chunk.js',
  '5684.99a679fe.chunk.js',
  '3374.c07cdff1.chunk.js',
  '3474.6c289547.chunk.js',
  '1434.3d66e24e.chunk.js',
  '2340.220d23e2.chunk.js',
  '3798.6ad6b8fd.chunk.js',
  '7224.403ad673.chunk.js',
  '4946.7bd3d7d1.chunk.js',
  '9005.776e2fb7.chunk.js',
  '5733.e2de6c85.chunk.js',
  '3895.cde63ed9.chunk.js',
  '5981.1fb22569.chunk.js',
  '2327.5c2eb97b.chunk.js',
  '2212.7493dfde.chunk.js',
  '9476.495443f3.chunk.js',
  '5763.351dc152.chunk.js',
  '8572.d5a8bc51.chunk.js',
  '5437.3b37ac6b.chunk.js',
  '5746.238136a2.chunk.js',
  '9335.e7c1543b.chunk.js',
  '7832.87d948e5.chunk.js',
  '2746.fbe0767f.chunk.js'
];

async function main() {
  const terms = ['Chamartín', 'Sol', 'Goya', 'Atocha'];
  
  for (const chunk of CHUNKS) {
    try {
      const isMain = chunk.startsWith('main.');
      const prefix = isMain ? '' : 'static/js/';
      const url = `https://oktransportemadrid.com/${prefix}${chunk}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const text = await res.text();
      
      const foundTerms = terms.filter(t => text.includes(t));
      if (foundTerms.length > 0) {
        console.log(`Chunk ${chunk} contains: ${foundTerms.join(', ')}`);
        // Print a snippet around "Chamartín" if found
        if (text.includes('Chamartín')) {
          const idx = text.indexOf('Chamartín');
          console.log(`  Snippet: ...${text.substring(idx - 100, idx + 100)}...`);
        }
      }
    } catch (e) {
      console.error(`Error fetching chunk ${chunk}:`, e.message);
    }
  }
}

main();
