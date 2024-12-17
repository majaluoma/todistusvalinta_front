import { post } from '@/lib/apiClient';
import { ResultParams } from '../types/types';

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
    query: `{laskentaTulosKaikki(ensikertalainen: ${resultParams.firstTimer}, arviointitiedot: {oppiaineet: ${JSON.stringify(subjectsOnly)}, arvosanat:${JSON.stringify(gradesOnly)}, ammatillinen:${vocational}}) {hakukohde korkeakoulu vuosikerrat {pisteRaja laskumalli {summa {pisteet}}}}}
`,
  };
  return await post(query);

  //TODO TYPECHECKING
}
