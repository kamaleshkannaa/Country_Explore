import { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export function CountryCard({ country, onClick }: CountryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {country.name.common}
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          {country.capital && country.capital.length > 0 && (
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
