import { ResultParams } from '@/features/calculator/components/gradesForm/types/types';
import { postApi } from '@/lib/apiClient';
import { FullDegreeInfo } from '../../degreeFullInfo/types';

type ResultResponse = { kaikkiTiedotHakukohteesta: FullDegreeInfo };

/** Gets full information about one degree based on user's evaluation
 * information
 */
export async function getDegreeAndModel(
  resultParams: ResultParams,
  hakukohdeId: number,
  laskumalliId: number,
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
      ammatillinen: ${resultParams.vocational}}
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
        haku 
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
  const response = await postApi<ResultResponse>(query);

  return response.data.kaikkiTiedotHakukohteesta;
}
