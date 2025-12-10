export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones?: string[];
  continents?: string[];
  borders?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
}

export interface FilterOptions {
  searchTerm: string;
  searchType: 'name' | 'code' | 'capital' | 'all';
  region: string;
}
