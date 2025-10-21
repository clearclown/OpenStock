'use client';
import { useEffect, useRef }     from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous widget completely
        containerRef.current.innerHTML = '';
        delete containerRef.current.dataset.loaded;

        // Debug: Log the config being used
        console.log('🔧 TradingView Widget Config:', {
            scriptUrl,
            config,
            configJSON: JSON.stringify(config, null, 2)
        });

        // Create widget container
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container__widget';
        widgetContainer.style.width = '100%';
        widgetContainer.style.height = `${height}px`;

        // Create script tag with config
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.type = 'text/javascript';
        script.innerHTML = JSON.stringify(config);

        // Append elements
        containerRef.current.appendChild(widgetContainer);
        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        // Cleanup function
        return () => {
            if(containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
            }
        }
    }, [scriptUrl, JSON.stringify(config), height])

    return containerRef;
}
export default useTradingViewWidget