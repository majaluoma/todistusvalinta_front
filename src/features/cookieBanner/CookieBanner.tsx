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
import useAds from '@/hooks/GoogleAdHooks';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { continueLoading, pauseLoading } = useAds();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      pauseLoading();
      setShowBanner(true);
    }
  }, [pauseLoading]);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'cookie');
    continueLoading();
    setShowBanner(false);
  };

  const rejectAll = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <Card className="max-w-2xl mx-auto">
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
          <Button variant="outline" onClick={rejectAll}>
            Hyväksy
          </Button>
          <Button onClick={acceptAll}>Ei kiitos</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
