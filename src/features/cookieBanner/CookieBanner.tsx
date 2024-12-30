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
  const {value, updateCookie} = useCookies({name: "cookieConsent", initialValue: "pending", expireDays: 60})

  useEffect(() => {
    if (value === "pending") {
      pauseLoading();
      setShowBanner(true);
    } else if (value === "denied") {
      pauseLoading();
    }
  }, [pauseLoading, value]);

  const acceptAll = () => {
    updateCookie("accepted", {expires: 60})
    continueLoading();
    setShowBanner(false);
  };

  const rejectAll = () => {
    updateCookie("denied", {expires: 1})
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
