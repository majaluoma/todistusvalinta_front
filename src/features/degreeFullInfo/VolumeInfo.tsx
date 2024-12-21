import InfoCard from "@/components/customUi/InfoCard";
import { Kynnysehto, Vuosikerta } from "./types";

export default function VolumeInfo({volume: vuosikerta, kaikkienPisteet} : Readonly<{volume : Vuosikerta, kaikkienPisteet? : number}>) {

    const kynnysehdotLuettelona = (kynnysehdot: Kynnysehto[]) => {
        return (
          <ul>
            {kynnysehdot.map((kynnysehto) => {
              return (
                <li className="list-disc ml-6" key={`kynnysehto_${kynnysehto.KynnysehtoID}`}>
                  {kynnysehto.ehdot.map((ehto, index) => {
                    return (
                      <>
                        {index !== 0 && " tai "} {ehto.nimi} {ehto.arvosana?.toUpperCase()} 
                      </>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        );
      };
      
  return (
    <InfoCard
      header={vuosikerta.vuosi.toString()}
    >
      <div>
        <p>
          Pisteesi: {vuosikerta.laskumalli.summa.pisteet} /{' '}
          {vuosikerta.pisteRaja}
        </p>
        {kaikkienPisteet && <p>
          Pisteraja ei-ensikertalaisille: {kaikkienPisteet}
        </p>}
        {vuosikerta.kynnysehdot && (
          <p>
            {' '}
            Kynnysehdot:
            {kynnysehdotLuettelona(vuosikerta.kynnysehdot)}
          </p>
        )}
      </div>
    </InfoCard>
  );
}
