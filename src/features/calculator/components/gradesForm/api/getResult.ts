import { postApi } from '@/lib/apiClient';
import { ResultParams } from '../types/types';
import { DegreeObject } from '@/types/apiTypes';

type ResultResponse = { laskentatulosKaikki: DegreeObject[] };

/** Gets list of degrees from server based on user's evaluation
 * information (subjects and grades)
 *
 */
export async function getResult(resultParams: ResultParams, year?: number) {
  const gradesOnly = resultParams.grades.map((param) => {
    return param.grade;
  });
  const subjectsOnly = resultParams.grades.map((param) => {
    return param.subject;
  });

  //If year is present, will fetch only volumes from specific year.
  const yearIfExists = () => {
    if (year !== undefined) {
      return `vuosi: ${year} ,`;
    }
    return ' ';
  };
  const query = {
    query: `{
    laskentatulosKaikki(
    ensikertalainen: ${resultParams.firstTimer}, 
    ${yearIfExists()}
    arviointitiedot: {
      oppiaineet: ${JSON.stringify(subjectsOnly)}, 
      arvosanat:${JSON.stringify(gradesOnly)}, 
      ammatillinen:${resultParams.vocational}}) {
        hakukohde 
        HakukohdeID 
        AiheID 
        korkeakoulu 
        vuosikerrat {
          pisteRaja 
          VuosikertaID 
          kynnysehtoOK 
          vuosi 
          LaskumalliID 
          laskumalli {
            summa {
              pisteet
            }
          }
        }
      }
    }
`,
  };
  const response = await postApi<ResultResponse>(query);

  return response.data.laskentatulosKaikki;

  //TODO TYPECHECKING
}
