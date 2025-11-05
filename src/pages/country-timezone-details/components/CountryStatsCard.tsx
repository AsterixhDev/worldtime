import React from 'react';
import { CountryTimezoneData } from '../types';

interface CountryStatsCardProps {
  country: CountryTimezoneData;
}

const CountryStatsCard: React.FC<CountryStatsCardProps> = ({ country }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getGiniValue = (gini: Record<string, number>) => {
    const latestYear = Object.keys(gini).sort().pop();
    return latestYear ? `${gini[latestYear]} (${latestYear})` : 'N/A';
  };

  const stats = [
    {
      label: 'Population',
      value: formatNumber(country.population),
      icon: '👥'
    },
    {
      label: 'Area',
      value: `${formatNumber(country.area)} km²`,
      icon: '🗺️'
    },
    {
      label: 'Timezones',
      value: country.timezones.length.toString(),
      icon: '🕐'
    },
    {
      label: 'Gini Coefficient',
      value: getGiniValue(country.gini),
      icon: '📊'
    },
    {
      label: 'Landlocked',
      value: country.landlocked ? 'Yes' : 'No',
      icon: country.landlocked ? '🏔️' : '🌊'
    },
    {
      label: 'UN Member',
      value: country.unMember ? 'Yes' : 'No',
      icon: country.unMember ? '🇺🇳' : '🌍'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Key Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              {stat.label}
            </div>
            <div className="text-lg font-semibold text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryStatsCard;