"use client";

import { useEffect, useState } from "react";

const PizzaLoader = () => {
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Fetch SVG from Umbraco
    const fetchSettings = async () => {
      try {
        const res = await fetch(
          "https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net/umbraco/delivery/api/v1/content?filter=contentType:settingsPage"
        );
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
          const settings = data.items[0];
          
          // Try different possible paths to the logo
          const logoPath = 
            settings.properties?.logos?.loadingLogo?.[0]?.url || 
            settings.properties?.loadingLogo?.[0]?.url;
          
          if (logoPath) {
            const fullLogoUrl = `https://pizzalover-g7fnhxctfsfbe6c7.westeurope-01.azurewebsites.net${logoPath}`;
            setSvgUrl(fullLogoUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();

    // This artificial delay will keep the loader visible for testing
    // Adjust the time value (in milliseconds) to make it longer or shorter
    const artificialDelay = 5000; // 5 seconds delay
    
    // Check when the page is fully loaded, but with artificial delay
    const handleLoad = () => {
      console.log("Page loaded, applying artificial delay for testing");
      setTimeout(() => {
        setPageLoaded(true);
        console.log("Loader hidden after delay");
      }, artificialDelay);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // If the page is loaded, don't display the loader
  if (pageLoaded) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#FBF6E9] z-50">
      <div className="flex flex-col items-center">
        {svgUrl ? (
          <img 
            src={svgUrl} 
            alt="Loading Logo" 
            className="w-24 h-24" 
            style={{
              animation: "slowSpin 8s linear infinite"
            }}
          />
        ) : null}
        <p className="text-lg font-medium text-gray-700 mt-4">Loading...</p>
      </div>
      
      <style jsx global>{`
        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PizzaLoader;