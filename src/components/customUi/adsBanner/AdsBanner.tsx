import { useRef } from 'react';
import AdsenseAd from './AdsenseAd';
import CustomAd from './CustomAd';
import { AdsBannerProps, CustomAdSchema } from './types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

/** Shows advertisements
 *  Registers interactions with the server
 * */
export default function AdsBanner({ ads, className = "" }: Readonly<AdsBannerProps>) {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })); 
  const fadeIn = useRef(Fade({})); 
  console.log(ads.length)
  return (
    <Carousel plugins={[fadeIn.current, autoplay.current]} opts={{
        align: 'center',
        containScroll: false
      }}
    >
      <CarouselContent >
        {ads.map((ad) => {
          const parsedCustomAd = CustomAdSchema.safeParse(ad).data;
          return (
            <CarouselItem className={`basis-full max-w-[40rem]  ${className}`} key={`ad_${ad.id}`}>
              {parsedCustomAd ? (
                <CustomAd ad={parsedCustomAd}></CustomAd>
              ) : (
                <AdsenseAd></AdsenseAd>
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
