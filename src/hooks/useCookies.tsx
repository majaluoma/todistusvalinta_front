import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
type UseCookiesProps = {
  name:
    | 'sessionDegreesMatriculation'
    | 'sessionDegreesVocational'
    | 'cookieConsent';
  initialValue: string;
  expireDays: number;
};

export default function useCookies({
  name,
  initialValue,
  expireDays,
}: UseCookiesProps) {
  const [cookiesAccepted, setCookiesAccepted] = useState(()=> {return Cookies.get('cookieConsent') === "accepted"})
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie !== undefined) {
      return cookie;
    } else if (Cookies.get('cookieConsent') === 'accepted') {
      Cookies.set(name, initialValue, { expires: expireDays, path: '' });
      setValue(initialValue);
      return initialValue;
    }
    return initialValue;
  });

  const updateCookie = useCallback(
    (newValue: string, options: Cookies.CookieAttributes) => {
      if (Cookies.get('cookieConsent') === 'accepted') {
        Cookies.set(name, newValue, options);
      }
      setValue(newValue);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue('');
  }, [name]);

  const allowCookies = useCallback(() => {
    updateCookie("accepted", {expires: 60});
    setCookiesAccepted(true);
  }, [updateCookie])

  return { value, cookiesAccepted, deleteCookie, updateCookie, allowCookies };
}
