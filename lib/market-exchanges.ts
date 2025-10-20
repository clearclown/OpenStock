// Major stock exchanges by country/region
// Based on Finnhub supported exchanges

export type MarketExchange = {
    code: string;
    name: string;
    country: string;
    region: string;
    timezone: string;
};

export const MARKET_EXCHANGES: MarketExchange[] = [
    // United States
    { code: 'US', name: 'US Exchanges (NYSE, NASDAQ)', country: 'United States', region: 'North America', timezone: 'America/New_York' },

    // Japan
    { code: 'T', name: 'Tokyo Stock Exchange', country: 'Japan', region: 'Asia', timezone: 'Asia/Tokyo' },
    { code: 'TO', name: 'Tokyo Stock Exchange', country: 'Japan', region: 'Asia', timezone: 'Asia/Tokyo' },

    // China & Hong Kong
    { code: 'HK', name: 'Hong Kong Stock Exchange', country: 'Hong Kong', region: 'Asia', timezone: 'Asia/Hong_Kong' },
    { code: 'SS', name: 'Shanghai Stock Exchange', country: 'China', region: 'Asia', timezone: 'Asia/Shanghai' },
    { code: 'SZ', name: 'Shenzhen Stock Exchange', country: 'China', region: 'Asia', timezone: 'Asia/Shanghai' },

    // Europe
    { code: 'L', name: 'London Stock Exchange', country: 'United Kingdom', region: 'Europe', timezone: 'Europe/London' },
    { code: 'F', name: 'Frankfurt Stock Exchange', country: 'Germany', region: 'Europe', timezone: 'Europe/Berlin' },
    { code: 'PA', name: 'Euronext Paris', country: 'France', region: 'Europe', timezone: 'Europe/Paris' },
    { code: 'AS', name: 'Euronext Amsterdam', country: 'Netherlands', region: 'Europe', timezone: 'Europe/Amsterdam' },
    { code: 'BR', name: 'Euronext Brussels', country: 'Belgium', region: 'Europe', timezone: 'Europe/Brussels' },
    { code: 'MI', name: 'Borsa Italiana', country: 'Italy', region: 'Europe', timezone: 'Europe/Rome' },
    { code: 'MC', name: 'Madrid Stock Exchange', country: 'Spain', region: 'Europe', timezone: 'Europe/Madrid' },
    { code: 'SW', name: 'SIX Swiss Exchange', country: 'Switzerland', region: 'Europe', timezone: 'Europe/Zurich' },
    { code: 'ST', name: 'Stockholm Stock Exchange', country: 'Sweden', region: 'Europe', timezone: 'Europe/Stockholm' },
    { code: 'CO', name: 'Copenhagen Stock Exchange', country: 'Denmark', region: 'Europe', timezone: 'Europe/Copenhagen' },
    { code: 'OL', name: 'Oslo Stock Exchange', country: 'Norway', region: 'Europe', timezone: 'Europe/Oslo' },
    { code: 'HE', name: 'Helsinki Stock Exchange', country: 'Finland', region: 'Europe', timezone: 'Europe/Helsinki' },
    { code: 'IC', name: 'Iceland Stock Exchange', country: 'Iceland', region: 'Europe', timezone: 'Atlantic/Reykjavik' },
    { code: 'IR', name: 'Irish Stock Exchange', country: 'Ireland', region: 'Europe', timezone: 'Europe/Dublin' },
    { code: 'AT', name: 'Athens Stock Exchange', country: 'Greece', region: 'Europe', timezone: 'Europe/Athens' },
    { code: 'LS', name: 'Lisbon Stock Exchange', country: 'Portugal', region: 'Europe', timezone: 'Europe/Lisbon' },
    { code: 'VI', name: 'Vienna Stock Exchange', country: 'Austria', region: 'Europe', timezone: 'Europe/Vienna' },
    { code: 'PR', name: 'Prague Stock Exchange', country: 'Czech Republic', region: 'Europe', timezone: 'Europe/Prague' },
    { code: 'WA', name: 'Warsaw Stock Exchange', country: 'Poland', region: 'Europe', timezone: 'Europe/Warsaw' },
    { code: 'IS', name: 'Istanbul Stock Exchange', country: 'Turkey', region: 'Europe/Asia', timezone: 'Europe/Istanbul' },
    { code: 'ME', name: 'Moscow Exchange', country: 'Russia', region: 'Europe', timezone: 'Europe/Moscow' },

    // Middle East
    { code: 'SR', name: 'Saudi Stock Exchange (Tadawul)', country: 'Saudi Arabia', region: 'Middle East', timezone: 'Asia/Riyadh' },
    { code: 'TE', name: 'Tehran Stock Exchange', country: 'Iran', region: 'Middle East', timezone: 'Asia/Tehran' },
    { code: 'DU', name: 'Dubai Financial Market', country: 'United Arab Emirates', region: 'Middle East', timezone: 'Asia/Dubai' },
    { code: 'QA', name: 'Qatar Stock Exchange', country: 'Qatar', region: 'Middle East', timezone: 'Asia/Qatar' },
    { code: 'TA', name: 'Tel Aviv Stock Exchange', country: 'Israel', region: 'Middle East', timezone: 'Asia/Jerusalem' },

    // Asia Pacific
    { code: 'SG', name: 'Singapore Exchange', country: 'Singapore', region: 'Asia', timezone: 'Asia/Singapore' },
    { code: 'KS', name: 'Korea Stock Exchange', country: 'South Korea', region: 'Asia', timezone: 'Asia/Seoul' },
    { code: 'KQ', name: 'KOSDAQ', country: 'South Korea', region: 'Asia', timezone: 'Asia/Seoul' },
    { code: 'TW', name: 'Taiwan Stock Exchange', country: 'Taiwan', region: 'Asia', timezone: 'Asia/Taipei' },
    { code: 'BO', name: 'Bombay Stock Exchange', country: 'India', region: 'Asia', timezone: 'Asia/Kolkata' },
    { code: 'NS', name: 'National Stock Exchange of India', country: 'India', region: 'Asia', timezone: 'Asia/Kolkata' },
    { code: 'JK', name: 'Indonesia Stock Exchange', country: 'Indonesia', region: 'Asia', timezone: 'Asia/Jakarta' },
    { code: 'BK', name: 'Stock Exchange of Thailand', country: 'Thailand', region: 'Asia', timezone: 'Asia/Bangkok' },
    { code: 'KL', name: 'Bursa Malaysia', country: 'Malaysia', region: 'Asia', timezone: 'Asia/Kuala_Lumpur' },
    { code: 'PM', name: 'Philippine Stock Exchange', country: 'Philippines', region: 'Asia', timezone: 'Asia/Manila' },
    { code: 'VN', name: 'Ho Chi Minh Stock Exchange', country: 'Vietnam', region: 'Asia', timezone: 'Asia/Ho_Chi_Minh' },
    { code: 'AX', name: 'Australian Securities Exchange', country: 'Australia', region: 'Oceania', timezone: 'Australia/Sydney' },
    { code: 'NZ', name: 'New Zealand Exchange', country: 'New Zealand', region: 'Oceania', timezone: 'Pacific/Auckland' },

    // Canada
    { code: 'TO', name: 'Toronto Stock Exchange', country: 'Canada', region: 'North America', timezone: 'America/Toronto' },
    { code: 'V', name: 'TSX Venture Exchange', country: 'Canada', region: 'North America', timezone: 'America/Vancouver' },

    // South America
    { code: 'SA', name: 'São Paulo Stock Exchange (B3)', country: 'Brazil', region: 'South America', timezone: 'America/Sao_Paulo' },
    { code: 'BA', name: 'Buenos Aires Stock Exchange', country: 'Argentina', region: 'South America', timezone: 'America/Argentina/Buenos_Aires' },
    { code: 'SN', name: 'Santiago Stock Exchange', country: 'Chile', region: 'South America', timezone: 'America/Santiago' },
    { code: 'MX', name: 'Mexican Stock Exchange', country: 'Mexico', region: 'North America', timezone: 'America/Mexico_City' },

    // Africa
    { code: 'JO', name: 'Johannesburg Stock Exchange', country: 'South Africa', region: 'Africa', timezone: 'Africa/Johannesburg' },
];

// Group exchanges by country
export const getExchangesByCountry = () => {
    const grouped: Record<string, MarketExchange[]> = {};

    MARKET_EXCHANGES.forEach(exchange => {
        if (!grouped[exchange.country]) {
            grouped[exchange.country] = [];
        }
        grouped[exchange.country].push(exchange);
    });

    return grouped;
};

// Get unique countries sorted alphabetically
export const getCountries = () => {
    const countries = [...new Set(MARKET_EXCHANGES.map(ex => ex.country))];
    return countries.sort();
};

// Get exchanges by region
export const getExchangesByRegion = () => {
    const grouped: Record<string, MarketExchange[]> = {};

    MARKET_EXCHANGES.forEach(exchange => {
        if (!grouped[exchange.region]) {
            grouped[exchange.region] = [];
        }
        grouped[exchange.region].push(exchange);
    });

    return grouped;
};

// Search exchanges by country or name
export const searchExchanges = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return MARKET_EXCHANGES.filter(ex =>
        ex.country.toLowerCase().includes(lowerQuery) ||
        ex.name.toLowerCase().includes(lowerQuery) ||
        ex.code.toLowerCase().includes(lowerQuery)
    );
};
