export {};

declare global {
  interface Window {
    adsbygoogle: AdsByGoogle;
  }
}

export type AdsByGoogle = {
  pauseAdRequests : 0 | 1;
  requestNonPersonalizedAds : boolean;
} & object []