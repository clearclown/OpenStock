// Dynamic TradingView widget configurations based on selected markets

export type MarketConfig = {
    exchangeCode: string;
    country: string;
    region: string;
};

// Generate Market Overview config based on user's markets
export const generateMarketOverviewConfig = (markets: MarketConfig[]) => {
    // If no markets selected, return default US config
    if (markets.length === 0) {
        return getDefaultMarketOverviewConfig();
    }

    // Group markets by region for tabs
    const tabs = generateTabsFromMarkets(markets);

    return {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
        largeChartUrl: '',
        isTransparent: true,
        showFloatingTooltip: true,
        plotLineColorGrowing: '#0FEDBE',
        plotLineColorFalling: '#0FEDBE',
        gridLineColor: 'rgba(240, 243, 250, 0)',
        scaleFontColor: '#DBDBDB',
        belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
        belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
        symbolActiveColor: 'rgba(15, 237, 190, 0.05)',
        tabs,
        support_host: 'https://www.tradingview.com',
        backgroundColor: '#141414',
        width: '100%',
        height: 600,
        showSymbolLogo: true,
        showChart: true,
    };
};

// Generate Stock Heatmap config based on market
export const generateHeatmapConfig = (primaryMarket?: MarketConfig) => {
    // TradingView Stock Heatmap uses INDEX CODES as dataSource, not country names!
    // Reference: original HEATMAP_WIDGET_CONFIG used 'SPX500'
    let dataSource = 'SPX500'; // Default to S&P 500

    if (primaryMarket) {
        const { country, region, exchangeCode } = primaryMarket;

        // Map to TradingView INDEX codes (verified from original config)
        if (country === 'Japan' || exchangeCode === 'T') {
            dataSource = 'NI225'; // Nikkei 225
        } else if (country === 'United Kingdom' || exchangeCode === 'L') {
            dataSource = 'FTSE100'; // FTSE 100
        } else if (country === 'Germany' || exchangeCode === 'F') {
            dataSource = 'DAX'; // DAX 40
        } else if (country === 'France' || exchangeCode === 'PA') {
            dataSource = 'CAC40'; // CAC 40
        } else if (country === 'Hong Kong' || exchangeCode === 'HK') {
            dataSource = 'HSI'; // Hang Seng
        } else if (country === 'China') {
            dataSource = 'SSE'; // Shanghai Composite
        } else if (country === 'Australia' || exchangeCode === 'ASX') {
            dataSource = 'ASX200'; // ASX 200
        } else if (country === 'India' || exchangeCode === 'BSE' || exchangeCode === 'NSE') {
            dataSource = 'SENSEX'; // BSE Sensex
        } else if (country === 'South Korea' || exchangeCode === 'KRX') {
            dataSource = 'KRX'; // KOSPI
        } else if (country === 'Canada') {
            dataSource = 'TSX'; // S&P/TSX Composite
        } else if (country === 'Brazil') {
            dataSource = 'IBOV'; // Bovespa
        } else if (country === 'Russia') {
            dataSource = 'RTSI'; // RTS Index
        } else if (country === 'Italy') {
            dataSource = 'MIB'; // FTSE MIB
        } else if (country === 'Spain') {
            dataSource = 'IBEX35'; // IBEX 35
        } else if (country === 'Netherlands') {
            dataSource = 'AEX'; // AEX
        } else if (country === 'Switzerland') {
            dataSource = 'SMI'; // SMI
        } else if (country === 'Sweden') {
            dataSource = 'OMX'; // OMX Stockholm 30
        } else if (country === 'Singapore') {
            dataSource = 'STI'; // Straits Times Index
        } else if (region === 'Commodities') {
            dataSource = 'SPX500'; // Commodities - use default
        } else if (region === 'Cryptocurrency') {
            dataSource = 'SPX500'; // Crypto - use default
        } else {
            dataSource = 'SPX500'; // Default to S&P 500
        }
    }

    return {
        dataSource,
        blockSize: 'market_cap_basic',
        blockColor: 'change',
        grouping: 'sector',
        isTransparent: true,
        locale: 'en',
        symbolUrl: '',
        colorTheme: 'dark',
        exchanges: [],
        hasTopBar: false,
        isDataSetEnabled: false,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
        isMonoSize: false,
        width: '100%',
        height: '600',
    };
};

// Helper: Generate tabs from markets
function generateTabsFromMarkets(markets: MarketConfig[]) {
    const tabs: any[] = [];

    // Group by region
    const regionGroups: Record<string, MarketConfig[]> = {};
    markets.forEach(market => {
        if (!regionGroups[market.region]) {
            regionGroups[market.region] = [];
        }
        regionGroups[market.region].push(market);
    });

    // Create tabs for each region
    Object.entries(regionGroups).forEach(([region, regionMarkets]) => {
        const symbols = getSymbolsForMarkets(regionMarkets);
        if (symbols.length > 0) {
            tabs.push({
                title: region,
                symbols: symbols.slice(0, 6), // Max 6 symbols per tab
            });
        }
    });

    // If no tabs generated, return default
    return tabs.length > 0 ? tabs : getDefaultTabs();
}

// Helper: Get representative symbols for markets
function getSymbolsForMarkets(markets: MarketConfig[]) {
    const symbols: any[] = [];

    markets.forEach(market => {
        const marketSymbols = getTopSymbolsForMarket(market.exchangeCode, market.country);
        symbols.push(...marketSymbols);
    });

    return symbols;
}

// Helper: Get top symbols for a specific market
function getTopSymbolsForMarket(exchangeCode: string, country: string): any[] {
    // Map of exchange codes to top symbols
    const symbolMap: Record<string, any[]> = {
        'T': [
            { s: 'TSE:7203', d: 'Toyota Motor' },
            { s: 'TSE:6758', d: 'Sony' },
            { s: 'TSE:9984', d: 'SoftBank' },
            { s: 'TSE:6861', d: 'Keyence' },
            { s: 'TSE:8306', d: 'Mitsubishi UFJ' },
        ],
        'L': [
            { s: 'LSE:SHEL', d: 'Shell' },
            { s: 'LSE:AZN', d: 'AstraZeneca' },
            { s: 'LSE:HSBA', d: 'HSBC' },
            { s: 'LSE:ULVR', d: 'Unilever' },
            { s: 'LSE:BP', d: 'BP' },
        ],
        'F': [
            { s: 'XETR:SAP', d: 'SAP' },
            { s: 'XETR:SIE', d: 'Siemens' },
            { s: 'XETR:VOW3', d: 'Volkswagen' },
            { s: 'XETR:ALV', d: 'Allianz' },
            { s: 'XETR:BAS', d: 'BASF' },
        ],
        'PA': [
            { s: 'EURONEXT:MC', d: 'LVMH' },
            { s: 'EURONEXT:OR', d: "L'Oréal" },
            { s: 'EURONEXT:SAN', d: 'Sanofi' },
            { s: 'EURONEXT:TTE', d: 'TotalEnergies' },
        ],
        'HK': [
            { s: 'HKEX:0700', d: 'Tencent' },
            { s: 'HKEX:9988', d: 'Alibaba' },
            { s: 'HKEX:0939', d: 'China Construction Bank' },
            { s: 'HKEX:1299', d: 'AIA Group' },
        ],
        'GOLD': [
            { s: 'TVC:GOLD', d: 'Gold' },
            { s: 'TVC:SILVER', d: 'Silver' },
            { s: 'COMEX:GC1!', d: 'Gold Futures' },
        ],
        'OIL': [
            { s: 'NYMEX:CL1!', d: 'Crude Oil WTI' },
            { s: 'TVC:UKOIL', d: 'Brent Crude' },
            { s: 'NYMEX:NG1!', d: 'Natural Gas' },
        ],
        'BTC': [
            { s: 'COINBASE:BTCUSD', d: 'Bitcoin' },
            { s: 'COINBASE:ETHUSD', d: 'Ethereum' },
            { s: 'BINANCE:BNBUSD', d: 'Binance Coin' },
        ],
    };

    return symbolMap[exchangeCode] || [];
}

// Default configuration (US markets)
function getDefaultMarketOverviewConfig() {
    return {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
        largeChartUrl: '',
        isTransparent: true,
        showFloatingTooltip: true,
        plotLineColorGrowing: '#0FEDBE',
        plotLineColorFalling: '#0FEDBE',
        gridLineColor: 'rgba(240, 243, 250, 0)',
        scaleFontColor: '#DBDBDB',
        belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
        belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
        symbolActiveColor: 'rgba(15, 237, 190, 0.05)',
        tabs: getDefaultTabs(),
        support_host: 'https://www.tradingview.com',
        backgroundColor: '#141414',
        width: '100%',
        height: 600,
        showSymbolLogo: true,
        showChart: true,
    };
}

function getDefaultTabs() {
    return [
        {
            title: 'Financial',
            symbols: [
                { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
                { s: 'NYSE:WFC', d: 'Wells Fargo Co New' },
                { s: 'NYSE:BAC', d: 'Bank Amer Corp' },
                { s: 'NYSE:HSBC', d: 'Hsbc Hldgs Plc' },
                { s: 'NYSE:C', d: 'Citigroup Inc' },
                { s: 'NYSE:MA', d: 'Mastercard Incorporated' },
            ],
        },
        {
            title: 'Technology',
            symbols: [
                { s: 'NASDAQ:AAPL', d: 'Apple' },
                { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
                { s: 'NASDAQ:MSFT', d: 'Microsoft' },
                { s: 'NASDAQ:META', d: 'Meta Platforms' },
                { s: 'NYSE:ORCL', d: 'Oracle Corp' },
                { s: 'NASDAQ:INTC', d: 'Intel Corp' },
            ],
        },
        {
            title: 'Services',
            symbols: [
                { s: 'NASDAQ:AMZN', d: 'Amazon' },
                { s: 'NYSE:BABA', d: 'Alibaba Group Hldg Ltd' },
                { s: 'NYSE:T', d: 'At&t Inc' },
                { s: 'NYSE:WMT', d: 'Walmart' },
                { s: 'NYSE:V', d: 'Visa' },
            ],
        },
    ];
}
