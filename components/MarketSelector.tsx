"use client"

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Market {
    exchangeCode: string;
    exchangeName: string;
    country: string;
    region: string;
}

interface MarketSelectorProps {
    markets: Market[];
    selectedMarket: Market | null;
    onSelect: (market: Market) => void;
    label?: string;
}

export default function MarketSelector({ markets, selectedMarket, onSelect, label }: MarketSelectorProps) {
    if (markets.length === 0) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[200px]">
                    {selectedMarket ? (
                        <>
                            <span className="font-mono text-xs bg-blue-900/50 px-2 py-1 rounded text-blue-300">
                                {selectedMarket.exchangeCode}
                            </span>
                            <span className="max-w-[120px] truncate text-sm">
                                {selectedMarket.country}
                            </span>
                        </>
                    ) : (
                        <span className="text-sm">{label || "Select Market"}</span>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] max-h-[400px] overflow-y-auto">
                {markets.map((market) => (
                    <DropdownMenuItem
                        key={market.exchangeCode}
                        onClick={() => onSelect(market)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                                    {market.exchangeCode}
                                </span>
                                <span className="font-medium text-sm">
                                    {market.exchangeName}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {market.country} • {market.region}
                            </p>
                        </div>
                        {selectedMarket?.exchangeCode === market.exchangeCode && (
                            <Check className="h-4 w-4 text-blue-400" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
