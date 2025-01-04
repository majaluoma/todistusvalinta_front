import { useEffect } from 'react';
const VITE_ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;
const VITE_ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT;

/** Shows Google Adsense advertisements and loads the Ads via API
 *  Registers interactions with the server
 * */
export default function AdsenseAd() {
  useEffect(() => {
    const scriptId = 'adsbygoogle-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.crossOrigin = 'anonymous';
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
    <div className="w-[21rem] sm:w-[24rem] md:w-[32rem] lg:w-[35rem] overflow-hidden">
      <ins
        className="adsbygoogle block w-[21rem] sm:w-[24rem] md:w-[32rem] lg:w-[35rem] max-h-[21rem]"
        data-ad-client={VITE_ADSENSE_CLIENT}
        data-ad-slot={VITE_ADSENSE_SLOT}
        data-ad-format="rectangle, horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
