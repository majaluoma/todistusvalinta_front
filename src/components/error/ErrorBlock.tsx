import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

/**
 * Errors as a nice Card instead of a whole page
 * Use this component to display any Error you want, but
 * add Error type handling to useEffect -part before you
 * add new type of Errors
 */
type ErrorBlockProps = {
  error: unknown;
};
export default function ErrorBlock({ error }: ErrorBlockProps) {
  //This console.error is left here for purpose so that errors are shown in the console as well.
  console.error(error);
  const [errorMessage, setErrorMessage] = useState('');

  //Defines what to do with different type of Errors
  useEffect(() => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else if (typeof error === 'string') {
      setErrorMessage(error);
    } else {
      console.error(error);
      setErrorMessage('Tuntematon virhe, tutkimme asiaa');
    }
  }, [error]);

  return (
    <div>
      <Card id="error-page">
        <CardHeader>
          <CardTitle>Oops!</CardTitle>
        </CardHeader>
        <CardDescription>
          Pahoittelut, odottamaton virhe pääsi sattumaan.
        </CardDescription>
        <CardContent>
          <p>{errorMessage}</p>
        </CardContent>
      </Card>
    </div>
  );
}
