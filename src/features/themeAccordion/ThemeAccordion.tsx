import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DegreeItem from './DegreeItem';
import { firstUpper } from '@/lib/utils';
import { useResultContext } from '@/components/context/resultContext/useResultContext';
import { DegreeObject } from '@/types/apiTypes';
import AdsBanner from '../adsBanner/AdsBanner';
import { AccordionAds } from '@/data/adsData';
import NumberBall from '@/components/customUi/NumberBall';

export default function ThemeAccordion() {
  const { degrees, passedTotal } = useResultContext();

  const degreesAndAds = (degrees: DegreeObject[]) => {
    const degreesAndAds = degrees.map((degree) => {
      return {
        degree: degree,
        ad: AccordionAds.find((ad) => {
          return parseInt(ad.id.split('_')[1]) === degree.HakukohdeID;
        }),
      };
    });

    return degreesAndAds;
  };

  return degrees.length > 0 ? (
    <Accordion type="single" collapsible className="w-full">
      {degrees.map((theme, index) => {
        return (
          <AccordionItem key={`theme_${theme.AiheID}`} value={`item-${index}`}>
            <AccordionTrigger className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2">
                {firstUpper(theme.aihe)}
                <NumberBall
                  number={theme.hakukohteet.length}
                  className="bg-transparent"
                />
              </div>

              <NumberBall number={passedTotal.get(theme.aihe) } className="ml-auto mr-2 text-secondary-foreground" />
            </AccordionTrigger>
            {degreesAndAds(theme.hakukohteet).map(({ degree, ad }) => {
              return (
                <div key={`degree_${degree.HakukohdeID}`}>
                  {ad && (
                    <AccordionContent>
                      <AdsBanner ads={[ad]} />
                    </AccordionContent>
                  )}
                  <AccordionContent>
                    <DegreeItem degree={degree} />
                  </AccordionContent>
                </div>
              );
            })}
          </AccordionItem>
        );
      })}
    </Accordion>
  ) : (
    <></>
  );
}
