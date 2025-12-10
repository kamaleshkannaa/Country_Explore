import { X, Globe, Users, MapPin, DollarSign, Clock } from 'lucide-react';
import { Country } from '../types/country';

interface CountryDetailProps {
  country: Country;
  onClose: () => void;
}

export function CountryDetail({ country, onClose }: CountryDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {country.name.official}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={country.flags.svg}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Basic Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                    <div>
                      <p className="font-semibold">Common Name:</p>
                      <p>{country.name.common}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 mt-0.5 text-red-600" />
                    <div>
                      <p className="font-semibold">Capital:</p>
                      <p>
                        {country.capital && country.capital.length > 0
                          ? country.capital.join(', ')
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-2 mt-0.5 text-green-600" />
                    <div>
                      <p className="font-semibold">Population:</p>
                      <p>{country.population.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Geography
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Region:</span>{' '}
                    {country.region}
                  </p>
                  {country.subregion && (
                    <p>
                      <span className="font-semibold">Subregion:</span>{' '}
                      {country.subregion}
                    </p>
                  )}
                  {country.area && (
                    <p>
                      <span className="font-semibold">Area:</span>{' '}
                      {country.area.toLocaleString()} km²
                    </p>
                  )}
                  {country.continents && (
                    <p>
                      <span className="font-semibold">Continent:</span>{' '}
                      {country.continents.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {country.languages && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  Languages
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">
                    {Object.values(country.languages).join(', ')}
                  </p>
                </div>
              </div>
            )}

            {country.currencies && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
                  Currencies
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <p key={code} className="text-gray-600">
                      {currency.name} ({currency.symbol})
                    </p>
                  ))}
                </div>
              </div>
            )}

            {country.timezones && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Timezones
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    {country.timezones.join(', ')}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Country Codes
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <p className="text-gray-600">
                  <span className="font-semibold">CCA2:</span> {country.cca2}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">CCA3:</span> {country.cca3}
                </p>
              </div>
            </div>
          </div>

          {country.maps && (
            <div className="mt-6">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
