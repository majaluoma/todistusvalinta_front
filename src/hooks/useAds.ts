import { useState } from "react";

export default function useAds () {
    const [loadingEnabled, setLoadingEnabled] = useState(true);
    const [personalizedAdsAllowed, setPersonalizedAdsAllowed] = useState(true);
    const pauseLoading = () => {
        (window.adsbygoogle || []).pauseAdRequests = 1;
        setLoadingEnabled(false);
    }

    const continueLoading = () => {
        (window.adsbygoogle || []).pauseAdRequests = 0;
        (window.adsbygoogle || []).requestNonPersonalizedAds = true;
        setPersonalizedAdsAllowed(true);
        setLoadingEnabled(true);
    }

    return {pauseLoading, continueLoading, loadingEnabled, personalizedAdsAllowed}
    
}