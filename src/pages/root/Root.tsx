import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import CookieBanner from '@/features/cookieBanner/CookieBanner';
import NavigationSheet from '@/components/customUi/NavigationSheet';

type RootProps = {
  titles: {
    path: string;
    title: string;
  }[];
};


/**
 * Root component includes all other components.
 * It shows only the component that user have navigated to.
 * All site properties that affect all sites should be implemented
 * here like navigation bar, footer, background image if earth etc...
 */
export default function Root({ titles }: Readonly<RootProps>) {
  return (
    <div>
     
        <div className="flex flex-col min-h-screen relative  ">
          <NavigationSheet titles={titles}/>
                <Outlet />
            </div>
          <CookieBanner/>
          <Footer />
        </div>
  );
}