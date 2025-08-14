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
import VirtualizedDegreeList from './components/VirtualizedDegreeList';
import Searchbar from './components/SearchBar';
import useAds from '@/hooks/useAds';
import { Ad, CustomAd } from '@/components/customUi/adsBanner/types';
import crossIcon from '@/assets/crossIcon.svg';
import checkIcon from '@/assets/checkIcon.svg';
import CheckboxWithHover from '@/components/customUi/CheckboxWithHover';
import filterDegreeByNameAndSchool, {
  filterPassed,
  passedAmountPerTheme,
} from './lib/utils';
import { Button } from '@/components/ui/button';
import { getResult } from '../gradesForm/api/getResult';

const degreesAndAdsOrdered = (
  degrees: DegreeObject[],
  ads: (Ad | CustomAd)[],
) => {
  const degreesAndAds: (DegreeObject | CustomAd | Ad)[] = [];
  degrees.forEach((degree) => {
    degreesAndAds.push(degree);
    const ad = ads.find((ad) => {
      return parseInt(ad.id.split('_')[1]) === degree.HakukohdeID;
    });
    if (ad) {
      degreesAndAds.push(ad);
    }
  });
  return degreesAndAds;
};

/** With provided degree list ThemeAccordion will show them all
 * sorted by themes. It will also show additional information to
 * user about all degrees in a specific theme.
 *
 */
export default function ThemeAccordion() {
  const { degrees, resultParams, setDegreesAndThemes } = useResultContext();
  const [filteredDegrees, setFilteredDegrees] = useState<ThemeObject[]>([]);
  const [passedTotal, setPassedTotal] = useState(new Map<string, number>());
  const { accordionAds } = useAds();
  const [onlyPassed, setOnlyPassed] = useState(false);
  const [isSpring, setIsSpring] = useState(true);

  useEffect(() => {
    setPassedTotal(
      new Map<string, number>(passedAmountPerTheme(filteredDegrees)),
    );
  }, [filteredDegrees]);


  useEffect(() => {
    if (onlyPassed) {
      setFilteredDegrees(filterPassed(degrees));
    } else {
      setFilteredDegrees(degrees);
    }
  }, [degrees, onlyPassed]);

  const searchDegrees = (searchValue: string | null) => {
    if (searchValue === null) {
      setFilteredDegrees(degrees);
      return;
    }
    const searchWords = searchValue.split(' ');
    const filterByKeyword = (degree: DegreeObject) => {
      return filterDegreeByNameAndSchool(degree, searchWords);
    };
    const mapFilteredThemes = (theme: ThemeObject) => {
      return {
        ...theme,
        hakukohteet: theme.hakukohteet.filter(filterByKeyword),
      };
    };
    setFilteredDegrees(degrees.map(mapFilteredThemes));
  };

  const handleSeasonClick = async () => {
    const oppositeSeason = !isSpring;
    setIsSpring(oppositeSeason)
    if (resultParams) {
      const result =  await getResult({...resultParams, isSpring: oppositeSeason})
      setDegreesAndThemes(result , {...resultParams, isSpring: oppositeSeason})
    } 
  }

  return resultParams ? (
    <div className="w-full">
      <div className='flex flex-row gap-2'>
        <h2 className="text-2xl font-bold flex flex-row">
          {isSpring ? 'Kevään ' : 'Syksyn '} yhteishaun tulokset{' '}
        </h2>
        <Button variant={"ghost"} className="text-sm font-light text-gray-600"
        onClick={handleSeasonClick}>
          {' '}
          näytä {!isSpring ? 'kevään ' : 'syksyn '} tulokset{' '}
        </Button>
      </div>
      <div className="flex flex-row justify-between w-full pr-6 my-3" mb-7>
        <Searchbar searchFunction={searchDegrees} />
        <div className="flex flex-row mr-7">
          <NumberBall
            text={'✓'}
            image={checkIcon}
            className="bg-primary text-secondary-foreground text-xl font-bold"
          />
          {!onlyPassed && (
            <NumberBall
              text="x"
              image={crossIcon}
              className="border-2 bg-transparent border-black font-bold text-xl"
            />
          )}
        </div>
      </div>
      <CheckboxWithHover
        label="Näytä vain paikat, joihin pääsisin"
        value={onlyPassed}
        onChange={setOnlyPassed}
        tooltip="Näytä vain paikat joihin viime vuonna olisit päässyt"
      />
      {filteredDegrees.length > 0 ? (
        <Accordion type="single" collapsible className="w-full mt-7">
          {filteredDegrees.map((theme, index) => {
            return (
              <AccordionItem
                key={`theme_${theme.AiheID}`}
                value={`item-${index}`}
              >
                {theme.hakukohteet.length > 0 ? (
                  <AccordionTrigger className="flex flex-row justify-between px-6 rounded-md group py-3 bg-card hover:bg-background mt-2 w-full">
                    <span className="group-hover:underline text-start text-xl">
                      {firstUpper(theme.aihe)}
                    </span>
                    <div className="flex ml-auto justify-end">
                      <NumberBall
                        text={passedTotal.get(theme.aihe)}
                        className="ml-auto mr-2 text-secondary-foreground m-auto bg-primary"
                      />
                      {!onlyPassed && (
                        <NumberBall
                          text={
                            theme.hakukohteet.length -
                            (passedTotal.get(theme.aihe) ?? 0)
                          }
                          className="mr-3 bg-transparent m-auto "
                        />
                      )}
                    </div>
                  </AccordionTrigger>
                ) : (
                  <></>
                )}
                <AccordionContent>
                  <VirtualizedDegreeList
                    degreesAndAds={degreesAndAdsOrdered(
                      theme.hakukohteet,
                      accordionAds,
                    )}
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
