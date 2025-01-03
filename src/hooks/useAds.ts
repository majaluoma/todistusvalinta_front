import { AccordionAds } from "@/data/adsData";
import { AdsArray } from "@/types/apiTypes";
import { useEffect, useState } from "react";

export default function useAds () {
    const [loadingEnabled, setLoadingEnabled] = useState(true);
    const [personalizedAdsAllowed, setPersonalizedAdsAllowed] = useState(true);
    const [accordionAds, setAccordionAds] = useState<AdsArray>([]);

    useEffect (() => {
        if (loadingEnabled) {
            setAccordionAds(AccordionAds);
        } else {
            setAccordionAds([]);
        }
    },[loadingEnabled]);
    
    const pauseLoading = () => {
        (window.adsbygoogle || []).pauseAdRequests = 1;
        setLoadingEnabled(false);
    }

    const continueLoading = () => {
        try {
            (window.adsbygoogle || []).pauseAdRequests = 0;
            (window.adsbygoogle || []).requestNonPersonalizedAds = true;
            setPersonalizedAdsAllowed(true);
            setLoadingEnabled(true);
        }catch (error : unknown) {
            console.log(error)
        }
    }

    return {pauseLoading, continueLoading, loadingEnabled, personalizedAdsAllowed, accordionAds}
    
}