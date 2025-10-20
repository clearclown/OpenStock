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
}

export default function MarketSelector({ markets, selectedMarket, onSelect }: MarketSelectorProps) {
    if (markets.length === 0) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    {selectedMarket ? (
                        <>
                            <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                                {selectedMarket.exchangeCode}
                            </span>
                            <span className="max-w-[200px] truncate">
                                {selectedMarket.exchangeName}
                            </span>
                        </>
                    ) : (
                        "Select Market"
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50" />
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
