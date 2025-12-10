import { Search } from 'lucide-react';
import { FilterOptions } from '../types/country';

interface SearchBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: () => void;
}

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export function SearchBar({ filters, onFilterChange, onSearch }: SearchBarProps) {
  const handleSearchTypeChange = (searchType: FilterOptions['searchType']) => {
    onFilterChange({ ...filters, searchType });
  };

  const handleSearchTermChange = (searchTerm: string) => {
    onFilterChange({ ...filters, searchTerm });
  };

  const handleRegionChange = (region: string) => {
    onFilterChange({ ...filters, region });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Type
          </label>
          <select
            value={filters.searchType}
            onChange={(e) =>
              handleSearchTypeChange(e.target.value as FilterOptions['searchType'])
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Countries</option>
            <option value="name">By Name</option>
            <option value="code">By Code</option>
            <option value="capital">By Capital</option>
          </select>
        </div>

        <div className="md:col-span-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Term
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Search by ${filters.searchType === 'all' ? 'name' : filters.searchType}...`}
              disabled={filters.searchType === 'all'}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Regions</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            onClick={onSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
