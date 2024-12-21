import { ResultParams } from '@/features/gradesForm/types/types';
import { post } from '@/lib/apiClient';
import { FullDegreeInfo } from '../../degreeFullInfo/types';


type ResultResponse = {
  data: {kaikkiTiedotHakukohteesta: FullDegreeInfo};
}

export async function getDegreeAndModel(
  resultParams: ResultParams,
  hakukohdeId: number,
  laskumalliId : number,
  vocational = false
) {
  const gradesOnly = resultParams.grades.map((param) => {
    return param.grade;
  });
  const subjectsOnly = resultParams.grades.map((param) => {
    return param.subject;
  });
  const query = {
    query: `
query {
  kaikkiTiedotHakukohteesta(
    laskumalliId: ${laskumalliId}, 
    hakukohdeId: ${hakukohdeId}, 
    arviointitiedot: {
      oppiaineet: ${JSON.stringify(subjectsOnly)}, 
      arvosanat: ${JSON.stringify(gradesOnly)}, 
      ammatillinen: ${vocational}}
  ) 
      {
    hakukohteet {
      hakukohde
      HakukohdeID
      AiheID
      korkeakoulu
      vuosikerrat {
        pisteRaja
        VuosikertaID
        vuosi
        LaskumalliID
        kynnysehtoOK
        kynnysehdot {
          KynnysehtoID
          ehdot {
            arvosana
            nimi
          }
        }
        laskumalli {
          summa {
            pisteet
            lasketut {
              nimi
              pisteet
            }
          }
        }
      }
    }
    laskumalli {
      LaskumalliID
      laskumalliNimi
      maxAine
      maxPiste
      joukot {
        JoukkoID
        maxValinnat
        oppiaineet {
          pisteet
          nimi
          arvosana
        }
        alaJoukot {
          JoukkoID
          maxValinnat
          oppiaineet {
            pisteet
            nimi
            arvosana
          }
        }
      }
    }
  }
}
`,
  };
  const response = await post<ResultResponse>(query);

  return response.data.kaikkiTiedotHakukohteesta;

  //TODO TYPECHECKING
}