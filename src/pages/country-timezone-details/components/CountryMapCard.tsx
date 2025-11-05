import React from 'react';
import { CountryTimezoneData } from '../types';

interface CountryMapCardProps {
  country: CountryTimezoneData;
}

const CountryMapCard: React.FC<CountryMapCardProps> = ({ country }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Maps & Location</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Coordinates</h4>
            <p className="text-foreground">
              {country.latlng[0].toFixed(2)}°N, {country.latlng[1].toFixed(2)}°E
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Capital Coordinates</h4>
            <p className="text-foreground">
              {country.capitalInfo.latlng[0].toFixed(2)}°N, {country.capitalInfo.latlng[1].toFixed(2)}°E
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Google Maps</h4>
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>View on Google Maps</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">OpenStreetMap</h4>
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>View on OpenStreetMap</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {country.postalCode.format && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Postal Code Format</h4>
            <p className="text-foreground font-mono">{country.postalCode.format}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryMapCard;