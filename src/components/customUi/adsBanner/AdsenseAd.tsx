import { useEffect } from 'react';
const VITE_ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;
const VITE_ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT;
export default function AdsenseAd() {
  useEffect(() => {
    // Ensure the script is loaded only once
    const scriptId = 'adsbygoogle-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      document.body.appendChild(script);
    }

    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle block h-[250px]"
        data-ad-client={VITE_ADSENSE_CLIENT}
        data-ad-slot={VITE_ADSENSE_SLOT}
        data-ad-format="rectangle, horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}