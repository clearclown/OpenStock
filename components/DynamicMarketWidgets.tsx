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
    // Separate states for Overview and Heatmap
    const [selectedOverviewMarket, setSelectedOverviewMarket] = useState<Market | null>(markets[0] || null);
    const [selectedHeatmapMarket, setSelectedHeatmapMarket] = useState<Market | null>(markets[0] || null);

    const [marketOverviewConfig, setMarketOverviewConfig] = useState(() =>
        generateMarketOverviewConfig(markets)
    );
    const [heatmapConfig, setHeatmapConfig] = useState(() =>
        generateHeatmapConfig(markets[0])
    );
    const [overviewKey, setOverviewKey] = useState(0);
    const [heatmapKey, setHeatmapKey] = useState(0);

    const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

    // Update overview config when selected market changes
    useEffect(() => {
        if (selectedOverviewMarket) {
            console.log('📈 Overview Market Changed:', selectedOverviewMarket);
            // Generate config with selected market emphasized
            const config = generateMarketOverviewConfig([selectedOverviewMarket, ...markets.filter(m => m.exchangeCode !== selectedOverviewMarket.exchangeCode)]);
            console.log('📈 Generated Overview Config:', config);
            setMarketOverviewConfig(config);
            setOverviewKey(prev => prev + 1);
        }
    }, [selectedOverviewMarket, markets]);

    // Update heatmap config when selected market changes
    useEffect(() => {
        if (selectedHeatmapMarket) {
            console.log('📊 Heatmap Market Changed:', selectedHeatmapMarket);
            const newConfig = generateHeatmapConfig(selectedHeatmapMarket);
            console.log('📊 Generated Heatmap Config:', newConfig);
            setHeatmapConfig(newConfig);
            setHeatmapKey(prev => prev + 1);
        }
    }, [selectedHeatmapMarket]);

    // Initialize selected markets when markets list changes
    useEffect(() => {
        if (markets.length > 0) {
            if (!selectedOverviewMarket || !markets.find(m => m.exchangeCode === selectedOverviewMarket.exchangeCode)) {
                setSelectedOverviewMarket(markets[0]);
            }
            if (!selectedHeatmapMarket || !markets.find(m => m.exchangeCode === selectedHeatmapMarket.exchangeCode)) {
                setSelectedHeatmapMarket(markets[0]);
            }
        }
    }, [markets]);

    return (
        <section className="grid w-full gap-8 home-section">
            <div className="md:col-span-1 xl:col-span-1">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {selectedOverviewMarket
                            ? `${selectedOverviewMarket.country} Market Overview`
                            : "Market Overview"}
                    </h3>
                    {markets.length > 0 && (
                        <MarketSelector
                            markets={markets}
                            selectedMarket={selectedOverviewMarket}
                            onSelect={setSelectedOverviewMarket}
                            label="Overview Market"
                        />
                    )}
                </div>
                <TradingViewWidget
                    key={`overview-${overviewKey}`}
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={marketOverviewConfig}
                    className="custom-chart"
                    height={600}
                />
            </div>
            <div className="md-col-span xl:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {selectedHeatmapMarket
                            ? `${selectedHeatmapMarket.country} Heatmap`
                            : "Stock Heatmap"}
                    </h3>
                    {markets.length > 0 && (
                        <MarketSelector
                            markets={markets}
                            selectedMarket={selectedHeatmapMarket}
                            onSelect={setSelectedHeatmapMarket}
                            label="Heatmap Market"
                        />
                    )}
                </div>
                <TradingViewWidget
                    key={`heatmap-${heatmapKey}`}
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={heatmapConfig}
                    height={600}
                />
            </div>
        </section>
    );
}
