import { useEffect, useRef } from 'react';
import { postClick } from './api/postClick';
import { postView } from './api/postView';
import { CustomAdProps } from './types';
import useOnScreen from '@/hooks/useOnScreen';
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
    <div ref={ref}>
      <a onClick={handleClick} href={ad.osoite}>
        <img src={`assets/${ad.kuva}`} alt={ad.kuvaus} />
      </a>
    </div>
  );
}
