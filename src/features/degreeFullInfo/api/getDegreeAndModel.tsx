import { ResultParams } from '@/features/gradesForm/types/types';
import { post } from '@/lib/apiClient';
import { FullDegreeInfo } from '../types';


type ResultResponse = {
  data: {laskentatulosKaikki: FullDegreeInfo};
}

export async function getDegreeAndModel(
  resultParams: ResultParams,
  hakukohdeId: number,
  vocational = false
) {
  const gradesOnly = resultParams.grades.map((param) => {
    return param.grade;
  });
  const subjectsOnly = resultParams.grades.map((param) => {
    return param.subject;
  });
  const query = {
    query: `{kaikkiTiedotHakukohteesta(hakukohdeId: ${hakukohdeId}, arviointitiedot: {oppiaineet: ${JSON.stringify(subjectsOnly)}, arvosanat:${JSON.stringify(gradesOnly)}, ammatillinen:${vocational}}) { hakukohde HakukohdeID AiheID korkeakoulu vuosikerrat { pisteRaja VuosikertaID vuosi LaskumalliID kynnysehtoOK kynnysehdot {KynnysehtoID ehdot {arvosana nimi}} laskumalli {summa {pisteet lasketut {nimi pisteet arvosana}}}}}}
`,
  };
  const response = await post<ResultResponse>(query);

  return response.data.laskentatulosKaikki;

  //TODO TYPECHECKING
}