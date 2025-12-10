import { useState, useEffect } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Country, FilterOptions } from './types/country';
import bgImage from './pages/1.jpg';
import { api } from './services/api';
import { SearchBar } from './components/SearchBar';
import { CountryCard } from './components/CountryCard';
import { CountryDetail } from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    searchType: 'all',
    region: 'all',          // 👈 better default
  });

  useEffect(() => {
    loadAllCountries();
  }, []);

  const loadAllCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError('Search by the Name to get the info');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      let results: Country[] = [];

      if (filters.searchType === 'all') {
        // use already loaded data instead of refetching
        results = [...countries];
      } else if (filters.searchTerm.trim()) {
        const term = filters.searchTerm.trim();
        switch (filters.searchType) {
          case 'name':
            results = await api.searchByName(term);
            break;
          case 'code':
            results = await api.searchByCode(term);
            break;
          case 'capital':
            results = await api.searchByCapital(term);
            break;
        }
      } else {
        results = countries;
      }

      if (filters.region !== 'all') {
        results = results.filter(
          (country) => country.region === filters.region
        );
      }

      setFilteredCountries(results);
      if (results.length === 0) {
        setError('No results found. Please try a different search.');
      }
    } catch (err) {
      setError('No results found. Please try a different search.');
      setFilteredCountries([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters.region !== 'all' && countries.length > 0) {
      const filtered = countries.filter(
        (country) => country.region === filters.region
      );
      setFilteredCountries(filtered);
    } else if (filters.region === 'all' && filters.searchType === 'all') {
      setFilteredCountries(countries);
    }
  }, [filters.region, countries, filters.searchType]);

  return (
    // 🔹 Background image layer
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* 🔹 Semi-transparent overlay so image shows through */}
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold text-red-800">
                Country Explorer
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Discover information about countries around the world
            </p>
          </header>

          <SearchBar
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
          />

          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <span className="ml-3 text-xl text-gray-600">
                Loading countries...
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!loading && !error && filteredCountries.length === 0 && (
            <div className="text-center py-20">
              <Globe className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No countries found</p>
            </div>
          )}

          {!loading && !error && filteredCountries.length > 0 && (
            <>
              <div className="mb-6 text-gray-600">
                <p className="text-lg">
                  Showing{' '}
                  <span className="font-bold">{filteredCountries.length}</span>{' '}
                  {filteredCountries.length === 1 ? 'country' : 'countries'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    onClick={() => setSelectedCountry(country)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {selectedCountry && (
          <CountryDetail
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
