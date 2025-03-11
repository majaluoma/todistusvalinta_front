import { DegreeObject, ThemeObject } from '@/types/apiTypes';

export function passedAmountPerTheme(degrees: ThemeObject[]) {
  return degrees.map(function filterPassed(theme): [string, number] {
    const passedDegrees = theme.hakukohteet.filter((e) => {
      return (
        e.vuosikerrat[0].laskumalli.summa.pisteet >=
          e.vuosikerrat[0].pisteRaja && e.vuosikerrat[0].kynnysehtoOK
      );
    });
    return [theme.aihe, passedDegrees.length];
  });
}

export function filterPassed(degrees: ThemeObject[]) {
  const filterThemeDegrees = (theme: ThemeObject) => {
    return theme.hakukohteet.filter(function onlyPassed(degree) {
      return (
        degree.vuosikerrat[0].laskumalli.summa.pisteet >=
          degree.vuosikerrat[0].pisteRaja && degree.vuosikerrat[0].kynnysehtoOK
      );
    });
  };
  return degrees.map(function onlyPassedInThemes(theme) {
    return { ...theme, hakukohteet: filterThemeDegrees(theme) };
  });
}

export default function filterDegreeByNameAndSchool (degree: DegreeObject, searchWords: string[]) {
    for (let i = 0; i < searchWords.length; i++) {
      const searchWord = searchWords[i];
      if (
        !(degree.hakukohde + ' ' + degree.korkeakoulu)
          .toLocaleLowerCase()
          .includes(searchWord.toLocaleLowerCase())
      ) {
        return false;
      }
    }
    return true;
  };