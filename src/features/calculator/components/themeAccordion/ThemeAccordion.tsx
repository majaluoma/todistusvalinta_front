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
import checkIcon from '@/assets/checkIcon.svg';
import filterDegreeByNameAndSchool, {
  filterPassed,
  filterUniversities,
  filterVocationalUnviersities,
  passedAmountPerTheme,
} from './lib/utils';
import { getResult } from '../gradesForm/api/getResult';
import { Filters } from './types';
import AccordionFilters from './components/AccordionFilters';
import FilterDisplayer from './components/FilterDisplayer';
import { ResultParams } from '../gradesForm/types/types';

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

const defaultFilters: Filters = {
  universities: true,
  vocationalUnviersities: true,
  onlyPassed: false,
  isSpring: true,
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
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [searchValue, setSearchValue] = useState(null as string | null);

  useEffect(() => {
    setPassedTotal(
      new Map<string, number>(passedAmountPerTheme(filteredDegrees)),
    );
  }, [filteredDegrees]);

  useEffect(() => {
    let result = degrees;

    if (filters.onlyPassed) {
      result = filterPassed(result);
    }
    if (!filters.universities) {
      result = filterUniversities(result);
    }
    if (!filters.vocationalUnviersities) {
      result = filterVocationalUnviersities(result);
    }

    if (searchValue !== null && searchValue !== '') {
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
      result = result.map(mapFilteredThemes);
    }

    setFilteredDegrees(result);
  }, [
    degrees,
    filters.onlyPassed,
    filters.universities,
    filters.vocationalUnviersities,
    searchValue,
  ]);

  const searchDegrees = (value: string | null) => {
    setSearchValue(value ?? '');
  };

  useEffect(() => {
    const fetchAutumnResult = async (resultParams: ResultParams) => {
      const result = await getResult({
        ...resultParams,
        isSpring: filters.isSpring,
      });

      setDegreesAndThemes(result, {
        ...resultParams,
        isSpring: filters.isSpring,
      });
    };
    if (resultParams) {
      fetchAutumnResult(resultParams);
    }
  }, [filters.isSpring]);

  return resultParams ? (
    <div className="w-full">
      <div className="flex flex-row gap-2 items-between">
        <h2 className="text-2xl font-bold flex flex-row">
          {degrees[0].hakukohteet[0].vuosikerrat[0].vuosi} yhteishaun tulokset{' '}
        </h2>
      </div>
      <div className="flex flex-row justify-between w-full pr-6 my-3 mb-2">
        <Searchbar searchFunction={searchDegrees} />
        <AccordionFilters
          filters={filters}
          callback={setFilters}
          defaultFilters={defaultFilters}
        />
      </div>
      <div className="flex justify-between w-full">
        <FilterDisplayer
          filters={filters}
          defaultFilters={defaultFilters}
          callback={setFilters}
        />
      </div>
        <div className="w-full justify-end flex flex-row mt-7">
          <div className="flex flex-row mr-5 ">
            <NumberBall
              text={'✓'}
              image={checkIcon}
              className="bg-primary text-secondary-foreground text-xl font-bold"
              />
            hyväksytty
          </div>
              </div>
      {filteredDegrees
        .map((theme) => theme.hakukohteet.length)
        .some((length) => length > 0) ? (
        <Accordion type="single" collapsible className="w-full">
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
                      
                        <NumberBall
                          text={theme.hakukohteet.length}
                          className={`mr-3 bg-transparent m-auto ${filters.onlyPassed === true && "invisible"}`}
                        />
                      
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
        <p className="mt-6 text-muted-foreground">
          Hakukohteita ei löytynyt, muuta hakuehtojasi
        </p>
      )}
    </div>
  ) : (
    <></>
  );
}
