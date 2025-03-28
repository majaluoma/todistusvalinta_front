import { useEffect, useRef } from 'react';
import { postClick } from './api/postClick';
import { postView } from './api/postView';
import { CustomAdProps } from './types';
import useOnScreen from '@/hooks/useOnScreen';

/** Shows custom defined advertisements
 *  Registers interactions with the server
 * */
export default function CustomAd({ ad }: Readonly<CustomAdProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      postView(ad.id);
    }
  }, [isVisible, ad.id]);

  const handleClick = () => {
    postClick(ad.id);
  };

  return (
    <div ref={ref} >
      <a onClick={handleClick} href={'https://www.' + ad.osoite}>
        <img src={`assets/ads/${ad.kuva}`} alt={ad.kuvaus} className='max-w-full max-h-80' />
      </a>
    </div>
  );
}
