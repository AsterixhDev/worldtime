import React from 'react';
import { CountryTimezoneData } from '../types';

interface CountryInfoCardProps {
  country: CountryTimezoneData;
}

const CountryInfoCard: React.FC<CountryInfoCardProps> = ({ country }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatCurrency = (currencies: Record<string, { name: string; symbol: string }>) => {
    return Object.entries(currencies).map(([code, { name, symbol }]) => (
      <span key={code} className="inline-flex items-center gap-1">
        {symbol} {name} ({code})
      </span>
    ));
  };

  const formatLanguages = (languages: Record<string, string>) => {
    return Object.values(languages).join(', ');
  };

  const formatDemonyms = (demonyms: Record<string, { f: string; m: string }>) => {
    const eng = demonyms.eng;
    if (eng) {
      return `${eng.m}/${eng.f}`;
    }
    return '';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Official Name</h3>
            <p className="text-foreground font-medium">{country.officialName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Capital</h3>
            <p className="text-foreground">{country.capital || 'N/A'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Region</h3>
            <p className="text-foreground">{country.region} {country.subregion && `(${country.subregion})`}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Population</h3>
            <p className="text-foreground">{formatNumber(country.population)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Area</h3>
            <p className="text-foreground">{formatNumber(country.area)} km²</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Currency</h3>
            <p className="text-foreground">
              {Object.keys(country.currencies).length > 0
                ? formatCurrency(country.currencies)
                : 'N/A'
              }
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Languages</h3>
            <p className="text-foreground">
              {Object.keys(country.languages).length > 0
                ? formatLanguages(country.languages)
                : 'N/A'
              }
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Demonym</h3>
            <p className="text-foreground">
              {Object.keys(country.demonyms).length > 0
                ? formatDemonyms(country.demonyms)
                : 'N/A'
              }
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
            <p className="text-foreground capitalize">
              {country.independent ? 'Independent' : 'Dependent'} • {country.unMember ? 'UN Member' : 'Non-UN Member'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Driving Side</h3>
            <p className="text-foreground capitalize">{country.car.side}</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="border-t border-border pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Timezones</h3>
            <p className="text-foreground">{country.timezones.length}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Continents</h3>
            <p className="text-foreground">{country.continents.join(', ')}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Start of Week</h3>
            <p className="text-foreground capitalize">{country.startOfWeek}</p>
          </div>
        </div>

        {country.borders.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Borders</h3>
            <div className="flex flex-wrap gap-2">
              {country.borders.map(border => (
                <span key={border} className="px-2 py-1 bg-muted rounded text-sm">
                  {border}
                </span>
              ))}
            </div>
          </div>
        )}

        {country.tld.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Level Domains</h3>
            <div className="flex flex-wrap gap-2">
              {country.tld.map(domain => (
                <span key={domain} className="px-2 py-1 bg-muted rounded text-sm">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryInfoCard;