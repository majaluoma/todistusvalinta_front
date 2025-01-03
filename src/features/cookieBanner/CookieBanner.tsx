import { useState, useEffect } from 'react';
import privacyPolicy from '@/assets/privacyPolicy.pdf';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAds from '@/hooks/useAds';
import useCookies from '@/hooks/useCookies';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { continueLoading, pauseLoading } = useAds();
  const {value, cookiesAccepted, allowCookies,} = useCookies({name: "cookieConsent", initialValue: "pending", expireDays: 90})

  useEffect(() => {
    if (!cookiesAccepted) {
      pauseLoading();
    }
    if (value === "pending") {
      setShowBanner(true);
    }
  }, [pauseLoading, setShowBanner, cookiesAccepted, value]);

  const acceptAll = () => {
    allowCookies(true)
    continueLoading();
    setShowBanner(false);
  };

  const rejectAll = () => {
    allowCookies(false)
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 mb-4 z-50 flex items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Evästeet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Voit halutessasi hyväksyä myös keksit. Tarkemmat tiedot evästeistä
            löydät{' '}
            <a className="text-blue-900 underline" href={privacyPolicy}>
              tietosuojaselosteesta.
            </a>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          <Button variant="outline" onClick={acceptAll}>
            Hyväksy
          </Button>
          <Button onClick={rejectAll}>Ei kiitos</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
