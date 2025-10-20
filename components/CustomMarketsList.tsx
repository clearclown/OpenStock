"use client"

import { Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeCustomMarket } from "@/lib/actions/custom-market.actions";
import { toast } from "sonner";
import { useState } from "react";

interface Market {
    exchangeCode: string;
    exchangeName: string;
    country: string;
    region: string;
    addedAt: Date;
}

interface CustomMarketsListProps {
    markets: Market[];
    userId: string;
}

export default function CustomMarketsList({ markets, userId }: CustomMarketsListProps) {
    const [removing, setRemoving] = useState<string | null>(null);

    const handleRemove = async (exchangeCode: string, exchangeName: string) => {
        setRemoving(exchangeCode);

        try {
            const result = await removeCustomMarket({ userId, exchangeCode });

            if (result.success) {
                toast.success(`${exchangeName} removed successfully`);
            } else {
                toast.error(result.error || 'Failed to remove market');
            }
        } catch (error) {
            toast.error('Failed to remove market');
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((market) => (
                <div
                    key={market.exchangeCode}
                    className="relative group p-4 rounded-lg border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 transition-all"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe className="h-4 w-4 text-blue-400" />
                                <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                                    {market.exchangeCode}
                                </span>
                            </div>
                            <h3 className="font-semibold text-sm mb-1">
                                {market.exchangeName}
                            </h3>
                            <div className="text-xs text-gray-500">
                                <p>{market.country}</p>
                                <p className="text-gray-600">{market.region}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemove(market.exchangeCode, market.exchangeName)}
                            disabled={removing === market.exchangeCode}
                        >
                            {removing === market.exchangeCode ? (
                                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4 text-red-400" />
                            )}
                        </Button>
                    </div>

                    {/* You can add market-specific data here later */}
                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <a
                            href={`https://www.tradingview.com/markets/stocks-${market.country.toLowerCase().replace(/\s+/g, '-')}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
                        >
                            View on TradingView →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
