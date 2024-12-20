import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import CookieBanner from '@/features/cookieBanner/CookieBanner';
import NavigationSheet from '@/pages/root/NavigationSheet';
import Header from './Header';

type RootProps = {
  titles: {
    path: string;
    title: string;
  }[];
};

/**
 * Root component includes all other components.
 * It shows only the component that user have navigated to.
 * All properties that affect all sites should be implemented
 * here like navigation bar, footer, background image earth etc...
 */
export default function Layout({ titles }: Readonly<RootProps>) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center gap-10">
      <NavigationSheet titles={titles} />
      <Header/>
      <div className="bg-background w-1/2 min-w-min">
        <Outlet />
      </div>
      <CookieBanner />
      <Footer />
    </div>
  );
}
