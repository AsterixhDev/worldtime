// Helpers to fetch data from REST Countries API and map to the app's types
import { Country, Timezone } from '../pages/world-clock-dashboard/types';
import { RegionData, TimezoneInfo } from '../pages/country-timezone-details/types';

const REST_ALL_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,subregion,capital,timezones,population';

const countryCodeToEmoji = (code?: string) => {
  if (!code) return '🌍';
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

// -------------------- Internal Helpers --------------------

function partsFromFormat(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  }).formatToParts(date);

  const map: Record<string, string> = {};
  parts.forEach((p) => (map[p.type] = p.value));
  return map;
}

function getOffsetMinutesFor(date: Date, timeZone: string) {
  const p = partsFromFormat(date, timeZone);
  const year = Number(p.year);
  const month = Number(p.month) - 1;
  const day = Number(p.day);
  const hour = Number(p.hour);
  const minute = Number(p.minute);
  const second = Number(p.second);

  const tzLocalAsUTC = Date.UTC(year, month, day, hour, minute, second);
  return Math.round((tzLocalAsUTC - date.getTime()) / 60000);
}

function formatOffset(offsetMinutes: number) {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`;
}

function getAbbreviation(date: Date, timeZone: string) {
  try {
    const parts = partsFromFormat(date, timeZone);
    // timeZoneName part usually contains the abbreviation like "BST" or offset like "GMT+1"
    return parts.timeZoneName || '';
  } catch {
    return '';
  }
}

// -------------------- Safe Helpers for UTC±xx:xx --------------------

function parseUTCOffset(tz: string): number | null {
  // Match strings like "UTC+02:00", "UTC-5", "UTC+3:30"
  const match = tz.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3] || '0', 10);
  return sign * (hours * 60 + minutes);
}

function safeGetOffsetMinutesFor(date: Date, timeZone: string): number {
  const offsetFromUTC = parseUTCOffset(timeZone);
  if (offsetFromUTC !== null) {
    // Manual offset in minutes (UTC+02:00 → +120)
    return offsetFromUTC;
  }
  // Otherwise, it's a valid IANA zone
  return getOffsetMinutesFor(date, timeZone);
}

function safeGetAbbreviation(date: Date, timeZone: string): string {
  const offsetFromUTC = parseUTCOffset(timeZone);
  if (offsetFromUTC !== null) {
    // For offsets, just reuse the formatted offset (e.g. "UTC+02:00")
    return formatOffset(offsetFromUTC);
  }
  return getAbbreviation(date, timeZone);
}

// -------------------- Core Logic --------------------

function buildTimezoneObj(id: string, now: Date): Timezone {
  const offsetMinutes = safeGetOffsetMinutesFor(now, id);
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  const janOffset = safeGetOffsetMinutesFor(jan, id);
  const julOffset = safeGetOffsetMinutesFor(jul, id);
  const observesDST = janOffset !== julOffset;
  const summerOffset = Math.max(janOffset, julOffset);
  const currentIsDST = observesDST ? offsetMinutes === summerOffset : false;

  return {
    id: `${id}-${offsetMinutes}`,
    name: id,
    offset: formatOffset(offsetMinutes),
    offsetMinutes,
    abbreviation: safeGetAbbreviation(now, id),
    isDST: currentIsDST,
    currentTime: new Date()
  } as Timezone;
}

// -------------------- Fetch Throttling --------------------

let lastFetchTime = 0;
let inFlightFetch: Promise<Country[]> | null = null;
const THROTTLE_INTERVAL = 10_000; // 10 seconds

export async function fetchAllCountries(): Promise<Country[]> {
  const nowTime = Date.now();

  // If a request is in flight, return that promise
  if (inFlightFetch) return inFlightFetch;

  // If last fetch was recent (within 10s), skip re-fetch
  if (nowTime - lastFetchTime < THROTTLE_INTERVAL) {
    const cached = loadCountriesFromCache();
    if (cached?.countries?.length) {
      return cached.countries;
    }
  }

  // Perform the network request and store the promise
  inFlightFetch = (async () => {
    try {
      const res = await fetch(REST_ALL_URL);
      if (!res.ok) throw new Error('Failed to fetch countries');
      const data = await res.json();
      const now = new Date();

      const countries: Country[] = data.map((c: any) => {
        const code = c.cca2 || c.ccn3 || c.cca3 || '';
        const name = c.name?.common || 'Unknown';
        const flags = c.flags || {};
        const flag = c.flag || flags.emoji || countryCodeToEmoji(code);
        const timezones: Timezone[] = (c.timezones || []).map((tz: string) =>
          buildTimezoneObj(tz, now)
        );

        return {
          id: String(code).toLowerCase(),
          name,
          code,
          flag,
          region: c.region || '',
          subregion: c.subregion || '',
          capital: Array.isArray(c.capital)
            ? c.capital[0]
            : c.capital || undefined,
          population: c.population || undefined,
          timezones
        } as Country;
      });

      // Cache result + mark fetch timestamp
      saveCountriesToCache(countries);
      lastFetchTime = Date.now();
      return countries;
    } finally {
      inFlightFetch = null; // Reset after completion
    }
  })();

  return inFlightFetch;
}


// -------------------- Fetch Single Country --------------------

export async function fetchCountryByCode(code: string) {
  const url = `https://restcountries.com/v3.1/name/${code}?fields=name,cca2,flags,region,subregion,capital,timezones,population,area,currencies,languages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch country details');
  const data = await res.json();
  const c = data[0];
  if (!c) throw new Error('Country not found');


  const now = new Date();
  const timezoneInfos = (c.timezones || []).map((tz: string) => {
    const offsetMinutes = safeGetOffsetMinutesFor(now, tz);
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const janOffset = safeGetOffsetMinutesFor(jan, tz);
    const julOffset = safeGetOffsetMinutesFor(jul, tz);
    const observesDST = janOffset !== julOffset;
    const summerOffset = Math.max(janOffset, julOffset);
    const currentIsDST = observesDST ? offsetMinutes === summerOffset : false;

    let dstTransition;
    if (observesDST) {
      const nextStart = new Date(now.getFullYear(), 2, 10);
      const nextEnd = new Date(now.getFullYear(), 10, 3);
      if (now < nextStart) {
        dstTransition = { next: nextStart, type: 'start' };
      } else if (now < nextEnd) {
        dstTransition = { next: nextEnd, type: 'end' };
      } else {
        dstTransition = { next: new Date(now.getFullYear() + 1, 2, 10), type: 'start' };
      }
    }

    return {
      id: tz,
      name: tz,
      abbreviation: safeGetAbbreviation(now, tz),
      gmtOffset: formatOffset(offsetMinutes),
      currentTime: now,
      isDaylightSaving: currentIsDST,
      dstTransition
    } as TimezoneInfo;
  });

  const regions: RegionData[] = [{
    id: 'all',
    name: 'All Timezones',
    type: 'region' as const,
    timezones: timezoneInfos
  }];

  const currencies = c.currencies || {};
  const currency = Object.keys(currencies)[0] || '';
  const languages = Object.values(c.languages || {}).map(lang => String(lang));
  return {
    id: c.cca2.toLowerCase(),
    name: c.name.common,
    code: c.cca2,
    flag: c.flags.png || c.flags.svg || '',
    flagAlt: c.flags.alt || '',
    capital: Array.isArray(c.capital) ? c.capital[0] : c.capital || '',
    population: c.population,
    area: c.area || 0,
    currency,
    languages,
    regions,
    totalTimezones: timezoneInfos.length,
    mainTimezone: timezoneInfos[0] || {
      id: '',
      name: '',
      abbreviation: '',
      gmtOffset: '',
      currentTime: now,
      isDaylightSaving: false,
      dstTransition: undefined
    }
  };
}

// -------------------- Cache Helpers --------------------

export function saveCountriesToCache(countries: Country[]) {
  try {
    const payload = { countries, cachedAt: new Date().toISOString() };
    localStorage.setItem('countriesCache', JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function loadCountriesFromCache():
  | { countries: Country[]; cachedAt: string }
  | null {
  try {
    const raw = localStorage.getItem('countriesCache');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // revive dates in timezone currentTime
    parsed.countries = parsed.countries.map((c: any) => ({
      ...c,
      timezones: (c.timezones || []).map((tz: any) => ({
        ...tz,
        currentTime: new Date(tz.currentTime || Date.now())
      }))
    }));
    return parsed;
  } catch {
    return null;
  }
}
