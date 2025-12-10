// import { Country } from '../types/country';

// const API_BASE = '/api';

// export const api = {
//   getAllCountries: async (): Promise<Country[]> => {
//     const response = await fetch(`${API_BASE}/countries`);
//     if (!response.ok) throw new Error('Failed to fetch countries');
//     return response.json();
//   },

//   searchByName: async (name: string): Promise<Country[]> => {
//     const response = await fetch(`${API_BASE}/countries/name/${name}`);
//     if (!response.ok) throw new Error('No countries found');
//     return response.json();
//   },

//   searchByCode: async (code: string): Promise<Country[]> => {
//     const response = await fetch(`${API_BASE}/countries/code/${code}`);
//     if (!response.ok) throw new Error('Country not found');
//     const data = await response.json();
//     return Array.isArray(data) ? data : [data];
//   },

//   searchByRegion: async (region: string): Promise<Country[]> => {
//     const response = await fetch(`${API_BASE}/countries/region/${region}`);
//     if (!response.ok) throw new Error('No countries found in region');
//     return response.json();
//   },

//   searchByCapital: async (capital: string): Promise<Country[]> => {
//     const response = await fetch(`${API_BASE}/countries/capital/${capital}`);
//     if (!response.ok) throw new Error('No countries found with this capital');
//     return response.json();
//   },
// };




import { Country } from '../types/country';

const API_BASE = 'https://restcountries.com/v3.1';

export const api = {
  getAllCountries: async (): Promise<Country[]> => {
    const response = await fetch(`${API_BASE}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return response.json();
  },

  searchByName: async (name: string): Promise<Country[]> => {
    const response = await fetch(`${API_BASE}/name/${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('No countries found');
    return response.json();
  },

  searchByCode: async (code: string): Promise<Country[]> => {
    // REST Countries uses /alpha for code search
    const response = await fetch(`${API_BASE}/alpha/${encodeURIComponent(code)}`);
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();
    // API may return a single object or array -> normalize to array
    return Array.isArray(data) ? data : [data];
  },

  searchByRegion: async (region: string): Promise<Country[]> => {
    const response = await fetch(`${API_BASE}/region/${encodeURIComponent(region)}`);
    if (!response.ok) throw new Error('No countries found in region');
    return response.json();
  },

  searchByCapital: async (capital: string): Promise<Country[]> => {
    const response = await fetch(`${API_BASE}/capital/${encodeURIComponent(capital)}`);
    if (!response.ok) throw new Error('No countries found with this capital');
    return response.json();
  },
};
