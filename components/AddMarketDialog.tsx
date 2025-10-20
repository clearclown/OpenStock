"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Search, Plus, Check, TrendingUp, Coins, DollarSign } from "lucide-react"
import { ALL_MARKETS, searchExchanges, MARKET_EXCHANGES, COMMODITY_MARKETS, CRYPTO_MARKETS, type MarketExchange } from "@/lib/market-exchanges"
import { addCustomMarket } from "@/lib/actions/custom-market.actions"
import { toast } from "sonner"

interface AddMarketDialogProps {
    userId: string;
    existingMarkets?: string[]; // Array of exchange codes already added
}

export default function AddMarketDialog({ userId, existingMarkets = [] }: AddMarketDialogProps) {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [adding, setAdding] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<'all' | 'stocks' | 'commodities' | 'crypto'>('all')

    let filteredExchanges: MarketExchange[] = [];

    if (searchTerm.trim()) {
        // Search across all markets
        filteredExchanges = ALL_MARKETS.filter(ex =>
            ex.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        // Filter by selected tab
        switch (selectedTab) {
            case 'stocks':
                filteredExchanges = MARKET_EXCHANGES;
                break;
            case 'commodities':
                filteredExchanges = COMMODITY_MARKETS;
                break;
            case 'crypto':
                filteredExchanges = CRYPTO_MARKETS;
                break;
            default:
                filteredExchanges = ALL_MARKETS;
        }
    }

    // Group by region for better organization
    const groupedByRegion = filteredExchanges.reduce((acc, exchange) => {
        if (!acc[exchange.region]) {
            acc[exchange.region] = [];
        }
        acc[exchange.region].push(exchange);
        return acc;
    }, {} as Record<string, MarketExchange[]>);

    const handleAddMarket = async (exchange: MarketExchange) => {
        if (existingMarkets.includes(exchange.code)) {
            toast.error('Market already added');
            return;
        }

        setAdding(exchange.code);

        try {
            const result = await addCustomMarket({
                userId,
                exchangeCode: exchange.code,
                exchangeName: exchange.name,
                country: exchange.country,
                region: exchange.region,
            });

            if (result.success) {
                toast.success(`${exchange.name} added successfully`);
            } else {
                toast.error(result.error || 'Failed to add market');
            }
        } catch (error) {
            toast.error('Failed to add market');
        } finally {
            setAdding(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Globe className="h-4 w-4" />
                    Add Market
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Market</DialogTitle>
                    <DialogDescription>
                        Track stock exchanges, commodities, and cryptocurrencies from around the world.
                    </DialogDescription>
                </DialogHeader>

                {/* Tab selector */}
                <div className="flex gap-2 border-b border-gray-800 pb-3">
                    <button
                        onClick={() => setSelectedTab('all')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedTab === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        <Globe className="h-4 w-4" />
                        All Markets
                    </button>
                    <button
                        onClick={() => setSelectedTab('stocks')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedTab === 'stocks' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        <TrendingUp className="h-4 w-4" />
                        Stocks
                    </button>
                    <button
                        onClick={() => setSelectedTab('commodities')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedTab === 'commodities' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        <Coins className="h-4 w-4" />
                        Commodities
                    </button>
                    <button
                        onClick={() => setSelectedTab('crypto')}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedTab === 'crypto' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        <DollarSign className="h-4 w-4" />
                        Crypto
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by country, name, or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                    {Object.keys(groupedByRegion).sort().map((region) => (
                        <div key={region}>
                            <h3 className="text-sm font-semibold text-gray-400 mb-3 sticky top-0 bg-background py-2">
                                {region}
                            </h3>
                            <div className="space-y-2">
                                {groupedByRegion[region].map((exchange) => {
                                    const isAdded = existingMarkets.includes(exchange.code);
                                    const isAdding = adding === exchange.code;

                                    return (
                                        <div
                                            key={exchange.code}
                                            className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:bg-gray-900/50 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                                                        {exchange.code}
                                                    </span>
                                                    <h4 className="font-medium text-sm">
                                                        {exchange.name}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {exchange.country}
                                                </p>
                                            </div>

                                            {isAdded ? (
                                                <Button variant="ghost" size="sm" disabled className="gap-2">
                                                    <Check className="h-4 w-4" />
                                                    Added
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleAddMarket(exchange)}
                                                    disabled={isAdding}
                                                    className="gap-2"
                                                >
                                                    {isAdding ? (
                                                        <>
                                                            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                                                            Adding...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Plus className="h-4 w-4" />
                                                            Add
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
