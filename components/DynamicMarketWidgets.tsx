"use client"

import { useState, useEffect } from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import MarketSelector from "@/components/MarketSelector";
import { generateMarketOverviewConfig, generateHeatmapConfig } from "@/lib/tradingview-configs";

interface Market {
    exchangeCode: string;
    exchangeName: string;
    country: string;
    region: string;
}

interface DynamicMarketWidgetsProps {
    markets: Market[];
}

export default function DynamicMarketWidgets({ markets }: DynamicMarketWidgetsProps) {
    const [selectedMarket, setSelectedMarket] = useState<Market | null>(markets[0] || null);
    const [marketOverviewConfig, setMarketOverviewConfig] = useState(() =>
        generateMarketOverviewConfig(markets)
    );
    const [heatmapConfig, setHeatmapConfig] = useState(() =>
        generateHeatmapConfig(markets[0])
    );
    const [key, setKey] = useState(0); // Force re-render of widgets

    const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

    // Update configs when selected market changes
    useEffect(() => {
        if (selectedMarket) {
            setHeatmapConfig(generateHeatmapConfig(selectedMarket));
            setKey(prev => prev + 1); // Force widget refresh
        }
    }, [selectedMarket]);

    // Update market overview when markets list changes
    useEffect(() => {
        setMarketOverviewConfig(generateMarketOverviewConfig(markets));
        setKey(prev => prev + 1);
    }, [markets]);

    return (
        <section className="grid w-full gap-8 home-section">
            <div className="md:col-span-1 xl:col-span-1">
                <TradingViewWidget
                    key={`overview-${key}`}
                    title={markets.length > 0 ? "My Markets Overview" : "Market Overview"}
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={marketOverviewConfig}
                    className="custom-chart"
                    height={600}
                />
            </div>
            <div className="md-col-span xl:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {selectedMarket ? `${selectedMarket.country} Heatmap` : "Stock Heatmap"}
                    </h3>
                    {markets.length > 1 && (
                        <MarketSelector
                            markets={markets}
                            selectedMarket={selectedMarket}
                            onSelect={setSelectedMarket}
                        />
                    )}
                </div>
                <TradingViewWidget
                    key={`heatmap-${selectedMarket?.exchangeCode}-${key}`}
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={heatmapConfig}
                    height={600}
                />
            </div>
        </section>
    );
}
