import TradingViewWidget from "@/components/TradingViewWidget";
import AddMarketDialog from "@/components/AddMarketDialog";
import CustomMarketsList from "@/components/CustomMarketsList";
import DynamicMarketWidgets from "@/components/DynamicMarketWidgets";
import {
    MARKET_DATA_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getUserCustomMarkets } from "@/lib/actions/custom-market.actions";

const Home = async () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    // Get current user
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id || '';

    // Get user's custom markets
    const customMarkets = userId ? await getUserCustomMarkets(userId) : [];
    const existingMarketCodes = customMarkets.map(m => m.exchangeCode);

    return (
        <div className="flex min-h-screen home-wrapper">
            {/* Custom Markets Section */}
            {userId && (
                <section className="w-full mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">My Markets</h2>
                        <AddMarketDialog userId={userId} existingMarkets={existingMarketCodes} />
                    </div>
                    {customMarkets.length > 0 ? (
                        <CustomMarketsList markets={customMarkets} userId={userId} />
                    ) : (
                        <div className="text-center py-12 border border-dashed border-gray-800 rounded-lg">
                            <p className="text-gray-500 mb-4">No custom markets added yet.</p>
                            <p className="text-sm text-gray-600">
                                Click "Add Market" to track stock markets from around the world.
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Dynamic Market Widgets - Client component for market switching */}
            <DynamicMarketWidgets markets={customMarkets} />
            <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-2">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}market-quotes.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        height={600}
                    />
                </div>

            </section>
        </div>
    )
}

export default Home;