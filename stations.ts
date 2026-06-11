export interface Station {
  id: string;
  name: string;
  network: 'metro' | 'cercanias' | 'tren-ligero';
  lines: string[];
  description?: string;
  dist?: string;
  coordinates?: { lat: number; long: number };
  address?: string;
  postCode?: string;
  locality?: string;
  city?: string;
}

export const STATIONS_DB: Station[] = [
  {
    "id": "4-1",
    "name": "Plaza De Castilla",
    "lines": [
      "1",
      "9",
      "10"
    ],
    "coordinates": {
      "lat": 40.4669,
      "long": -3.68917
    },
    "address": "Paseo de la Castellana 189",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 9, 10. Dirección: Paseo de la Castellana 189"
  },
  {
    "id": "4-2",
    "name": "Valdeacederas",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.46442,
      "long": -3.69506
    },
    "address": "Calle de Bravo Murillo 332",
    "postCode": "28020",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Bravo Murillo 332"
  },
  {
    "id": "4-3",
    "name": "Tetuan",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.46055,
      "long": -3.69825
    },
    "address": "Calle de Sor Ángela de la Cruz 43",
    "postCode": "28020",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Sor Ángela de la Cruz 43"
  },
  {
    "id": "4-4",
    "name": "Estrecho",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.45429,
      "long": -3.70302
    },
    "address": "Calle de Bravo Murillo 191",
    "postCode": "28020",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Bravo Murillo 191"
  },
  {
    "id": "4-5",
    "name": "Alvarado",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.45033,
      "long": -3.70331
    },
    "address": "Calle de Bravo Murillo 138",
    "postCode": "28020",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Bravo Murillo 138"
  },
  {
    "id": "4-6",
    "name": "Cuatro Caminos",
    "lines": [
      "1",
      "2",
      "6"
    ],
    "coordinates": {
      "lat": 40.44697,
      "long": -3.70397
    },
    "address": "Calle de Bravo Murillo 99",
    "postCode": "28020",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 2, 6. Dirección: Calle de Bravo Murillo 99"
  },
  {
    "id": "4-7",
    "name": "Rios Rosas",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.44198,
      "long": -3.70133
    },
    "address": "Calle de Ríos Rosas 22",
    "postCode": "28003",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Ríos Rosas 22"
  },
  {
    "id": "4-8",
    "name": "Iglesia",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.43492,
      "long": -3.69898
    },
    "address": "Gta del Pintor Sorolla 2",
    "postCode": "28010",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Gta del Pintor Sorolla 2"
  },
  {
    "id": "4-9",
    "name": "Bilbao",
    "lines": [
      "1",
      "4"
    ],
    "coordinates": {
      "lat": 40.42906,
      "long": -3.70218
    },
    "address": "Calle de Sagasta 2",
    "postCode": "28004",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 4. Dirección: Calle de Sagasta 2"
  },
  {
    "id": "4-10",
    "name": "Tribunal",
    "lines": [
      "1",
      "10"
    ],
    "coordinates": {
      "lat": 40.42619,
      "long": -3.7011
    },
    "address": "Calle de Fuencarral 81",
    "postCode": "28004",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 10. Dirección: Calle de Fuencarral 81"
  },
  {
    "id": "4-11",
    "name": "Gran Via",
    "lines": [
      "1",
      "5"
    ],
    "coordinates": {
      "lat": 40.42001,
      "long": -3.7018
    },
    "address": "Calle Gran Vía 23",
    "postCode": "28013",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 5. Dirección: Calle Gran Vía 23"
  },
  {
    "id": "4-12",
    "name": "Sol",
    "lines": [
      "1",
      "2",
      "3"
    ],
    "coordinates": {
      "lat": 40.41688,
      "long": -3.70326
    },
    "address": "Plaza de la Puerta del Sol 6",
    "postCode": "28013",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 2, 3. Dirección: Plaza de la Puerta del Sol 6"
  },
  {
    "id": "4-13",
    "name": "Tirso De Molina",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.41235,
      "long": -3.70466
    },
    "address": "Plaza de Tirso de Molina 7",
    "postCode": "28012",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Plaza de Tirso de Molina 7"
  },
  {
    "id": "4-14",
    "name": "Anton Martin",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.41246,
      "long": -3.69937
    },
    "address": "Calle de Atocha 50",
    "postCode": "28012",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Atocha 50"
  },
  {
    "id": "4-15",
    "name": "Estacion Del Arte",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.40885,
      "long": -3.69249
    },
    "address": "Plaza del Emperador Carlos V 11",
    "postCode": "28012",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Plaza del Emperador Carlos V 11"
  },
  {
    "id": "4-16",
    "name": "Atocha",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.40659,
      "long": -3.68938
    },
    "address": "Avda de la Ciudad de Barcelona 2 B",
    "postCode": "28007",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Ciudad de Barcelona 2 B"
  },
  {
    "id": "4-17",
    "name": "Menendez Pelayo",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.40445,
      "long": -3.68098
    },
    "address": "Avda de la Ciudad de Barcelona 23",
    "postCode": "28007",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Ciudad de Barcelona 23"
  },
  {
    "id": "4-18",
    "name": "Pacifico",
    "lines": [
      "1",
      "6"
    ],
    "coordinates": {
      "lat": 40.40126,
      "long": -3.67514
    },
    "address": "Avda de la Ciudad de Barcelona 79",
    "postCode": "28007",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 6. Dirección: Avda de la Ciudad de Barcelona 79"
  },
  {
    "id": "4-19",
    "name": "Puente De Vallecas",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.39819,
      "long": -3.66906
    },
    "address": "Avda de la Albufera 1",
    "postCode": "28038",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Albufera 1"
  },
  {
    "id": "4-20",
    "name": "Nueva Numancia",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.39554,
      "long": -3.66414
    },
    "address": "Avda de la Albufera 70",
    "postCode": "28053",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Albufera 70"
  },
  {
    "id": "4-21",
    "name": "Portazgo",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.39266,
      "long": -3.65868
    },
    "address": "Avda de la Albufera 131",
    "postCode": "28018",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Albufera 131"
  },
  {
    "id": "4-22",
    "name": "Buenos Aires",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.39156,
      "long": -3.65391
    },
    "address": "Avda de la Albufera 179",
    "postCode": "28038",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Albufera 179"
  },
  {
    "id": "4-23",
    "name": "Alto Del Arenal",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.38977,
      "long": -3.64522
    },
    "address": "Calle de Santillana del Mar 21",
    "postCode": "28038",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Santillana del Mar 21"
  },
  {
    "id": "4-24",
    "name": "Miguel Hernandez",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.38732,
      "long": -3.63951
    },
    "address": "Calle de León Felipe 4 A",
    "postCode": "28038",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de León Felipe 4 A"
  },
  {
    "id": "4-25",
    "name": "Sierra De Guadalupe",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.38216,
      "long": -3.62472
    },
    "address": "Avda de la Democracia 1",
    "postCode": "28031",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda de la Democracia 1"
  },
  {
    "id": "4-26",
    "name": "Villa De Vallecas",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.3796,
      "long": -3.6213
    },
    "address": "Paseo de Federico García Lorca 2",
    "postCode": "28031",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Paseo de Federico García Lorca 2"
  },
  {
    "id": "4-27",
    "name": "Congosto",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.37238,
      "long": -3.61884
    },
    "address": "Calle del Congosto 48",
    "postCode": "28031",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle del Congosto 48"
  },
  {
    "id": "4-28",
    "name": "Ventas",
    "lines": [
      "2",
      "5"
    ],
    "coordinates": {
      "lat": 40.43088,
      "long": -3.66366
    },
    "address": "Calle de Alcalá 204",
    "postCode": "28028",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 5. Dirección: Calle de Alcalá 204"
  },
  {
    "id": "4-29",
    "name": "Manuel Becerra",
    "lines": [
      "2",
      "6"
    ],
    "coordinates": {
      "lat": 40.4279,
      "long": -3.66926
    },
    "address": "Plaza de Manuel Becerra 1",
    "postCode": "28028",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 6. Dirección: Plaza de Manuel Becerra 1"
  },
  {
    "id": "4-30",
    "name": "Goya",
    "lines": [
      "2",
      "4"
    ],
    "coordinates": {
      "lat": 40.42455,
      "long": -3.67591
    },
    "address": "Calle de Narváez 2",
    "postCode": "28009",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 4. Dirección: Calle de Narváez 2"
  },
  {
    "id": "4-31",
    "name": "Principe De Vergara",
    "lines": [
      "2",
      "9"
    ],
    "coordinates": {
      "lat": 40.42294,
      "long": -3.68012
    },
    "address": "Calle de Alcalá 123",
    "postCode": "28009",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 9. Dirección: Calle de Alcalá 123"
  },
  {
    "id": "4-32",
    "name": "Retiro",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42031,
      "long": -3.68624
    },
    "address": "Calle de Alcalá 81",
    "postCode": "28009",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de Alcalá 81"
  },
  {
    "id": "4-33",
    "name": "Banco De España",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.41922,
      "long": -3.69497
    },
    "address": "Calle de Alcalá 49",
    "postCode": "28014",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de Alcalá 49"
  },
  {
    "id": "4-34",
    "name": "Sevilla",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.41805,
      "long": -3.69925
    },
    "address": "Calle de Alcalá 23",
    "postCode": "28014",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de Alcalá 23"
  },
  {
    "id": "4-36",
    "name": "Opera",
    "lines": [
      "2",
      "5",
      "R"
    ],
    "coordinates": {
      "lat": 40.41809,
      "long": -3.70942
    },
    "address": "Plaza de Isabel II 9",
    "postCode": "28013",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 5, R. Dirección: Plaza de Isabel II 9"
  },
  {
    "id": "4-37",
    "name": "Santo Domingo",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42132,
      "long": -3.70796
    },
    "address": "Calle de San Bernardo 11",
    "postCode": "28013",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de San Bernardo 11"
  },
  {
    "id": "4-38",
    "name": "Noviciado",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42484,
      "long": -3.70742
    },
    "address": "Calle de San Bernardo 48",
    "postCode": "28015",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de San Bernardo 48"
  },
  {
    "id": "4-39",
    "name": "San Bernardo",
    "lines": [
      "2",
      "4"
    ],
    "coordinates": {
      "lat": 40.43001,
      "long": -3.70557
    },
    "address": "Calle de San Bernardo 94",
    "postCode": "28015",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 4. Dirección: Calle de San Bernardo 94"
  },
  {
    "id": "4-40",
    "name": "Quevedo",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.43322,
      "long": -3.70433
    },
    "address": "Gta de Quevedo 1",
    "postCode": "28015",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Gta de Quevedo 1"
  },
  {
    "id": "4-41",
    "name": "Canal",
    "lines": [
      "2",
      "7"
    ],
    "coordinates": {
      "lat": 40.43841,
      "long": -3.70433
    },
    "address": "Calle de Bravo Murillo 40",
    "postCode": "28015",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2, 7. Dirección: Calle de Bravo Murillo 40"
  },
  {
    "id": "4-43",
    "name": "Legazpi",
    "lines": [
      "3",
      "6"
    ],
    "coordinates": {
      "lat": 40.39116,
      "long": -3.69511
    },
    "address": "Plaza de Legazpi 2 B",
    "postCode": "28045",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 6. Dirección: Plaza de Legazpi 2 B"
  },
  {
    "id": "4-44",
    "name": "Delicias",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.3999,
      "long": -3.6942
    },
    "address": "Paseo de las Delicias 60",
    "postCode": "28045",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Paseo de las Delicias 60"
  },
  {
    "id": "4-45",
    "name": "Palos De La Frontera",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.40307,
      "long": -3.69423
    },
    "address": "Calle de Palos de la Frontera 33",
    "postCode": "28045",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Calle de Palos de la Frontera 33"
  },
  {
    "id": "4-46",
    "name": "Embajadores",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.40513,
      "long": -3.70268
    },
    "address": "Gta de Embajadores 10",
    "postCode": "28012",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Gta de Embajadores 10"
  },
  {
    "id": "4-47",
    "name": "Lavapies",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.40851,
      "long": -3.7009
    },
    "address": "Plaza de Lavapiés 7",
    "postCode": "28012",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Plaza de Lavapiés 7"
  },
  {
    "id": "4-49",
    "name": "Callao",
    "lines": [
      "3",
      "5"
    ],
    "coordinates": {
      "lat": 40.42014,
      "long": -3.70566
    },
    "address": "Plaza del Callao 3",
    "postCode": "28013",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 5. Dirección: Plaza del Callao 3"
  },
  {
    "id": "4-50",
    "name": "Plaza De España",
    "lines": [
      "3",
      "10"
    ],
    "coordinates": {
      "lat": 40.42342,
      "long": -3.7112
    },
    "address": "Plaza de España 1",
    "postCode": "28008",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 10. Dirección: Plaza de España 1"
  },
  {
    "id": "4-51",
    "name": "Ventura Rodriguez",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.42709,
      "long": -3.71341
    },
    "address": "Calle de la Princesa 22",
    "postCode": "28008",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Calle de la Princesa 22"
  },
  {
    "id": "4-52",
    "name": "Argüelles",
    "lines": [
      "3",
      "4",
      "6"
    ],
    "coordinates": {
      "lat": 40.43066,
      "long": -3.71596
    },
    "address": "Calle de Alberto Aguilera 72",
    "postCode": "28008",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 4, 6. Dirección: Calle de Alberto Aguilera 72"
  },
  {
    "id": "4-53",
    "name": "Moncloa",
    "lines": [
      "3",
      "6"
    ],
    "coordinates": {
      "lat": 40.43502,
      "long": -3.71945
    },
    "address": "Plaza de la Moncloa 1",
    "postCode": "28008",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 6. Dirección: Plaza de la Moncloa 1"
  },
  {
    "id": "4-57",
    "name": "Alonso Martinez",
    "lines": [
      "4",
      "5",
      "10"
    ],
    "coordinates": {
      "lat": 40.42772,
      "long": -3.69594
    },
    "address": "Plaza de Alonso Martínez 4",
    "postCode": "28004",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4, 5, 10. Dirección: Plaza de Alonso Martínez 4"
  },
  {
    "id": "4-58",
    "name": "Colon",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.42542,
      "long": -3.69101
    },
    "address": "Plaza de Colón 2",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Plaza de Colón 2"
  },
  {
    "id": "4-59",
    "name": "Serrano",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.42543,
      "long": -3.68663
    },
    "address": "Calle de Goya 19",
    "postCode": "28001",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Goya 19"
  },
  {
    "id": "4-60",
    "name": "Velazquez",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.42503,
      "long": -3.68292
    },
    "address": "Calle de Núñez de Balboa 33",
    "postCode": "28001",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Núñez de Balboa 33"
  },
  {
    "id": "4-62",
    "name": "Lista",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.42917,
      "long": -3.67541
    },
    "address": "Calle del Conde de Peñalver 45",
    "postCode": "28006",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle del Conde de Peñalver 45"
  },
  {
    "id": "4-63",
    "name": "Diego De Leon",
    "lines": [
      "4",
      "5",
      "6"
    ],
    "coordinates": {
      "lat": 40.43468,
      "long": -3.67495
    },
    "address": "Calle de Diego de León 69",
    "postCode": "28028",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4, 5, 6. Dirección: Calle de Diego de León 69"
  },
  {
    "id": "4-64",
    "name": "Avenida De America",
    "lines": [
      "4",
      "6",
      "7",
      "9"
    ],
    "coordinates": {
      "lat": 40.43803,
      "long": -3.67664
    },
    "address": "Avda de América 9 A",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4, 6, 7, 9. Dirección: Avda de América 9 A"
  },
  {
    "id": "4-65",
    "name": "Prosperidad",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.44419,
      "long": -3.67482
    },
    "address": "Plaza de la Prosperidad 4",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Plaza de la Prosperidad 4"
  },
  {
    "id": "4-66",
    "name": "Alfonso Xiii",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.44825,
      "long": -3.66791
    },
    "address": "Calle de López de Hoyos 190",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de López de Hoyos 190"
  },
  {
    "id": "4-67",
    "name": "Avenida De La Paz",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.45354,
      "long": -3.66118
    },
    "address": "Avda de Ramón y Cajal 107",
    "postCode": "28043",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Avda de Ramón y Cajal 107"
  },
  {
    "id": "4-68",
    "name": "Arturo Soria",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.45583,
      "long": -3.65618
    },
    "address": "Calle de Arturo Soria 172",
    "postCode": "28043",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Arturo Soria 172"
  },
  {
    "id": "4-69",
    "name": "Esperanza",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.45945,
      "long": -3.64582
    },
    "address": "Calle de Andorra 51",
    "postCode": "28043",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Andorra 51"
  },
  {
    "id": "4-70",
    "name": "Canillas",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.46381,
      "long": -3.6356
    },
    "address": "Avda de Machupichu 64",
    "postCode": "28043",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Avda de Machupichu 64"
  },
  {
    "id": "4-71",
    "name": "Mar De Cristal",
    "lines": [
      "4",
      "8"
    ],
    "coordinates": {
      "lat": 40.46943,
      "long": -3.63832
    },
    "address": "Gta del Mar de Cristal 1 B",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4, 8. Dirección: Gta del Mar de Cristal 1 B"
  },
  {
    "id": "4-72",
    "name": "San Lorenzo",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.47447,
      "long": -3.63958
    },
    "address": "Avda de la Barranquilla 9",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Avda de la Barranquilla 9"
  },
  {
    "id": "4-73",
    "name": "Parque De Santa Maria",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.47711,
      "long": -3.64524
    },
    "address": "Calle de Santa Virgilia 1",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Santa Virgilia 1"
  },
  {
    "id": "4-74",
    "name": "Canillejas",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.44942,
      "long": -3.60816
    },
    "address": "Calle de Alcalá 631",
    "postCode": "28022",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Alcalá 631"
  },
  {
    "id": "4-75",
    "name": "Torre Arias",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.44374,
      "long": -3.61699
    },
    "address": "Calle de Alcalá 557",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Alcalá 557"
  },
  {
    "id": "4-76",
    "name": "Suanzes",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.44085,
      "long": -3.62684
    },
    "address": "Calle de Alcalá 527",
    "postCode": "28037",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Alcalá 527"
  },
  {
    "id": "4-77",
    "name": "Ciudad Lineal",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.43805,
      "long": -3.63816
    },
    "address": "Calle de Arturo Soria 2",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Arturo Soria 2"
  },
  {
    "id": "4-78",
    "name": "Pueblo Nuevo",
    "lines": [
      "5",
      "7"
    ],
    "coordinates": {
      "lat": 40.43569,
      "long": -3.64282
    },
    "address": "Calle de Alcalá 372",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5, 7. Dirección: Calle de Alcalá 372"
  },
  {
    "id": "4-79",
    "name": "Quintana",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.43358,
      "long": -3.64736
    },
    "address": "Calle de la Virgen del Sagrario 2",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de la Virgen del Sagrario 2"
  },
  {
    "id": "4-80",
    "name": "El Carmen",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.43189,
      "long": -3.65757
    },
    "address": "Calle de Raquel Méller 2",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Raquel Méller 2"
  },
  {
    "id": "4-83",
    "name": "Nuñez De Balboa",
    "lines": [
      "5",
      "9"
    ],
    "coordinates": {
      "lat": 40.43278,
      "long": -3.68258
    },
    "address": "Calle de Juan Bravo 20",
    "postCode": "28006",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5, 9. Dirección: Calle de Juan Bravo 20"
  },
  {
    "id": "4-84",
    "name": "Ruben Dario",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.43316,
      "long": -3.68954
    },
    "address": "Paseo de Eduardo Dato 33",
    "postCode": "28010",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Paseo de Eduardo Dato 33"
  },
  {
    "id": "4-86",
    "name": "Chueca",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.42293,
      "long": -3.69762
    },
    "address": "Plaza de Chueca 7",
    "postCode": "28004",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Plaza de Chueca 7"
  },
  {
    "id": "4-90",
    "name": "La Latina",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.41128,
      "long": -3.70816
    },
    "address": "Calle de San Millán 5",
    "postCode": "28005",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de San Millán 5"
  },
  {
    "id": "4-91",
    "name": "Puerta De Toledo",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.40704,
      "long": -3.71105
    },
    "address": "Gta de Puerta de Toledo 1",
    "postCode": "28005",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Gta de Puerta de Toledo 1"
  },
  {
    "id": "4-92",
    "name": "Acacias",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.40387,
      "long": -3.70664
    },
    "address": "Paseo de las Acacias 20",
    "postCode": "28005",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Paseo de las Acacias 20"
  },
  {
    "id": "4-93",
    "name": "Piramides",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.4026,
      "long": -3.71138
    },
    "address": "Paseo del Doctor Vallejo Nágera 37",
    "postCode": "28005",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Paseo del Doctor Vallejo Nágera 37"
  },
  {
    "id": "4-94",
    "name": "Marques De Vadillo",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.39736,
      "long": -3.71596
    },
    "address": "Gta del Marqués de Vadillo 4",
    "postCode": "28019",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Gta del Marqués de Vadillo 4"
  },
  {
    "id": "4-95",
    "name": "Urgel",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.39335,
      "long": -3.7236
    },
    "address": "Calle del Camino Viejo de Leganés 1",
    "postCode": "28019",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle del Camino Viejo de Leganés 1"
  },
  {
    "id": "4-96",
    "name": "Oporto",
    "lines": [
      "5",
      "6"
    ],
    "coordinates": {
      "lat": 40.38846,
      "long": -3.73132
    },
    "address": "Gta del Valle de Oro 13",
    "postCode": "28019",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5, 6. Dirección: Gta del Valle de Oro 13"
  },
  {
    "id": "4-97",
    "name": "Vista Alegre",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.38885,
      "long": -3.73982
    },
    "address": "Calle de la Oca 74",
    "postCode": "28025",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de la Oca 74"
  },
  {
    "id": "4-98",
    "name": "Carabanchel",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.38783,
      "long": -3.74487
    },
    "address": "Gta del Ejército 1",
    "postCode": "28047",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Gta del Ejército 1"
  },
  {
    "id": "4-99",
    "name": "Eugenia De Montijo",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.38439,
      "long": -3.75121
    },
    "address": "Calle de Ocaña 86",
    "postCode": "28047",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Ocaña 86"
  },
  {
    "id": "4-100",
    "name": "Aluche",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.38563,
      "long": -3.7608
    },
    "address": "Calle de Valmojado 293",
    "postCode": "28047",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Valmojado 293"
  },
  {
    "id": "4-101",
    "name": "Empalme",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.39057,
      "long": -3.76535
    },
    "address": "Calle de Tembleque 105",
    "postCode": "28024",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Tembleque 105"
  },
  {
    "id": "4-102",
    "name": "Campamento",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.39481,
      "long": -3.76813
    },
    "address": "Avda del Padre Piquer 7",
    "postCode": "28024",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Avda del Padre Piquer 7"
  },
  {
    "id": "4-103",
    "name": "Casa De Campo",
    "lines": [
      "5",
      "10"
    ],
    "coordinates": {
      "lat": 40.40324,
      "long": -3.76101
    },
    "address": "Ctra del Zoo 1",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5, 10. Dirección: Ctra del Zoo 1"
  },
  {
    "id": "4-104",
    "name": "Laguna",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.39923,
      "long": -3.74429
    },
    "address": "Calle de Cuart de Poblet 1",
    "postCode": "28047",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle de Cuart de Poblet 1"
  },
  {
    "id": "4-105",
    "name": "Carpetana",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.3927,
      "long": -3.74099
    },
    "address": "Calle Vía Carpetana 141",
    "postCode": "28025",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle Vía Carpetana 141"
  },
  {
    "id": "4-107",
    "name": "Opañel",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.3869,
      "long": -3.72313
    },
    "address": "Calle del Valle de Oro 50 A",
    "postCode": "28019",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle del Valle de Oro 50 A"
  },
  {
    "id": "4-108",
    "name": "Plaza Eliptica",
    "lines": [
      "6",
      "11"
    ],
    "coordinates": {
      "lat": 40.3846,
      "long": -3.71837
    },
    "address": "Plaza de Fernández Ladreda 2",
    "postCode": "28025",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6, 11. Dirección: Plaza de Fernández Ladreda 2"
  },
  {
    "id": "4-109",
    "name": "Usera",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.3871,
      "long": -3.7069
    },
    "address": "Calle de Amparo Usera 44",
    "postCode": "28026",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle de Amparo Usera 44"
  },
  {
    "id": "4-111",
    "name": "Mendez Alvaro",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.39538,
      "long": -3.67814
    },
    "address": "Calle del Ombu 16",
    "postCode": "28045",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle del Ombu 16"
  },
  {
    "id": "4-113",
    "name": "Conde De Casal",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.40697,
      "long": -3.67041
    },
    "address": "Plaza del Conde de Casal 3",
    "postCode": "28007",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Plaza del Conde de Casal 3"
  },
  {
    "id": "4-114",
    "name": "Sainz De Baranda",
    "lines": [
      "6",
      "9"
    ],
    "coordinates": {
      "lat": 40.41507,
      "long": -3.66951
    },
    "address": "Calle del Doctor Esquerdo 103",
    "postCode": "28007",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6, 9. Dirección: Calle del Doctor Esquerdo 103"
  },
  {
    "id": "4-115",
    "name": "O'donnell",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.42289,
      "long": -3.6686
    },
    "address": "Calle del Doctor Esquerdo 47",
    "postCode": "28028",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle del Doctor Esquerdo 47"
  },
  {
    "id": "4-119",
    "name": "Republica Argentina",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.44379,
      "long": -3.68406
    },
    "address": "Calle de Joaquín Costa 24",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle de Joaquín Costa 24"
  },
  {
    "id": "4-120",
    "name": "Nuevos Ministerios",
    "lines": [
      "6",
      "8",
      "10"
    ],
    "coordinates": {
      "lat": 40.44662,
      "long": -3.69241
    },
    "address": "Calle de Raimundo Fernández Villaverde 67",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6, 8, 10. Dirección: Calle de Raimundo Fernández Villaverde 67"
  },
  {
    "id": "4-122",
    "name": "Guzman El Bueno",
    "lines": [
      "6",
      "7"
    ],
    "coordinates": {
      "lat": 40.44637,
      "long": -3.71229
    },
    "address": "Calle de Guzmán el Bueno 118",
    "postCode": "28003",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6, 7. Dirección: Calle de Guzmán el Bueno 118"
  },
  {
    "id": "4-123",
    "name": "Vicente Aleixandre",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.44644,
      "long": -3.71943
    },
    "address": "Avda de Gregorio del Amo 4",
    "postCode": "28040",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Avda de Gregorio del Amo 4"
  },
  {
    "id": "4-124",
    "name": "Ciudad Universitaria",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.44356,
      "long": -3.72678
    },
    "address": "Avda Complutense 1",
    "postCode": "28040",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Avda Complutense 1"
  },
  {
    "id": "4-127",
    "name": "Principe Pio",
    "lines": [
      "6",
      "10",
      "R"
    ],
    "coordinates": {
      "lat": 40.42107,
      "long": -3.72032
    },
    "address": "Paseo de la Florida 2",
    "postCode": "28008",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6, 10, R. Dirección: Paseo de la Florida 2"
  },
  {
    "id": "4-128",
    "name": "Puerta Del Angel",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.4139,
      "long": -3.72724
    },
    "address": "Plaza de Santa Cristina 1",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Plaza de Santa Cristina 1"
  },
  {
    "id": "4-129",
    "name": "Alto De Extremadura",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.40993,
      "long": -3.73894
    },
    "address": "Paseo de Extremadura 154",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Paseo de Extremadura 154"
  },
  {
    "id": "4-130",
    "name": "Lucero",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.4051,
      "long": -3.74534
    },
    "address": "Calle de las Higueras 47",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle de las Higueras 47"
  },
  {
    "id": "4-132",
    "name": "Las Musas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43299,
      "long": -3.60788
    },
    "address": "Avda de Niza 61",
    "postCode": "28022",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Avda de Niza 61"
  },
  {
    "id": "4-133",
    "name": "San Blas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42799,
      "long": -3.61547
    },
    "address": "Calle de Pobladura del Valle 27",
    "postCode": "28037",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Pobladura del Valle 27"
  },
  {
    "id": "4-134",
    "name": "Simancas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42799,
      "long": -3.62572
    },
    "address": "Calle del Castillo de Madrigal de las Altas Torres 15",
    "postCode": "28037",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle del Castillo de Madrigal de las Altas Torres 15"
  },
  {
    "id": "4-135",
    "name": "Garcia Noblejas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42842,
      "long": -3.6333
    },
    "address": "Calle de Tinajo 2",
    "postCode": "28017",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Tinajo 2"
  },
  {
    "id": "4-136",
    "name": "Ascao",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43021,
      "long": -3.64106
    },
    "address": "Calle de Ascao 29",
    "postCode": "28017",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Ascao 29"
  },
  {
    "id": "4-138",
    "name": "Barrio De La Concepcion",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.4391,
      "long": -3.652
    },
    "address": "Calle de Martínez Villergas 1",
    "postCode": "28027",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Martínez Villergas 1"
  },
  {
    "id": "4-139",
    "name": "Parque De Las Avenidas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43945,
      "long": -3.66297
    },
    "address": "Avda de Bruselas 56",
    "postCode": "28028",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Avda de Bruselas 56"
  },
  {
    "id": "4-140",
    "name": "Cartagena",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43934,
      "long": -3.67215
    },
    "address": "Avda de América 35",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Avda de América 35"
  },
  {
    "id": "4-142",
    "name": "Gregorio Marañon",
    "lines": [
      "7",
      "10"
    ],
    "coordinates": {
      "lat": 40.43825,
      "long": -3.69148
    },
    "address": "Calle de José Abascal 65",
    "postCode": "28003",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7, 10. Dirección: Calle de José Abascal 65"
  },
  {
    "id": "4-143",
    "name": "Alonso Cano",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43838,
      "long": -3.69925
    },
    "address": "Calle de José Abascal 18",
    "postCode": "28003",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de José Abascal 18"
  },
  {
    "id": "4-145",
    "name": "Islas Filipinas",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.43907,
      "long": -3.71373
    },
    "address": "Calle de Cea Bermúdez 54",
    "postCode": "28003",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Cea Bermúdez 54"
  },
  {
    "id": "4-147",
    "name": "Francos Rodriguez",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.45648,
      "long": -3.71239
    },
    "address": "Calle de Moguer 1",
    "postCode": "28039",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Moguer 1"
  },
  {
    "id": "4-148",
    "name": "Valdezarza",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.46482,
      "long": -3.71597
    },
    "address": "Calle de San Restituto 70",
    "postCode": "28039",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de San Restituto 70"
  },
  {
    "id": "4-149",
    "name": "Antonio Machado",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.47022,
      "long": -3.71769
    },
    "address": "Calle de Valderrodrigo 55",
    "postCode": "28039",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Valderrodrigo 55"
  },
  {
    "id": "4-150",
    "name": "Peñagrande",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.47592,
      "long": -3.71582
    },
    "address": "Cmno de Ganapanes 35",
    "postCode": "28029",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Cmno de Ganapanes 35"
  },
  {
    "id": "4-151",
    "name": "Avenida De La Ilustracion",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.4801,
      "long": -3.7184
    },
    "address": "Calle de las Islas Cíes 23",
    "postCode": "28035",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de las Islas Cíes 23"
  },
  {
    "id": "4-152",
    "name": "Lacoma",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.48502,
      "long": -3.72305
    },
    "address": "Calle de Riscos de Polanco 3",
    "postCode": "28035",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Riscos de Polanco 3"
  },
  {
    "id": "4-153",
    "name": "Arroyofresno",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.4909,
      "long": -3.72604
    },
    "address": "Calle de Federica Montseny 90",
    "postCode": "28049",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Federica Montseny 90"
  },
  {
    "id": "4-154",
    "name": "Pitis",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.49511,
      "long": -3.72589
    },
    "address": "Ctra a la Estación de Pitis 19",
    "postCode": "28035",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Ctra a la Estación de Pitis 19"
  },
  {
    "id": "4-156",
    "name": "Colombia",
    "lines": [
      "8",
      "9"
    ],
    "coordinates": {
      "lat": 40.45634,
      "long": -3.67682
    },
    "address": "Calle del Príncipe de Vergara 258",
    "postCode": "28016",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8, 9. Dirección: Calle del Príncipe de Vergara 258"
  },
  {
    "id": "4-158",
    "name": "Feria De Madrid",
    "lines": [
      "8"
    ],
    "coordinates": {
      "lat": 40.46389,
      "long": -3.6162
    },
    "address": "Avda del Partenón 5",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8. Dirección: Avda del Partenón 5"
  },
  {
    "id": "4-159",
    "name": "Aeropuerto T1 - T2 - T3",
    "lines": [
      "8"
    ],
    "coordinates": {
      "lat": 40.46864,
      "long": -3.56954
    },
    "address": "Avda de la Hispanidad SN",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8. Dirección: Avda de la Hispanidad SN"
  },
  {
    "id": "4-160",
    "name": "Barajas",
    "lines": [
      "8"
    ],
    "coordinates": {
      "lat": 40.47577,
      "long": -3.58253
    },
    "address": "Cmno Viejo de Hortaleza 10",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8. Dirección: Cmno Viejo de Hortaleza 10"
  },
  {
    "id": "4-161",
    "name": "Herrera Oria",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.48466,
      "long": -3.70751
    },
    "address": "Calle de Valencia de Don Juan 1",
    "postCode": "28034",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Valencia de Don Juan 1"
  },
  {
    "id": "4-162",
    "name": "Barrio Del Pilar",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.47689,
      "long": -3.70316
    },
    "address": "Calle de Ginzo de Limia 22",
    "postCode": "28029",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Ginzo de Limia 22"
  },
  {
    "id": "4-163",
    "name": "Ventilla",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.46944,
      "long": -3.69588
    },
    "address": "Calle de Vizcaínos 25",
    "postCode": "28029",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Vizcaínos 25"
  },
  {
    "id": "4-165",
    "name": "Duque De Pastrana",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.46763,
      "long": -3.67917
    },
    "address": "Calle de Mateo Inurria 41",
    "postCode": "28036",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Mateo Inurria 41"
  },
  {
    "id": "4-166",
    "name": "Pio Xii",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.463,
      "long": -3.67579
    },
    "address": "Avda de Pío XII 27",
    "postCode": "28016",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Avda de Pío XII 27"
  },
  {
    "id": "4-168",
    "name": "Concha Espina",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.45145,
      "long": -3.67738
    },
    "address": "Calle del Príncipe de Vergara 210",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle del Príncipe de Vergara 210"
  },
  {
    "id": "4-169",
    "name": "Cruz Del Rayo",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.44427,
      "long": -3.67821
    },
    "address": "Calle del Príncipe de Vergara 138",
    "postCode": "28002",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle del Príncipe de Vergara 138"
  },
  {
    "id": "4-173",
    "name": "Ibiza",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.41839,
      "long": -3.67858
    },
    "address": "Calle de Ibiza 1",
    "postCode": "28009",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Ibiza 1"
  },
  {
    "id": "4-175",
    "name": "Estrella",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.41147,
      "long": -3.66179
    },
    "address": "Calle del Camino de los Vinateros 1",
    "postCode": "28030",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle del Camino de los Vinateros 1"
  },
  {
    "id": "4-176",
    "name": "Vinateros",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.41024,
      "long": -3.65273
    },
    "address": "Calle del Camino de los Vinateros 70",
    "postCode": "28030",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle del Camino de los Vinateros 70"
  },
  {
    "id": "4-177",
    "name": "Artilleros",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40522,
      "long": -3.64181
    },
    "address": "Calle del Camino de los Vinateros 210",
    "postCode": "28030",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle del Camino de los Vinateros 210"
  },
  {
    "id": "4-178",
    "name": "Pavones",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40051,
      "long": -3.63512
    },
    "address": "Calle de la Hacienda de Pavones 342",
    "postCode": "28030",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de la Hacienda de Pavones 342"
  },
  {
    "id": "4-179",
    "name": "Valdebernardo",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40005,
      "long": -3.62156
    },
    "address": "Bulv de Indalecio Prieto 26",
    "postCode": "28032",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Bulv de Indalecio Prieto 26"
  },
  {
    "id": "4-180",
    "name": "Vicalvaro",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40422,
      "long": -3.60886
    },
    "address": "Calle de San Cipriano 11",
    "postCode": "28032",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de San Cipriano 11"
  },
  {
    "id": "4-181",
    "name": "San Cipriano",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40381,
      "long": -3.60239
    },
    "address": "Calle de San Cipriano 68",
    "postCode": "28032",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de San Cipriano 68"
  },
  {
    "id": "4-182",
    "name": "Puerta De Arganda",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.40132,
      "long": -3.59598
    },
    "address": "Calle de San Cipriano 85",
    "postCode": "28032",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de San Cipriano 85"
  },
  {
    "id": "4-183",
    "name": "Rivas Urbanizaciones",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.36677,
      "long": -3.54728
    },
    "address": "Plaza de Galicia 5",
    "postCode": "28523",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Plaza de Galicia 5"
  },
  {
    "id": "4-184",
    "name": "Rivas Vaciamadrid",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.32837,
      "long": -3.5206
    },
    "address": "Calle Areneros 6",
    "postCode": "28521",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle Areneros 6"
  },
  {
    "id": "4-185",
    "name": "La Poveda",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.31902,
      "long": -3.47745
    },
    "address": "Parcela 9017 Polígono 1 S/N",
    "postCode": "28500",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Parcela 9017 Polígono 1 S/N"
  },
  {
    "id": "4-186",
    "name": "Arganda Del Rey",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.30367,
      "long": -3.44752
    },
    "address": "Paseo de la Estación 37",
    "postCode": "28500",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Paseo de la Estación 37"
  },
  {
    "id": "4-187",
    "name": "Fuencarral",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.49509,
      "long": -3.69283
    },
    "address": "Calle de la Fuente Chica 21",
    "postCode": "28034",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle de la Fuente Chica 21"
  },
  {
    "id": "4-188",
    "name": "Begoña",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.48041,
      "long": -3.68585
    },
    "address": "Paseo de la Castellana 261",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo de la Castellana 261"
  },
  {
    "id": "4-189",
    "name": "Chamartin",
    "lines": [
      "1",
      "10"
    ],
    "coordinates": {
      "lat": 40.4721,
      "long": -3.68259
    },
    "address": "Calle de Agustín de Foxá 40",
    "postCode": "28036",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 10. Dirección: Calle de Agustín de Foxá 40"
  },
  {
    "id": "4-191",
    "name": "Cuzco",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.45842,
      "long": -3.68985
    },
    "address": "Paseo de la Castellana 162",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo de la Castellana 162"
  },
  {
    "id": "4-192",
    "name": "Santiago Bernabeu",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.45159,
      "long": -3.69038
    },
    "address": "Paseo de la Castellana 97",
    "postCode": "28046",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo de la Castellana 97"
  },
  {
    "id": "4-199",
    "name": "Lago",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.41641,
      "long": -3.73563
    },
    "address": "Ronda del Lago 3",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Ronda del Lago 3"
  },
  {
    "id": "4-200",
    "name": "Batan",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.40786,
      "long": -3.75311
    },
    "address": "Paseo de la Venta 1",
    "postCode": "28011",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo de la Venta 1"
  },
  {
    "id": "4-202",
    "name": "Colonia Jardin",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.39698,
      "long": -3.77462
    },
    "address": "Calle de Arenas de San Pedro 2",
    "postCode": "28024",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle de Arenas de San Pedro 2"
  },
  {
    "id": "4-203",
    "name": "Cuatro Vientos",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.37771,
      "long": -3.79152
    },
    "address": "Col Militar de Cuatro Vientos 6 B",
    "postCode": "28024",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Col Militar de Cuatro Vientos 6 B"
  },
  {
    "id": "4-204",
    "name": "Joaquin Vilumbrales",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.34985,
      "long": -3.8072
    },
    "address": "Avda de la Libertad 13",
    "postCode": "28925",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Avda de la Libertad 13"
  },
  {
    "id": "4-205",
    "name": "Puerta Del Sur",
    "lines": [
      "10",
      "12"
    ],
    "coordinates": {
      "lat": 40.34524,
      "long": -3.81211
    },
    "address": "Avda de la Libertad 2",
    "postCode": "28924",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10, 12. Dirección: Avda de la Libertad 2"
  },
  {
    "id": "4-207",
    "name": "Abrantes",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.38083,
      "long": -3.7279
    },
    "address": "Avda de Abrantes 77",
    "postCode": "28025",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Avda de Abrantes 77"
  },
  {
    "id": "4-208",
    "name": "Pan Bendito",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.37587,
      "long": -3.73417
    },
    "address": "Avda de Abrantes 289",
    "postCode": "28025",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Avda de Abrantes 289"
  },
  {
    "id": "4-210",
    "name": "Parque Lisboa",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.34969,
      "long": -3.8212
    },
    "address": "Calle de Porto Lagos 7",
    "postCode": "28924",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de Porto Lagos 7"
  },
  {
    "id": "4-211",
    "name": "Alcorcon Central",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.35008,
      "long": -3.83178
    },
    "address": "Avda de Móstoles 12",
    "postCode": "28922",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda de Móstoles 12"
  },
  {
    "id": "4-212",
    "name": "Parque Oeste",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.34589,
      "long": -3.84934
    },
    "address": "Calle de Estambul 5",
    "postCode": "28922",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de Estambul 5"
  },
  {
    "id": "4-213",
    "name": "Universidad Rey Juan Carlos",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.33512,
      "long": -3.87218
    },
    "address": "Calle Tulipán 2",
    "postCode": "28933",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle Tulipán 2"
  },
  {
    "id": "4-214",
    "name": "Mostoles Central",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.3285,
      "long": -3.86354
    },
    "address": "Paseo de la Estación 13",
    "postCode": "28933",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Paseo de la Estación 13"
  },
  {
    "id": "4-215",
    "name": "Pradillo",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.32168,
      "long": -3.86489
    },
    "address": "Calle de Agustina de Aragón 23",
    "postCode": "28931",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de Agustina de Aragón 23"
  },
  {
    "id": "4-216",
    "name": "Hospital De Mostoles",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.31652,
      "long": -3.87471
    },
    "address": "Calle del Río Sella 10",
    "postCode": "28934",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle del Río Sella 10"
  },
  {
    "id": "4-217",
    "name": "Manuela Malasaña",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.30903,
      "long": -3.86402
    },
    "address": "Plaza Sol de 9001 SN",
    "postCode": "28938",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Plaza Sol de 9001 SN"
  },
  {
    "id": "4-218",
    "name": "Loranca",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.29681,
      "long": -3.83768
    },
    "address": "Calle de la Alegría 4",
    "postCode": "28942",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de la Alegría 4"
  },
  {
    "id": "4-219",
    "name": "Hospital De Fuenlabrada",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.28576,
      "long": -3.81642
    },
    "address": "Cmno del Molino 3",
    "postCode": "28942",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Cmno del Molino 3"
  },
  {
    "id": "4-220",
    "name": "Parque Europa",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.28518,
      "long": -3.80632
    },
    "address": "Calle de Francia 34",
    "postCode": "28943",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de Francia 34"
  },
  {
    "id": "4-221",
    "name": "Fuenlabrada Central",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.28268,
      "long": -3.79891
    },
    "address": "Calle de la Vía SN",
    "postCode": "28944",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de la Vía SN"
  },
  {
    "id": "4-222",
    "name": "Parque De Los Estados",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.28684,
      "long": -3.78697
    },
    "address": "Calle de Venezuela 2",
    "postCode": "28945",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle de Venezuela 2"
  },
  {
    "id": "4-223",
    "name": "Arroyo Culebro",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.28874,
      "long": -3.75682
    },
    "address": "Paseo de Juan José Rosón 1",
    "postCode": "28905",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Paseo de Juan José Rosón 1"
  },
  {
    "id": "4-224",
    "name": "Conservatorio",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.29324,
      "long": -3.74576
    },
    "address": "Avda de las Arcas del Agua 5",
    "postCode": "28905",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda de las Arcas del Agua 5"
  },
  {
    "id": "4-225",
    "name": "Alonso De Mendoza",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.30081,
      "long": -3.73664
    },
    "address": "Calle del Greco 6",
    "postCode": "28904",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle del Greco 6"
  },
  {
    "id": "4-226",
    "name": "Getafe Central",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.30993,
      "long": -3.73403
    },
    "address": "Calle Ferrocarril 2",
    "postCode": "28904",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle Ferrocarril 2"
  },
  {
    "id": "4-227",
    "name": "Juan De La Cierva",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.3118,
      "long": -3.72224
    },
    "address": "Avda de España 20",
    "postCode": "28903",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda de España 20"
  },
  {
    "id": "4-228",
    "name": "El Casar",
    "lines": [
      "3",
      "12"
    ],
    "coordinates": {
      "lat": 40.31862,
      "long": -3.70985
    },
    "address": "Avda del Casar 2",
    "postCode": "28903",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3, 12. Dirección: Avda del Casar 2"
  },
  {
    "id": "4-229",
    "name": "Los Espartales",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.32423,
      "long": -3.7182
    },
    "address": "Avda Rigoberta Menchú 3",
    "postCode": "28903",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Rigoberta Menchú 3"
  },
  {
    "id": "4-230",
    "name": "El Bercial",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.32907,
      "long": -3.72963
    },
    "address": "Avda Comandante José Manuel Ripollés 4",
    "postCode": "28905",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Comandante José Manuel Ripollés 4"
  },
  {
    "id": "4-231",
    "name": "El Carrascal",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.33664,
      "long": -3.74018
    },
    "address": "Avda Rey Juan Carlos I 85",
    "postCode": "28916",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Rey Juan Carlos I 85"
  },
  {
    "id": "4-232",
    "name": "Julian Besteiro",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.33475,
      "long": -3.75266
    },
    "address": "Avda Rey Juan Carlos I 23 A",
    "postCode": "28915",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Rey Juan Carlos I 23 A"
  },
  {
    "id": "4-233",
    "name": "Casa Del Reloj",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.3266,
      "long": -3.75942
    },
    "address": "Avda Gibraltar 11",
    "postCode": "28914",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Gibraltar 11"
  },
  {
    "id": "4-234",
    "name": "Hospital Severo Ochoa",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.32177,
      "long": -3.76797
    },
    "address": "Avda Orellana 3",
    "postCode": "28914",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Orellana 3"
  },
  {
    "id": "4-235",
    "name": "Leganes Central",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.32899,
      "long": -3.77154
    },
    "address": "Calle Virgen del Camino 1",
    "postCode": "28913",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Calle Virgen del Camino 1"
  },
  {
    "id": "4-236",
    "name": "San Nicasio",
    "lines": [
      "12"
    ],
    "coordinates": {
      "lat": 40.33616,
      "long": -3.77587
    },
    "address": "Avda Mar Mediterráneo SN",
    "postCode": "28918",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 12. Dirección: Avda Mar Mediterráneo SN"
  },
  {
    "id": "4-252",
    "name": "Alameda De Osuna",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.45779,
      "long": -3.58752
    },
    "address": "Paseo de la Vía Verde de la Gasolina 27",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Paseo de la Vía Verde de la Gasolina 27"
  },
  {
    "id": "4-253",
    "name": "El Capricho",
    "lines": [
      "5"
    ],
    "coordinates": {
      "lat": 40.45347,
      "long": -3.59401
    },
    "address": "Calle de Pinos de Osuna 15",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 5. Dirección: Calle de Pinos de Osuna 15"
  },
  {
    "id": "4-254",
    "name": "San Francisco",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.3736,
      "long": -3.7391
    },
    "address": "Avda de los Poblados 102",
    "postCode": "28054",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Avda de los Poblados 102"
  },
  {
    "id": "4-255",
    "name": "Carabanchel Alto",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.372,
      "long": -3.75191
    },
    "address": "Avda de Carabanchel Alto 40",
    "postCode": "28054",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Avda de Carabanchel Alto 40"
  },
  {
    "id": "4-256",
    "name": "La Peseta",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.36422,
      "long": -3.7569
    },
    "address": "Calle de Salvador Allende 3",
    "postCode": "28054",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Calle de Salvador Allende 3"
  },
  {
    "id": "4-257",
    "name": "Aviacion Española",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.38364,
      "long": -3.78392
    },
    "address": "Paseo de Extremadura 463",
    "postCode": "28024",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo de Extremadura 463"
  },
  {
    "id": "4-258",
    "name": "Pinar Del Rey",
    "lines": [
      "8"
    ],
    "coordinates": {
      "lat": 40.468,
      "long": -3.64867
    },
    "address": "Avda de la Gran Vía de Hortaleza 47",
    "postCode": "28043",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8. Dirección: Avda de la Gran Vía de Hortaleza 47"
  },
  {
    "id": "4-259",
    "name": "Arganzuela - Planetario",
    "lines": [
      "6"
    ],
    "coordinates": {
      "lat": 40.3931,
      "long": -3.68864
    },
    "address": "Calle del Bronce 1 A",
    "postCode": "28045",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 6. Dirección: Calle del Bronce 1 A"
  },
  {
    "id": "4-260",
    "name": "La Elipa",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42662,
      "long": -3.65052
    },
    "address": "Avda del Marqués de Corbera 58",
    "postCode": "28017",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Avda del Marqués de Corbera 58"
  },
  {
    "id": "4-262",
    "name": "Bambu",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.47682,
      "long": -3.67637
    },
    "address": "Calle del Bambú 14",
    "postCode": "28036",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle del Bambú 14"
  },
  {
    "id": "4-263",
    "name": "Pinar De Chamartin",
    "lines": [
      "1",
      "4"
    ],
    "coordinates": {
      "lat": 40.48014,
      "long": -3.6668
    },
    "address": "Calle de la Cultura 11",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1, 4. Dirección: Calle de la Cultura 11"
  },
  {
    "id": "4-264",
    "name": "Hortaleza",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.47537,
      "long": -3.65257
    },
    "address": "Calle del Capitán Cortés 4",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle del Capitán Cortés 4"
  },
  {
    "id": "4-265",
    "name": "Manoteras",
    "lines": [
      "4"
    ],
    "coordinates": {
      "lat": 40.47687,
      "long": -3.6629
    },
    "address": "Calle de Bacares 24",
    "postCode": "28033",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 4. Dirección: Calle de Bacares 24"
  },
  {
    "id": "4-267",
    "name": "Almendrales",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.38409,
      "long": -3.69788
    },
    "address": "Avda de Córdoba 21",
    "postCode": "28026",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Avda de Córdoba 21"
  },
  {
    "id": "4-268",
    "name": "Hospital 12 De Octubre",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.37503,
      "long": -3.69585
    },
    "address": "Avda de Córdoba 49",
    "postCode": "28041",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Avda de Córdoba 49"
  },
  {
    "id": "4-269",
    "name": "San Fermin - Orcasur",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.36999,
      "long": -3.69418
    },
    "address": "Avda de la Perla 35",
    "postCode": "28041",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Avda de la Perla 35"
  },
  {
    "id": "4-270",
    "name": "Ciudad De Los Angeles",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.35959,
      "long": -3.69363
    },
    "address": "Paseo de Gigantes y Cabezudos 14",
    "postCode": "28041",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Paseo de Gigantes y Cabezudos 14"
  },
  {
    "id": "4-271",
    "name": "Villaverde Bajo Cruce",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.35089,
      "long": -3.69265
    },
    "address": "Avda de Andalucía 38",
    "postCode": "28021",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Avda de Andalucía 38"
  },
  {
    "id": "4-272",
    "name": "San Cristobal",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.34154,
      "long": -3.69318
    },
    "address": "Avda de Andalucía 81",
    "postCode": "28021",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Avda de Andalucía 81"
  },
  {
    "id": "4-273",
    "name": "Villaverde Alto",
    "lines": [
      "3"
    ],
    "coordinates": {
      "lat": 40.34123,
      "long": -3.71199
    },
    "address": "Calle del Valle de Tobalina 56",
    "postCode": "28021",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 3. Dirección: Calle del Valle de Tobalina 56"
  },
  {
    "id": "4-274",
    "name": "Tres Olivos",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.5012,
      "long": -3.6952
    },
    "address": "Calle de Afueras a Valverde 56",
    "postCode": "28034",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle de Afueras a Valverde 56"
  },
  {
    "id": "4-275",
    "name": "Montecarmelo",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.50525,
      "long": -3.69575
    },
    "address": "Avda de Monasterio de Silos 63 A",
    "postCode": "28049",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Avda de Monasterio de Silos 63 A"
  },
  {
    "id": "4-276",
    "name": "Las Tablas",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.50833,
      "long": -3.66944
    },
    "address": "Calle de Palas de Rey 30",
    "postCode": "28050",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle de Palas de Rey 30"
  },
  {
    "id": "4-277",
    "name": "Ronda De La Comunicacion",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.51553,
      "long": -3.66277
    },
    "address": "Ronda de la Comunicación 22",
    "postCode": "28050",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Ronda de la Comunicación 22"
  },
  {
    "id": "4-278",
    "name": "La Granja",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.5276,
      "long": -3.65859
    },
    "address": "Calle de Sepúlveda 1",
    "postCode": "28108",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle de Sepúlveda 1"
  },
  {
    "id": "4-279",
    "name": "La Moraleja",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.53196,
      "long": -3.63556
    },
    "address": "Avda de la Ermita 5",
    "postCode": "28109",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Avda de la Ermita 5"
  },
  {
    "id": "4-280",
    "name": "Marques De La Valdavia",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.54102,
      "long": -3.63738
    },
    "address": "Calle del Marqués de la Valdavia 21",
    "postCode": "28100",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle del Marqués de la Valdavia 21"
  },
  {
    "id": "4-281",
    "name": "Manuel De Falla",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.55048,
      "long": -3.64688
    },
    "address": "Calle Manuel de Falla 59",
    "postCode": "28100",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Calle Manuel de Falla 59"
  },
  {
    "id": "4-282",
    "name": "Baunatal",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.55442,
      "long": -3.63513
    },
    "address": "Avda de las Lomas del Rey 2",
    "postCode": "28701",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Avda de las Lomas del Rey 2"
  },
  {
    "id": "4-283",
    "name": "Reyes Catolicos",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.55037,
      "long": -3.6234
    },
    "address": "Avda de la Plaza de Toros 7",
    "postCode": "28701",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Avda de la Plaza de Toros 7"
  },
  {
    "id": "4-284",
    "name": "Hospital Infanta Sofia",
    "lines": [
      "10"
    ],
    "coordinates": {
      "lat": 40.55977,
      "long": -3.61145
    },
    "address": "Paseo Europa 11",
    "postCode": "28702",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 10. Dirección: Paseo Europa 11"
  },
  {
    "id": "4-285",
    "name": "Aeropuerto T - 4",
    "lines": [
      "8"
    ],
    "coordinates": {
      "lat": 40.49177,
      "long": -3.59325
    },
    "address": "Ctra de Alcobendas a Barajas SN",
    "postCode": "28042",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 8. Dirección: Ctra de Alcobendas a Barajas SN"
  },
  {
    "id": "4-286",
    "name": "Estadio Metropolitano",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.4334,
      "long": -3.60017
    },
    "address": "Ctra de San Blas a Coslada 3",
    "postCode": "28022",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Ctra de San Blas a Coslada 3"
  },
  {
    "id": "4-287",
    "name": "Barrio Del Puerto",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.4225,
      "long": -3.56919
    },
    "address": "Avda de España 8",
    "postCode": "28821",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Avda de España 8"
  },
  {
    "id": "4-288",
    "name": "Coslada Central",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42374,
      "long": -3.56119
    },
    "address": "Calle del Doctor Fleming 41",
    "postCode": "28821",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle del Doctor Fleming 41"
  },
  {
    "id": "4-289",
    "name": "La Rambla",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42514,
      "long": -3.54792
    },
    "address": "Calle Honduras 2",
    "postCode": "28823",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle Honduras 2"
  },
  {
    "id": "4-290",
    "name": "San Fernando",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42441,
      "long": -3.53541
    },
    "address": "Calle de Gonzalo de Córdoba 24",
    "postCode": "28830",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Calle de Gonzalo de Córdoba 24"
  },
  {
    "id": "4-291",
    "name": "Jarama",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.42295,
      "long": -3.52549
    },
    "address": "Plaza Guernica 1",
    "postCode": "28830",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Plaza Guernica 1"
  },
  {
    "id": "4-292",
    "name": "Henares",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.41777,
      "long": -3.52718
    },
    "address": "Avda de Algorta 12",
    "postCode": "28830",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Avda de Algorta 12"
  },
  {
    "id": "4-293",
    "name": "La Gavia",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.37019,
      "long": -3.61346
    },
    "address": "Avda del Ensanche de Vallecas 16",
    "postCode": "28051",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda del Ensanche de Vallecas 16"
  },
  {
    "id": "4-294",
    "name": "Las Suertes",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.36323,
      "long": -3.59953
    },
    "address": "Calle de Cañada del Santísimo 45",
    "postCode": "28031",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Calle de Cañada del Santísimo 45"
  },
  {
    "id": "4-295",
    "name": "Valdecarros",
    "lines": [
      "1"
    ],
    "coordinates": {
      "lat": 40.36007,
      "long": -3.59316
    },
    "address": "Avda del Ensanche de Vallecas 120 A",
    "postCode": "28031",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 1. Dirección: Avda del Ensanche de Vallecas 120 A"
  },
  {
    "id": "4-296",
    "name": "Hospital Del Henares",
    "lines": [
      "7"
    ],
    "coordinates": {
      "lat": 40.41761,
      "long": -3.53453
    },
    "address": "Cmno del Tiro SN",
    "postCode": "28822",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 7. Dirección: Cmno del Tiro SN"
  },
  {
    "id": "4-300",
    "name": "Rivas Futura",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.34134,
      "long": -3.52479
    },
    "address": "Calle Concepción Arenal 1",
    "postCode": "28521",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle Concepción Arenal 1"
  },
  {
    "id": "4-305",
    "name": "La Fortuna",
    "lines": [
      "11"
    ],
    "coordinates": {
      "lat": 40.35795,
      "long": -3.77783
    },
    "address": "Calle San José 40",
    "postCode": "28917",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 11. Dirección: Calle San José 40"
  },
  {
    "id": "4-322",
    "name": "La Almudena",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42361,
      "long": -3.63914
    },
    "address": "Calle de Arriaga 75",
    "postCode": "28017",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Calle de Arriaga 75"
  },
  {
    "id": "4-323",
    "name": "Alsacia",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.41829,
      "long": -3.62351
    },
    "address": "Plaza de Alsacia S/N",
    "postCode": "28037",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Plaza de Alsacia S/N"
  },
  {
    "id": "4-324",
    "name": "Avenida De Guadalajara",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42239,
      "long": -3.61206
    },
    "address": "Avda de Guadalajara 110",
    "postCode": "28032",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Avda de Guadalajara 110"
  },
  {
    "id": "4-325",
    "name": "Las Rosas",
    "lines": [
      "2"
    ],
    "coordinates": {
      "lat": 40.42375,
      "long": -3.60331
    },
    "address": "Paseo de Ginebra 35",
    "postCode": "28022",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 2. Dirección: Paseo de Ginebra 35"
  },
  {
    "id": "4-326",
    "name": "Mirasierra",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.4911,
      "long": -3.71634
    },
    "address": "Avda del Ventisquero de la Condesa 28",
    "postCode": "28035",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Avda del Ventisquero de la Condesa 28"
  },
  {
    "id": "4-345",
    "name": "Paco De Lucia",
    "lines": [
      "9"
    ],
    "coordinates": {
      "lat": 40.49965,
      "long": -3.70908
    },
    "address": "Calle de Monasterio de Las Huelgas 5",
    "postCode": "28034",
    "network": "metro",
    "description": "Estación de Metro de Madrid, Línea(s) 9. Dirección: Calle de Monasterio de Las Huelgas 5"
  },
  {
    "id": "5-1",
    "name": "Las Águilas",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.38119,
      "long": -3.78027
    },
    "address": "Avda del General Fanjul 110",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda del General Fanjul 110"
  },
  {
    "id": "5-2",
    "name": "Alcalá De Henares",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.48903,
      "long": -3.36634
    },
    "address": "Calle Pedro Lainez 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle Pedro Lainez 2"
  },
  {
    "id": "5-3",
    "name": "Alcalá De Henares Universidad",
    "lines": [
      "C2",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.50534,
      "long": -3.33541
    },
    "address": "Ctra del Campus SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C8A, C8. Dirección: Ctra del Campus SN"
  },
  {
    "id": "5-4",
    "name": "Alcobendas - S. S. De Los Reyes",
    "lines": [
      "C4A"
    ],
    "coordinates": {
      "lat": 40.54657,
      "long": -3.63519
    },
    "address": "Plaza de Francisco Casillas 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A. Dirección: Plaza de Francisco Casillas 1"
  },
  {
    "id": "5-5",
    "name": "Alcorcón",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.35008,
      "long": -3.83173
    },
    "address": "Avda de Móstoles 12",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda de Móstoles 12"
  },
  {
    "id": "5-6",
    "name": "Alpedrete",
    "lines": [
      "C8"
    ],
    "coordinates": {
      "lat": 40.65816,
      "long": -4.03506
    },
    "address": "Cmno de la Estación 36",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8. Dirección: Cmno de la Estación 36"
  },
  {
    "id": "5-7",
    "name": "Aluche",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.38563,
      "long": -3.76074
    },
    "address": "Calle de Valmojado 293",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle de Valmojado 293"
  },
  {
    "id": "5-8",
    "name": "Aranjuez",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.03483,
      "long": -3.61831
    },
    "address": "Calle de la Estación 5",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Calle de la Estación 5"
  },
  {
    "id": "5-9",
    "name": "Aravaca",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.44833,
      "long": -3.78586
    },
    "address": "Calle de la Golondrina 104",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Calle de la Golondrina 104"
  },
  {
    "id": "5-10",
    "name": "Asamblea De Madrid - Entrevías",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.38167,
      "long": -3.668
    },
    "address": "Calle del Vizconde de Arlessón 45",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle del Vizconde de Arlessón 45"
  },
  {
    "id": "5-11",
    "name": "Madrid Atocha Cercanías",
    "lines": [
      "C2",
      "C3",
      "C4A",
      "C4B",
      "C5",
      "C7",
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.40659,
      "long": -3.6893
    },
    "address": "Avda de la Ciudad de Barcelona 2 B",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C3, C4A, C4B, C5, C7, C8A, C8, C10. Dirección: Avda de la Ciudad de Barcelona 2 B"
  },
  {
    "id": "5-12",
    "name": "Azuqueca",
    "lines": [
      "C2",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.56103,
      "long": -3.26546
    },
    "address": "Paseo de la Estacion SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C8A, C8. Dirección: Paseo de la Estacion SN"
  },
  {
    "id": "5-13",
    "name": "El Barrial - C. Com. Pozuelo",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.46537,
      "long": -3.80774
    },
    "address": "Via Ferrocarril SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Via Ferrocarril SN"
  },
  {
    "id": "5-15",
    "name": "Cantoblanco Universidad",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.54378,
      "long": -3.70034
    },
    "address": "Calle de Freud 3",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle de Freud 3"
  },
  {
    "id": "5-16",
    "name": "Cercedilla",
    "lines": [
      "C8",
      "C9"
    ],
    "coordinates": {
      "lat": 40.73757,
      "long": -4.0659
    },
    "address": "Calle del Cascajal 7",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8, C9. Dirección: Calle del Cascajal 7"
  },
  {
    "id": "5-18",
    "name": "Chamartín",
    "lines": [
      "C1",
      "C2",
      "C3",
      "C4A",
      "C4B",
      "C7",
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.4721,
      "long": -3.68247
    },
    "address": "Calle de Agustín de Foxá 40",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C1, C2, C3, C4A, C4B, C7, C8A, C8, C10. Dirección: Calle de Agustín de Foxá 40"
  },
  {
    "id": "5-19",
    "name": "Ciempozuelos",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.15906,
      "long": -3.61003
    },
    "address": "Avda de San Juan de Dios 7",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Avda de San Juan de Dios 7"
  },
  {
    "id": "5-20",
    "name": "Collado Mediano",
    "lines": [
      "C8"
    ],
    "coordinates": {
      "lat": 40.69276,
      "long": -4.03587
    },
    "address": "Paseo de los Rosales 47",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8. Dirección: Paseo de los Rosales 47"
  },
  {
    "id": "5-21",
    "name": "Colmenar Viejo",
    "lines": [
      "C4B"
    ],
    "coordinates": {
      "lat": 40.64497,
      "long": -3.77573
    },
    "address": "Calle de la Doctora Nogales de la Morena SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4B. Dirección: Calle de la Doctora Nogales de la Morena SN"
  },
  {
    "id": "5-22",
    "name": "Coslada",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.42374,
      "long": -3.56114
    },
    "address": "Calle de Luis Braille 8",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle de Luis Braille 8"
  },
  {
    "id": "5-23",
    "name": "Cotos",
    "lines": [
      "C9"
    ],
    "coordinates": {
      "lat": 40.82226,
      "long": -3.96452
    },
    "address": "Ctra M-604 (de la A-1 al Puerto de Navacerrada) 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C9. Dirección: Ctra M-604 (de la A-1 al Puerto de Navacerrada) 1"
  },
  {
    "id": "5-24",
    "name": "Cuatro Vientos",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.37771,
      "long": -3.79143
    },
    "address": "Paseo de Extremadura 567 A",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Paseo de Extremadura 567 A"
  },
  {
    "id": "5-25",
    "name": "Delicias",
    "lines": [
      "C10"
    ],
    "coordinates": {
      "lat": 40.40037,
      "long": -3.69277
    },
    "address": "Calle de Ramírez de Prado 3 B",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C10. Dirección: Calle de Ramírez de Prado 3 B"
  },
  {
    "id": "5-26",
    "name": "Doce De Octubre",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.37896,
      "long": -3.69861
    },
    "address": "Avda de Córdoba 39",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda de Córdoba 39"
  },
  {
    "id": "5-28",
    "name": "Embajadores",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.40513,
      "long": -3.70262
    },
    "address": "Gta de Embajadores 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Gta de Embajadores 1"
  },
  {
    "id": "5-29",
    "name": "El Escorial",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.58527,
      "long": -4.13233
    },
    "address": "Calle Estación Renfe 5",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Calle Estación Renfe 5"
  },
  {
    "id": "5-30",
    "name": "Maestra Justa Freire - Polideportivo Aluche",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.38365,
      "long": -3.76856
    },
    "address": "Avda de las Águilas 27",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda de las Águilas 27"
  },
  {
    "id": "5-31",
    "name": "Fuencarral",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.50156,
      "long": -3.68234
    },
    "address": "Calle de Antonio de Cabezón 10",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle de Antonio de Cabezón 10"
  },
  {
    "id": "5-32",
    "name": "Fuenlabrada",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.28268,
      "long": -3.79885
    },
    "address": "Plaza Constitución 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Plaza Constitución 1"
  },
  {
    "id": "5-33",
    "name": "Galapagar - La Navata",
    "lines": [
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.60011,
      "long": -3.98185
    },
    "address": "Ctra de Galapagar-La Navata 154",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A, C8, C10. Dirección: Ctra de Galapagar-La Navata 154"
  },
  {
    "id": "5-34",
    "name": "Getafe Centro",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.3101,
      "long": -3.73394
    },
    "address": "Calle Ferrocarril 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle Ferrocarril 2"
  },
  {
    "id": "5-35",
    "name": "Getafe Industrial",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.30548,
      "long": -3.70769
    },
    "address": "Paseo de John Lennon 15400",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Paseo de John Lennon 15400"
  },
  {
    "id": "5-36",
    "name": "Getafe Sector 3",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.28824,
      "long": -3.73734
    },
    "address": "Calle del Cementerio Municipal SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle del Cementerio Municipal SN"
  },
  {
    "id": "5-37",
    "name": "El Goloso",
    "lines": [
      "C4B"
    ],
    "coordinates": {
      "lat": 40.55857,
      "long": -3.71407
    },
    "address": "Ctra de Colmenar Viejo SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4B. Dirección: Ctra de Colmenar Viejo SN"
  },
  {
    "id": "5-38",
    "name": "Guadalajara",
    "lines": [
      "C2",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.64408,
      "long": -3.18239
    },
    "address": "Plaza de la Estación SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C8A, C8. Dirección: Plaza de la Estación SN"
  },
  {
    "id": "5-40",
    "name": "Laguna",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.39918,
      "long": -3.74422
    },
    "address": "Calle de Cuart de Poblet 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle de Cuart de Poblet 1"
  },
  {
    "id": "5-41",
    "name": "Leganes",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.32899,
      "long": -3.77148
    },
    "address": "Calle Virgen del Camino 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle Virgen del Camino 1"
  },
  {
    "id": "5-42",
    "name": "Majadahonda",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.47428,
      "long": -3.84534
    },
    "address": "Cmno Estación del Plantío 6",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Cmno Estación del Plantío 6"
  },
  {
    "id": "5-43",
    "name": "Las Margaritas - Universidad",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.32304,
      "long": -3.72737
    },
    "address": "Calle Madrid 152",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle Madrid 152"
  },
  {
    "id": "5-44",
    "name": "Las Matas",
    "lines": [
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.55252,
      "long": -3.89683
    },
    "address": "Plaza del Ferrocarril 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A, C8, C10. Dirección: Plaza del Ferrocarril 1"
  },
  {
    "id": "5-45",
    "name": "Meco",
    "lines": [
      "C2",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.53462,
      "long": -3.29866
    },
    "address": "Trva de la Calera 3",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C8A, C8. Dirección: Trva de la Calera 3"
  },
  {
    "id": "5-46",
    "name": "Méndez Álvaro",
    "lines": [
      "C5",
      "C10"
    ],
    "coordinates": {
      "lat": 40.39538,
      "long": -3.67808
    },
    "address": "Calle del Ombu 16",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5, C10. Dirección: Calle del Ombu 16"
  },
  {
    "id": "5-47",
    "name": "Los Molinos",
    "lines": [
      "C8"
    ],
    "coordinates": {
      "lat": 40.70734,
      "long": -4.06681
    },
    "address": "Gta de la Estación 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8. Dirección: Gta de la Estación 2"
  },
  {
    "id": "5-48",
    "name": "Móstoles",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.3285,
      "long": -3.86349
    },
    "address": "Paseo de la Estación 13",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Paseo de la Estación 13"
  },
  {
    "id": "5-49",
    "name": "Móstoles El Soto",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.33089,
      "long": -3.88234
    },
    "address": "Calle Granada 17",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle Granada 17"
  },
  {
    "id": "5-50",
    "name": "Los Negrales",
    "lines": [
      "C8"
    ],
    "coordinates": {
      "lat": 40.63858,
      "long": -4.02189
    },
    "address": "Avda de la Reina Victoria 47",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8. Dirección: Avda de la Reina Victoria 47"
  },
  {
    "id": "5-51",
    "name": "Nuevos Ministerios",
    "lines": [
      "C2",
      "C3",
      "C4A",
      "C4B",
      "C7",
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.44662,
      "long": -3.69234
    },
    "address": "Calle de Raimundo Fernández Villaverde 67",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C3, C4A, C4B, C7, C8A, C8, C10. Dirección: Calle de Raimundo Fernández Villaverde 67"
  },
  {
    "id": "5-52",
    "name": "Orcasitas",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.36691,
      "long": -3.70442
    },
    "address": "Calle de Campotejar 24",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle de Campotejar 24"
  },
  {
    "id": "5-53",
    "name": "Parla",
    "lines": [
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.24077,
      "long": -3.76936
    },
    "address": "Calle Real 81",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B. Dirección: Calle Real 81"
  },
  {
    "id": "5-55",
    "name": "Pinar De Las Rozas",
    "lines": [
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.5223,
      "long": -3.88216
    },
    "address": "Lugar Estación Ferrocarril El Pinar 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A, C8, C10. Dirección: Lugar Estación Ferrocarril El Pinar 1"
  },
  {
    "id": "5-56",
    "name": "Pinto",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.24279,
      "long": -3.70374
    },
    "address": "Calle del Ferrocarril 4",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Calle del Ferrocarril 4"
  },
  {
    "id": "5-57",
    "name": "Pirámides",
    "lines": [
      "C10"
    ],
    "coordinates": {
      "lat": 40.4026,
      "long": -3.71134
    },
    "address": "Paseo del Doctor Vallejo Nágera 37",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C10. Dirección: Paseo del Doctor Vallejo Nágera 37"
  },
  {
    "id": "5-58",
    "name": "Pitis",
    "lines": [
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.4951,
      "long": -3.72584
    },
    "address": "Ctra a la Estación de Pitis 19",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C8A, C8. Dirección: Ctra a la Estación de Pitis 19"
  },
  {
    "id": "5-59",
    "name": "El Pozo",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.3759,
      "long": -3.65623
    },
    "address": "Avda de Entrevías 140",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Avda de Entrevías 140"
  },
  {
    "id": "5-60",
    "name": "Pozuelo",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.44727,
      "long": -3.80012
    },
    "address": "Calle Estación 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Calle Estación 2"
  },
  {
    "id": "5-61",
    "name": "Príncipe Pío",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.42107,
      "long": -3.72026
    },
    "address": "Paseo de la Florida 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Paseo de la Florida 2"
  },
  {
    "id": "5-62",
    "name": "Puente Alcocer",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.35028,
      "long": -3.70516
    },
    "address": "Calle de Alcocer 54",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle de Alcocer 54"
  },
  {
    "id": "5-63",
    "name": "Puerto Navacerrada",
    "lines": [
      "C9"
    ],
    "coordinates": {
      "lat": 40.78441,
      "long": -4.00473
    },
    "address": "Calle de la Virgen de las Nieves 7",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C9. Dirección: Calle de la Virgen de las Nieves 7"
  },
  {
    "id": "5-64",
    "name": "Ramón Y Cajal",
    "lines": [
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.48824,
      "long": -3.69473
    },
    "address": "Calle de San Modesto 50",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C8A, C8. Dirección: Calle de San Modesto 50"
  },
  {
    "id": "5-65",
    "name": "Recoletos",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.42341,
      "long": -3.69086
    },
    "address": "Paseo de Recoletos 20",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8, C10. Dirección: Paseo de Recoletos 20"
  },
  {
    "id": "5-66",
    "name": "Las Retamas",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.34189,
      "long": -3.84242
    },
    "address": "Avda de Retamas 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda de Retamas 2"
  },
  {
    "id": "5-67",
    "name": "Robledo De Chavela",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.52078,
      "long": -4.24671
    },
    "address": "Calle de Francisco Quevedo 295",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Calle de Francisco Quevedo 295"
  },
  {
    "id": "5-68",
    "name": "Las Rozas",
    "lines": [
      "C7",
      "C10"
    ],
    "coordinates": {
      "lat": 40.49423,
      "long": -3.86812
    },
    "address": "Calle de la Vía de Servicio de las Rozas 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C10. Dirección: Calle de la Vía de Servicio de las Rozas 1"
  },
  {
    "id": "5-69",
    "name": "San Cristóbal De Los Angeles",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.34236,
      "long": -3.68385
    },
    "address": "Calle de Paterna 17",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Calle de Paterna 17"
  },
  {
    "id": "5-70",
    "name": "San Cristóbal Industrial",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.33191,
      "long": -3.69872
    },
    "address": "Acces a la Colonia Marconi 11",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Acces a la Colonia Marconi 11"
  },
  {
    "id": "5-71",
    "name": "San Fernando",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.44266,
      "long": -3.53385
    },
    "address": "Calle Estación de ferrocarril 6",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle Estación de ferrocarril 6"
  },
  {
    "id": "5-72",
    "name": "San José De Valderas",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.35653,
      "long": -3.81588
    },
    "address": "Calle de Sahagún 36",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle de Sahagún 36"
  },
  {
    "id": "5-74",
    "name": "San Yago",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.61787,
      "long": -4.03111
    },
    "address": "Avda Saltos del Sil 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Avda Saltos del Sil 1"
  },
  {
    "id": "5-75",
    "name": "Santa Eugenia",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.38699,
      "long": -3.60906
    },
    "address": "Avda de Santa Eugenia 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Avda de Santa Eugenia 2"
  },
  {
    "id": "5-76",
    "name": "Santa María De La Alameda",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.56892,
      "long": -4.26933
    },
    "address": "Calle Doce de Octubre 20",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Calle Doce de Octubre 20"
  },
  {
    "id": "5-77",
    "name": "La Serna",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.29672,
      "long": -3.79248
    },
    "address": "Calle Barcelona 28",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle Barcelona 28"
  },
  {
    "id": "5-81",
    "name": "Torrejón De Ardoz",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.4546,
      "long": -3.47982
    },
    "address": "Paseo Estación 3",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Paseo Estación 3"
  },
  {
    "id": "5-82",
    "name": "Torrelodones",
    "lines": [
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.57451,
      "long": -3.95654
    },
    "address": "Plaza de Salvador Sánchez Frascuelo 6",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A, C8, C10. Dirección: Plaza de Salvador Sánchez Frascuelo 6"
  },
  {
    "id": "5-83",
    "name": "Tres Cantos",
    "lines": [
      "C4B"
    ],
    "coordinates": {
      "lat": 40.59844,
      "long": -3.71564
    },
    "address": "Plaza de la Estación 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4B. Dirección: Plaza de la Estación 1"
  },
  {
    "id": "5-84",
    "name": "Universidad P. Comillas",
    "lines": [
      "C4A"
    ],
    "coordinates": {
      "lat": 40.55406,
      "long": -3.68334
    },
    "address": "Ctra del Goloso SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A. Dirección: Ctra del Goloso SN"
  },
  {
    "id": "5-85",
    "name": "Valdelasfuentes",
    "lines": [
      "C4A"
    ],
    "coordinates": {
      "lat": 40.54745,
      "long": -3.65434
    },
    "address": "Calle del Marqués de la Valdavia 140",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A. Dirección: Calle del Marqués de la Valdavia 140"
  },
  {
    "id": "5-86",
    "name": "Valdemoro",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.19604,
      "long": -3.66482
    },
    "address": "Paseo de la Estación 86",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Paseo de la Estación 86"
  },
  {
    "id": "5-87",
    "name": "Vallecas",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.38221,
      "long": -3.62455
    },
    "address": "Avda de la Democracia 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Avda de la Democracia 1"
  },
  {
    "id": "5-90",
    "name": "Vicálvaro",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.40132,
      "long": -3.59593
    },
    "address": "Calle de San Cipriano 85",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle de San Cipriano 85"
  },
  {
    "id": "5-91",
    "name": "Villalba De Guadarrama",
    "lines": [
      "C8A",
      "C8",
      "C10"
    ],
    "coordinates": {
      "lat": 40.62637,
      "long": -4.0081
    },
    "address": "Plaza de la Estación 1",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A, C8, C10. Dirección: Plaza de la Estación 1"
  },
  {
    "id": "5-92",
    "name": "Villaverde Alto",
    "lines": [
      "C4A",
      "C4B",
      "C5"
    ],
    "coordinates": {
      "lat": 40.34123,
      "long": -3.71193
    },
    "address": "Calle del Valle de Tobalina 56",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C4A, C4B, C5. Dirección: Calle del Valle de Tobalina 56"
  },
  {
    "id": "5-93",
    "name": "Villaverde Bajo",
    "lines": [
      "C3",
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.35264,
      "long": -3.68398
    },
    "address": "Paseo de la Estación 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3, C4A, C4B. Dirección: Paseo de la Estación 2"
  },
  {
    "id": "5-94",
    "name": "Zarzalejo",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.53872,
      "long": -4.15817
    },
    "address": "Calle del Ferrocarril 13",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Calle del Ferrocarril 13"
  },
  {
    "id": "5-95",
    "name": "Zarzaquemada",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.34085,
      "long": -3.7483
    },
    "address": "Avda Europa 14",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Avda Europa 14"
  },
  {
    "id": "5-96",
    "name": "Las Zorreras",
    "lines": [
      "C8A"
    ],
    "coordinates": {
      "lat": 40.60941,
      "long": -4.04606
    },
    "address": "Calle Alcudia 26",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C8A. Dirección: Calle Alcudia 26"
  },
  {
    "id": "5-103",
    "name": "El Casar",
    "lines": [
      "C3"
    ],
    "coordinates": {
      "lat": 40.31847,
      "long": -3.70984
    },
    "address": "Avda del Casar 2",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3. Dirección: Avda del Casar 2"
  },
  {
    "id": "5-104",
    "name": "Humanes",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.25565,
      "long": -3.82847
    },
    "address": "Calle Cenicientos 26",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle Cenicientos 26"
  },
  {
    "id": "5-105",
    "name": "Parque Polvoranca",
    "lines": [
      "C5"
    ],
    "coordinates": {
      "lat": 40.3125,
      "long": -3.78334
    },
    "address": "Calle Alcalde Francisco Moreno Menéndez 4",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C5. Dirección: Calle Alcalde Francisco Moreno Menéndez 4"
  },
  {
    "id": "5-106",
    "name": "La Garena",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.48043,
      "long": -3.39317
    },
    "address": "Calle Fausto Elhuyar 6",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Calle Fausto Elhuyar 6"
  },
  {
    "id": "5-122",
    "name": "Sol",
    "lines": [
      "C3",
      "C4A",
      "C4B"
    ],
    "coordinates": {
      "lat": 40.41685,
      "long": -3.70309
    },
    "address": "Plaza de la Puerta del Sol 6",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C3, C4A, C4B. Dirección: Plaza de la Puerta del Sol 6"
  },
  {
    "id": "5-133",
    "name": "Fuente De La Mora",
    "lines": [
      "C1"
    ],
    "coordinates": {
      "lat": 40.48475,
      "long": -3.66282
    },
    "address": "Calle de Dulce Chacón 15",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C1. Dirección: Calle de Dulce Chacón 15"
  },
  {
    "id": "5-142",
    "name": "Aeropuerto T4",
    "lines": [
      "C1"
    ],
    "coordinates": {
      "lat": 40.49177,
      "long": -3.59333
    },
    "address": "Ctra de Alcobendas a Barajas SN",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C1. Dirección: Ctra de Alcobendas a Barajas SN"
  },
  {
    "id": "5-143",
    "name": "Soto Del Henares",
    "lines": [
      "C2",
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.46353,
      "long": -3.44134
    },
    "address": "Paseo de la Democracia 17",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C2, C7, C8A, C8. Dirección: Paseo de la Democracia 17"
  },
  {
    "id": "5-144",
    "name": "Valdebebas",
    "lines": [
      "C1"
    ],
    "coordinates": {
      "lat": 40.4823,
      "long": -3.61642
    },
    "address": "Avda de las Fuerzas Armadas 322",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C1. Dirección: Avda de las Fuerzas Armadas 322"
  },
  {
    "id": "5-145",
    "name": "Mirasierra - Paco De Lucía",
    "lines": [
      "C7",
      "C8A",
      "C8"
    ],
    "coordinates": {
      "lat": 40.49971,
      "long": -3.70918
    },
    "address": "Calle de la Costa Brava 14 B",
    "network": "cercanias",
    "description": "Estación de Renfe Cercanías, Línea(s) C7, C8A, C8. Dirección: Calle de la Costa Brava 14 B"
  },
  {
    "id": "ML1-01",
    "name": "Pinar de Chamartín [ML1]",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Intercambiador norte de conexión de Metro y Tram"
  },
  {
    "id": "ML1-02",
    "name": "Fuente de la Mora [ML1]",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Enlace Renfe Cercanías Sanchinarro"
  },
  {
    "id": "ML1-03",
    "name": "Virgen del Cortijo",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Barrio residencial Sanchinarro"
  },
  {
    "id": "ML1-04",
    "name": "Antonio Saura",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Avenida Francisco Pi y Margall"
  },
  {
    "id": "ML1-05",
    "name": "Álvarez de Villaamil",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Sanchinarro sector este"
  },
  {
    "id": "ML1-06",
    "name": "Blasco Ibáñez",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Calle de la Princesa de Éboli"
  },
  {
    "id": "ML1-07",
    "name": "María Tudor",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Área comercial de Sanchinarro"
  },
  {
    "id": "ML1-08",
    "name": "Palas de Rey",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Sanchinarro sector norte"
  },
  {
    "id": "ML1-09",
    "name": "Las Tablas [ML1]",
    "network": "tren-ligero",
    "lines": [
      "ML1"
    ],
    "description": "Tren Ligero ML1 - Conexión Metro Línea 10 en Las Tablas"
  },
  {
    "id": "ML2-01",
    "name": "Colonia Jardín [ML2]",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Enlace Metro L10 y ML3 en Madrid Suroeste"
  },
  {
    "id": "ML2-02",
    "name": "Prado de la Vega",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Acceso a estudios de RTVE Prado del Rey"
  },
  {
    "id": "ML2-03",
    "name": "Colonia de los Ángeles",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Urbanizaciones de Pozuelo de Alarcón"
  },
  {
    "id": "ML2-04",
    "name": "Prado del Rey",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Área de televisión y radio pública corporativa de RNE"
  },
  {
    "id": "ML2-05",
    "name": "Somosaguas Sur",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Elegantes urbanizaciones de Somosaguas"
  },
  {
    "id": "ML2-06",
    "name": "Somosaguas Centro",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Junto al Parque forestal Adolfo Suárez"
  },
  {
    "id": "ML2-07",
    "name": "Pozuelo Oeste",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Zona de ocio de Pozuelo de Alarcón"
  },
  {
    "id": "ML2-08",
    "name": "Bélgica",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Avenida de Bélgica en Pozuelo"
  },
  {
    "id": "ML2-09",
    "name": "Dos Castillas",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Parques y bulevares comerciales de Pozuelo"
  },
  {
    "id": "ML2-10",
    "name": "Campus de Somosaguas",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Campus Universitario de Ciencias Sociales de la UCM"
  },
  {
    "id": "ML2-11",
    "name": "Avenida de Europa",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Importante vía residencial y gastronómica de Pozuelo"
  },
  {
    "id": "ML2-12",
    "name": "Berna",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Calle de Berna en Pozuelo de Alarcón"
  },
  {
    "id": "ML2-13",
    "name": "Estación de Aravaca [ML2]",
    "network": "tren-ligero",
    "lines": [
      "ML2"
    ],
    "description": "Tren Ligero ML2 - Enlace Renfe Cercanías C7, C10 en Aravaca"
  },
  {
    "id": "ML3-01",
    "name": "Colonia Jardín [ML3]",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Enlace Metro L10 y ML2"
  },
  {
    "id": "ML3-02",
    "name": "Ciudad de la Imagen",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Complejo audiovisual Kinépolis y estudios TV"
  },
  {
    "id": "ML3-03",
    "name": "José Isbert",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Pozuelo residencial"
  },
  {
    "id": "ML3-04",
    "name": "Ciudad del Cine",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Estudios de cine y televisión central"
  },
  {
    "id": "ML3-05",
    "name": "Cocheras",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Depósitos principales de Metro Ligero Oeste"
  },
  {
    "id": "ML3-06",
    "name": "Retamares",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Base militar sur Retamares"
  },
  {
    "id": "ML3-07",
    "name": "Montepríncipe",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Urbanización residencial en pinar, Universidad CEU San Pablo"
  },
  {
    "id": "ML3-08",
    "name": "Ventorro del Cano",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Área industrial activa de Alcorcón-Boadilla"
  },
  {
    "id": "ML3-09",
    "name": "Prado del Espino",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Polígono industrial Prado del Espino"
  },
  {
    "id": "ML3-10",
    "name": "Cantabria",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Acceso directo a la Ciudad Financiera del Banco Santander"
  },
  {
    "id": "ML3-11",
    "name": "Ferial de Boadilla",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Recinto Ferial e instalaciones de Boadilla"
  },
  {
    "id": "ML3-12",
    "name": "Boadilla Centro",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Casco histórico de Boadilla y Palacio del Infante Don Luis"
  },
  {
    "id": "ML3-13",
    "name": "Nuevo Mundo",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Urbanizaciones del este de Boadilla del Monte"
  },
  {
    "id": "ML3-14",
    "name": "Siglo XXI",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Ampliación moderna en Boadilla Sector B"
  },
  {
    "id": "ML3-15",
    "name": "Infante Don Luis",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Avenida Infante Don Luis comercial"
  },
  {
    "id": "ML3-16",
    "name": "Puerta de Boadilla",
    "network": "tren-ligero",
    "lines": [
      "ML3"
    ],
    "description": "Tren Ligero ML3 - Terminal extrema oeste en los límites de Boadilla"
  },
  {
    "id": "ML4-01",
    "name": "Parla Centro [ML4]",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Enlace directo intermodal con Renfe Cercanías C4"
  },
  {
    "id": "ML4-02",
    "name": "Plaza de Toros",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Recinto taurino e instalaciones deportivas"
  },
  {
    "id": "ML4-03",
    "name": "Julio Romero de Torres",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Barrio de Parla Este residencial"
  },
  {
    "id": "ML4-04",
    "name": "La Ballena",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Parque de la Ballena de Parla"
  },
  {
    "id": "ML4-05",
    "name": "Bulevar Sur",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Bulevar de entrada sur comercial"
  },
  {
    "id": "ML4-06",
    "name": "Reyes Católicos",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Avenida de los Reyes Católicos residencial"
  },
  {
    "id": "ML4-07",
    "name": "Isabel II",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Calle Isabel II y casco antiguo de Parla"
  },
  {
    "id": "ML4-08",
    "name": "Parque Parla Este",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Amplio pulmón verde y lago artificial de Parla"
  },
  {
    "id": "ML4-09",
    "name": "Avenida de Ronda",
    "network": "tren-ligero",
    "lines": [
      "ML4"
    ],
    "description": "Tranvía de Parla - Avenida de Ronda, área residencial este"
  }
];

/**
 * Normaliza un texto para ignorar mayúsculas, minúsculas, espacios adicionales y tildes/acentos.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD') // Descompone caracteres con tilde en letras + diacríticos combinados
    .replace(/[\u0300-\u036f]/g, ''); // Elimina los diacríticos (las tildes)
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
