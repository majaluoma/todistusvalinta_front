export type UseCookiesProps = {
    name:
      | 'sessionDegreesMatriculation'
      | 'sessionDegreesVocational'
      | 'cookieConsent';
    initialValue: string;
    expireDays: number;
  };