import { post } from '@/lib/apiClient';
import { ResultParams } from '../types/types';
import { DegreeObject } from '@/types/apiTypes';

type ResultResponse = {
  data: {laskentatulosKaikki: DegreeObject []};
}

export async function getResult(
  resultParams: ResultParams,
  vocational: boolean = false,
) {
  const gradesOnly = resultParams.grades.map((param) => {
    return param.grade;
  });
  const subjectsOnly = resultParams.grades.map((param) => {
    return param.subject;
  });
  const query = {
    query: `{laskentatulosKaikki(ensikertalainen: ${resultParams.firstTimer}, arviointitiedot: {oppiaineet: ${JSON.stringify(subjectsOnly)}, arvosanat:${JSON.stringify(gradesOnly)}, ammatillinen:${vocational}}) {hakukohde HakukohdeID AiheID korkeakoulu vuosikerrat {pisteRaja VuosikertaID kynnysehtoOK vuosi LaskumalliID laskumalli {summa {pisteet}}}}}
`,
  };
  const response = await post<ResultResponse>(query);

  return response.data.laskentatulosKaikki;

  //TODO TYPECHECKING
}
