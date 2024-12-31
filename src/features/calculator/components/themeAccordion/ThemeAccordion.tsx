import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { firstUpper } from '@/lib/utils';
import { useResultContext } from '@/features/calculator/context/resultContext/useResultContext';
import { DegreeObject } from '@/types/apiTypes';
import { AccordionAds } from '@/data/adsData';
import NumberBall from '@/components/customUi/NumberBall';
import { useEffect, useState } from 'react';
import VirtualizedDegreeList from './VirtualizedDegreeList';

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

  return degrees.length > 0 ? (
    <div>
      <div className="flex flex-row justify-between w-full pr-6">
        <h2 className="text-2xl font-bold">Tulokset</h2>
        <div className="flex flex-row gap-1 mr-8">
          <NumberBall
            text={'✓'}
            className="bg-primary text-secondary-foreground text-xl font-bold"
          />
          <NumberBall
            text={'𐄂'}
            className="border-2 bg-transparent border-black font-bold text-xl"
          />
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {degrees.map((theme, index) => {
          return (
            <AccordionItem
              key={`theme_${theme.AiheID}`}
              value={`item-${index}`}
            >
              <AccordionTrigger className="flex flex-row justify-between px-6 rounded-md group py-3 bg-card hover:bg-background mb-2 ">
                <span className="group-hover:underline text-start text-xl">
                  {firstUpper(theme.aihe)}
                </span>
                <div className="flex ml-auto justify-end">
                  <NumberBall
                    text={passedTotal.get(theme.aihe)}
                    className="ml-auto mr-2 text-secondary-foreground m-auto bg-primary"
                  />
                  <NumberBall
                    text={
                      theme.hakukohteet.length -
                      (passedTotal.get(theme.aihe) ?? 0)
                    }
                    className="mr-5 bg-transparent m-auto "
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="">
                <VirtualizedDegreeList
                  degreesAndAds={degreesAndAds(theme.hakukohteet)}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  ) : (
    <></>
  );
}
