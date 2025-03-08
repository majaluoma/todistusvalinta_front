import InfoCard from '@/components/customUi/InfoCard';
import { Kynnysehto, Vuosikerta } from './types';
import NumberBall from '@/components/customUi/NumberBall';

export default function VolumeInfo({
  volume: vuosikerta,
  kaikkienPisteet,
}: Readonly<{ volume: Vuosikerta; kaikkienPisteet?: number }>) {
  const kynnysehdotLuettelona = (kynnysehdot: Kynnysehto[]) => {
    return (
      <ul>
        {kynnysehdot.map((kynnysehto) => {
          return (
            <li
              className="list-disc ml-6"
              key={`kynnysehto_${kynnysehto.KynnysehtoID}`}
            >
              {kynnysehto.ehdot.map((ehto, index) => {
                return (
                  <span key={`kynnysehto_${kynnysehto.KynnysehtoID}_${index}`}>
                    {index !== 0 && ' tai '} {ehto.nimi}{' '}
                    {ehto.arvosana?.toUpperCase()}
                  </span>
                );
              })}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <InfoCard header={`${vuosikerta.vuosi.toString()} ${vuosikerta.haku === "Kevään yhteishaku"? "kevät" : "syksy"}`}>
      <div>
        <p className="flex flex-row">
          Pisteesi: {vuosikerta.laskumalli.summa.pisteet} /{' '}
          {vuosikerta.pisteRaja}
          {vuosikerta.kynnysehtoOK &&
            vuosikerta.pisteRaja < vuosikerta.laskumalli.summa.pisteet && (
              <NumberBall
                text="✓"
                className="self-center bg-primary text-primary-foreground w-[16px] h-[16px]"
              />
            )}
        </p>
        {kaikkienPisteet && (
          <p>Pisteraja ei-ensikertalaisille: {kaikkienPisteet}</p>
        )}
        {vuosikerta.kynnysehdot.length > 0 && (
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
