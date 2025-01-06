import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { firstUpper } from '@/lib/utils';
import { useResultContext } from '@/features/calculator/context/resultContext/useResultContext';
import { DegreeObject, ThemeObject } from '@/types/apiTypes';
import NumberBall from '@/components/customUi/NumberBall';
import { useEffect, useState } from 'react';
import VirtualizedDegreeList from './VirtualizedDegreeList';
import Searchbar from './SearchBar';
import useAds from '@/hooks/useAds';
import { Ad, CustomAd } from '@/components/customUi/adsBanner/types';

const degreesAndAdsOrdered = (degrees: DegreeObject[], ads : (Ad | CustomAd) []) => {
  const degreesAndAds : (DegreeObject | CustomAd | Ad)[] = []
   degrees.forEach((degree) => {
    degreesAndAds.push(degree);
    const ad = ads.find((ad) => {
      return parseInt(ad.id.split('_')[1]) === degree.HakukohdeID;
    })
    if (ad) {
      degreesAndAds.push(ad);
    }
  }
  );
  return degreesAndAds;
};

export default function ThemeAccordion() {
  const { degrees, resultParams } = useResultContext();
  const [filteredDegrees, setFilteredDegrees] = useState<ThemeObject[]>([]);
  const [passedTotal, setPassedTotal] = useState(new Map<string, number>());
  const {accordionAds} = useAds();
  useEffect(() => {
    const passedAmountPerTheme = () => {
      return filteredDegrees.map(function filterPassed(
        theme,
      ): [string, number] {
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
  }, [filteredDegrees]);

  useEffect(() => {
    setFilteredDegrees(degrees);
  }, [degrees]);

  const searchDegrees = (searchValue: string | null) => {
    if (searchValue === null) {
      setFilteredDegrees(degrees);
      return;
    }
    const filterDegree = (degree: DegreeObject) => {
      return (degree.hakukohde + " " + degree.korkeakoulu)
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase());
    };
    const mapFilteredThemes = (theme: ThemeObject) => {
      return { ...theme, hakukohteet: theme.hakukohteet.filter(filterDegree) };
    };
    setFilteredDegrees(degrees.map(mapFilteredThemes));
  };

  return degrees.length > 0 ? (
    <div>
      <h2 className="text-2xl font-bold">Tulokset</h2>
      <div className="flex flex-row justify-between w-full pr-6 my-3 mb-7">
        <Searchbar searchFunction={searchDegrees} />
        <div className="flex flex-row mr-7">
          <NumberBall
            text={'✓'}
            className="bg-primary text-secondary-foreground text-xl font-bold"
          />
          {!resultParams?.onlyPassed && <NumberBall
            text={'𐄂'}
            className="border-2 bg-transparent border-black font-bold text-xl"
          />}
        </div>
      </div>
      {filteredDegrees.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredDegrees.map((theme, index) => {
            return (
              <AccordionItem
                key={`theme_${theme.AiheID}`}
                value={`item-${index}`}
              >
                {theme.hakukohteet.length > 0 ? (
                  <AccordionTrigger className="flex flex-row justify-between px-6 rounded-md group py-3 bg-card hover:bg-background mb-2 ">
                    <span className="group-hover:underline text-start text-xl">
                      {firstUpper(theme.aihe)}
                    </span>
                    <div className="flex ml-auto justify-end">
                      <NumberBall
                        text={passedTotal.get(theme.aihe)}
                        className="ml-auto mr-2 text-secondary-foreground m-auto bg-primary"
                      />
                      {!resultParams?.onlyPassed && <NumberBall
                        text={
                          theme.hakukohteet.length -
                          (passedTotal.get(theme.aihe) ?? 0)
                        }
                        className="mr-3 bg-transparent m-auto "
                      />}
                    </div>
                  </AccordionTrigger>
                ) : (
                  <></>
                )}
                <AccordionContent className="">
                  <VirtualizedDegreeList
                    degreesAndAds={degreesAndAdsOrdered(theme.hakukohteet, accordionAds)}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <p className="mt-6">Hakukohteita ei löytynyt</p>
      )}
    </div>
  ) : (
    <></>
  );
}
