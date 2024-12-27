import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DegreeItem from './DegreeItem';
import { firstUpper } from '@/lib/utils';
import { useResultContext } from '@/features/calculator/context/resultContext/useResultContext';
import { DegreeObject } from '@/types/apiTypes';
import { AccordionAds } from '@/data/adsData';
import NumberBall from '@/components/customUi/NumberBall';
import { useEffect, useState } from 'react';
import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';

export default function ThemeAccordion() {
  const { degrees } = useResultContext();
  const [passedTotal, setPassedTotal] = useState(new Map<string, number>());
  useEffect(() => {
    const passedAmountPerTheme = () => {
      return degrees.map(function filterPassed(theme): [string, number] {
        const passedDegrees = theme.hakukohteet.filter((e) => {
          return (
            e.vuosikerrat[0].laskumalli.summa.pisteet >
            e.vuosikerrat[0].pisteRaja
          );
        });
        return [theme.aihe, passedDegrees.length];
      });
    };
    setPassedTotal(new Map<string, number>(passedAmountPerTheme()));
  }, [degrees]);
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
    <>
    <h2 className='text-lg font-bold'>Tulokset</h2>
    <Accordion type="single" collapsible className="w-full">
      {degrees.map((theme, index) => {
        return (
          <AccordionItem key={`theme_${theme.AiheID}`} value={`item-${index}`}>
            <AccordionTrigger className="flex flex-row justify-between p-2 rounded-md group pb-3 pt-3">
              <div className="flex flex-row items-center gap-2">
                <span className="group-hover:underline text-start text-xl">{firstUpper(theme.aihe)}</span>
                <NumberBall
                  number={theme.hakukohteet.length}
                  className="bg-transparent mr-9"
                />
              </div>

              <NumberBall
                number={passedTotal.get(theme.aihe)}
                className="ml-auto mr-2 text-secondary-foreground"
              />
            </AccordionTrigger>
            {degreesAndAds(theme.hakukohteet).map(({ degree, ad }) => {
              return (
                <div key={`degree_${degree.HakukohdeID}`} className='mb-2'>
                  {ad && (
                    <AccordionContent>
                      <AdsBanner ads={[ad]} />
                    </AccordionContent>
                  )}
                  <AccordionContent className='p-0'>
                    <DegreeItem degree={degree}/>
                  </AccordionContent>
                </div>
              );
            })}
          </AccordionItem>
        );
      })}
    </Accordion>
    </>) : (
    <></>
  );
}
