import { useRouteError } from 'react-router-dom';
import ErrorBlock from './ErrorBlock';
import Footer from '@/pages/root/Footer';
import useNoIndex from '@/hooks/useNoIndex';

/**
 * Shows errors as a whole new page.
 * Ue this for navigation errors for instance.
 */
export default function ErrorPage() {
  const error = useRouteError();
  useNoIndex()

  return (
    <div className="h-[24rem] flex flex-col justify-center items-center align-middle relative">
        <div className="flex-grow">
          <ErrorBlock error={error}></ErrorBlock>
        </div>

      <Footer />
    </div>
  );
}
