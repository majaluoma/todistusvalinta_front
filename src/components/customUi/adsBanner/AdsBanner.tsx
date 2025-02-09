import AdsenseAd from './AdsenseAd';
import CustomAd from './CustomAd';
import { AdsBannerProps, CustomAdSchema } from './types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

/** Shows advertisements
 *  Registers interactions with the server
 *  AUTOPLAY NOT IMPLEMENTED
 * */
export default function AdsBanner({ ads }: Readonly<AdsBannerProps>) {
  // AUTOPLAY NOT IMPLEMENTED
  
  return (
    <Carousel className="shadow-sm shadow-secondary">
      <CarouselContent>
        {ads.map((ad) => {
          const parsedCustomAd = CustomAdSchema.safeParse(ad).data;
          return (
            <CarouselItem key={`ad_${ad.id}`}>
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
