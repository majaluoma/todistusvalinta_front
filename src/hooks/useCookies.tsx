import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { UseCookiesProps } from './types';

/** Allows manipulation of application cookies.
 * Also controls if cookies are accepted
 *
 */
export default function useCookies({
  name,
  initialValue,
  expireDays,
}: UseCookiesProps) {
  const [cookiesAccepted, setCookiesAccepted] = useState(() => {
    return Cookies.get('cookieConsent') === 'accepted';
  });
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie !== undefined) {
      return cookie;
    } else if (cookiesAccepted) {
      Cookies.set(name, initialValue, {
        expires: expireDays,
        path: '',
        sameSite: 'None',
        secure: true,
      });
      setValue(initialValue);
      return initialValue;
    }
    return initialValue;
  });

  const updateCookie = useCallback(
    (newValue: string, options: Cookies.CookieAttributes) => {
      if (cookiesAccepted) {
        Cookies.set(name, newValue, options);
      }
      setValue(newValue);
    },
    [name, cookiesAccepted],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue('');
  }, [name]);

  const allowCookies = useCallback((allowed: boolean) => {
    Cookies.set('cookieConsent', `${allowed ? 'accepted' : 'denied'}`, {
      expires: 90,
      sameSite: 'None',
      secure: true,
    });
    setCookiesAccepted(true);
    setValue('accepted');
  }, []);

  return { value, cookiesAccepted, deleteCookie, updateCookie, allowCookies };
}
