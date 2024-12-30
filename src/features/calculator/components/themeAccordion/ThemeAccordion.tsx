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
            e.vuosikerrat[0].laskumalli.summa.pisteet >=
              e.vuosikerrat[0].pisteRaja && e.vuosikerrat[0].kynnysehtoOK
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
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Tulokset</h2>
        <div className="flex flex-row gap-1 mr-6">
          <NumberBall
            text={'🙁'}
            className="border-2 bg-transparent border-black"
          />
          <NumberBall text={'🙂'} />
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {degrees.map((theme, index) => {
          return (
            <AccordionItem
              key={`theme_${theme.AiheID}`}
              value={`item-${index}`}
            >
              <AccordionTrigger className="flex flex-row justify-between p-2 rounded-md group pb-3 pt-3 w-max bg-card hover:bg-background mb-2 ">
                <span className="group-hover:underline text-start text-xl">
                  {firstUpper(theme.aihe)}
                </span>
                <div className="flex ml-auto justify-end">
                  <NumberBall
                    text={
                      theme.hakukohteet.length -
                      (passedTotal.get(theme.aihe) ?? 0)
                    }
                    className="mr-5 bg-transparent m-auto"
                  />
                  <NumberBall
                    text={passedTotal.get(theme.aihe)}
                    className="ml-auto mr-2 text-secondary-foreground m-auto bg-primary"
                  />
                </div>
              </AccordionTrigger>
              {degreesAndAds(theme.hakukohteet).map(({ degree, ad }) => {
                return (
                  <div key={`degree_${degree.HakukohdeID}`} className="">
                    {ad && (
                      <AccordionContent>
                        <AdsBanner ads={[ad]} />
                      </AccordionContent>
                    )}
                    <AccordionContent className="">
                      <DegreeItem degree={degree} />
                    </AccordionContent>
                  </div>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  ) : (
    <></>
  );
}
