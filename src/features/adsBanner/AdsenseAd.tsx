import { useEffect } from "react";

export default function AdsenseAd() {

    useEffect(() => {
        // Ensure the script is loaded only once
        const scriptId = 'adsbygoogle-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.async = true;
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
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
        className="adsbygoogle block"
        data-ad-client="ca-pub-6696837920628178"
        data-ad-slot="3214961674"
        data-ad-format="rectangle, horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
