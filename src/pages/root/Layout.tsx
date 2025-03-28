import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import CookieBanner from '@/features/cookieBanner/CookieBanner';
import NavigationSheet from '@/pages/root/NavigationSheet';
import Header from './Header';
import { RootProps } from './types';
import NewsHeader from './NewsHeader';

/**
 * Root component includes all other components.
 * It shows only the component that user have navigated to.
 * All properties that affect all sites should be implemented
 * here like navigation bar, footer, background image earth etc...
 */
export default function Layout({ titles }: Readonly<RootProps>) {
  return (
    <div className="bg-background flex flex-col justify-center items-center gap-10 h-max overflow-x-hidden align-top pt-[4.5rem] sm:pt-20 md:pt-24 lg:pt-[6.5rem]">
      <NavigationSheet titles={titles} />
      <Header />
      <NewsHeader news="" />
      {/* Parent container for Outlet with fixed responsive widths */}
      <div className="flex flex-col bg-background w-[22rem] sm:w-[26rem] md:w-[34rem] lg:w-[42rem] justify-center items-center align-top">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <CookieBanner />
      <Footer />
    </div>
  );
}
