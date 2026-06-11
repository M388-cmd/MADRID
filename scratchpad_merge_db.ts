import * as fs from 'fs';
import { STATIONS_DB, Station } from './src/data/stations';

async function main() {
  console.log("Loading scraped metro stations...");
  const scrapedMetro: Station[] = JSON.parse(fs.readFileSync('./scraped_metro_stations.json', 'utf8'));
  console.log(`Loaded ${scrapedMetro.length} scraped metro stations.`);

  console.log("Loading scraped cercanias stations...");
  const scrapedCercanias: Station[] = JSON.parse(fs.readFileSync('./scraped_cercanias_stations.json', 'utf8'));
  console.log(`Loaded ${scrapedCercanias.length} scraped cercanias stations.`);

  // Filter out existing metro and cercanias stations, keep only tren-ligero
  console.log("Filtering out other networks from existing STATIONS_DB...");
  const trenLigero = STATIONS_DB.filter(s => s.network !== 'metro' && s.network !== 'cercanias');
  console.log(`Kept ${trenLigero.length} tren-ligero stations.`);

  // Combined stations
  const combined: Station[] = [...scrapedMetro, ...scrapedCercanias, ...trenLigero];
  console.log(`Total combined station count: ${combined.length}`);

  // Construct src/data/stations.ts file content
  let content = `export interface Station {
  id: string;
  name: string;
  network: 'metro' | 'cercanias' | 'tren-ligero';
  lines: string[];
  description?: string;
  dist?: string;
}

export const STATIONS_DB: Station[] = ${JSON.stringify(combined, null, 2)};

/**
 * Normaliza un texto para ignorar mayúsculas, minúsculas, espacios adicionales y tildes/acentos.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD') // Descompone caracteres con tilde en letras + diacríticos combinados
    .replace(/[\\u0300-\\u036f]/g, ''); // Elimina los diacríticos (las tildes)
}

/**
 * Busca estaciones aplicando la normalización de texto de forma precisa.
 */
export function searchStations(query: string): Station[] {
  const normQuery = normalizeText(query);
  if (!normQuery) return [];

  return STATIONS_DB.filter((station) => {
    const normName = normalizeText(station.name);
    const normDesc = normalizeText(station.description || '');
    const normLines = station.lines.map(l => normalizeText(l));
    const normNetwork = normalizeText(station.network);

    // Búsqueda por coincidencia en el nombre, la descripción, o las líneas de transporte, o red
    return normName.includes(normQuery) || 
           normDesc.includes(normQuery) || 
           normLines.some(l => l.includes(normQuery)) ||
           normNetwork.includes(normQuery) ||
           (normQuery === 'tren ligero' && station.network === 'tren-ligero') ||
           (normQuery === 'tranvia' && station.network === 'tren-ligero' && station.name.includes('Parla'));
  });
}
`;

  fs.writeFileSync('./src/data/stations.ts', content, 'utf8');
  console.log("Successfully wrote updated src/data/stations.ts including Metro and Cercanías!");
}

main();
