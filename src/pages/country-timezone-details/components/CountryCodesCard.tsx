import React from 'react';
import { CountryTimezoneData } from '../types';

interface CountryCodesCardProps {
  country: CountryTimezoneData;
}

const CountryCodesCard: React.FC<CountryCodesCardProps> = ({ country }) => {
  const codes = [
    { label: 'ISO 3166-1 Alpha-2', value: country.code, description: 'Two-letter country code' },
    { label: 'ISO 3166-1 Alpha-3', value: country.cca3, description: 'Three-letter country code' },
    { label: 'ISO 3166-1 Numeric', value: country.ccn3, description: 'Three-digit country code' },
    { label: 'IOC Code', value: country.cioc, description: 'International Olympic Committee code' },
    { label: 'FIFA Code', value: country.fifa, description: 'Fédération Internationale de Football Association code' },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Country Codes</h3>

      <div className="space-y-4">
        {codes.map((code, index) => (
          code.value && (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-foreground">{code.label}</div>
                <div className="text-sm text-muted-foreground">{code.description}</div>
              </div>
              <div className="font-mono text-lg font-semibold text-primary">
                {code.value}
              </div>
            </div>
          )
        ))}

        {country.idd.root && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium text-foreground">International Dialing Code</div>
              <div className="text-sm text-muted-foreground">Country calling code</div>
            </div>
            <div className="font-mono text-lg font-semibold text-primary">
              {country.idd.root}{country.idd.suffixes.length > 0 ? country.idd.suffixes[0] : ''}
            </div>
          </div>
        )}

        {country.car.signs.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium text-foreground">Vehicle Registration</div>
              <div className="text-sm text-muted-foreground">License plate code</div>
            </div>
            <div className="font-mono text-lg font-semibold text-primary">
              {country.car.signs.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCodesCard;