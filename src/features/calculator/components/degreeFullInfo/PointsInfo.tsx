import InfoCard from '@/components/customUi/InfoCard';
import { Hakukohde } from './types';

type PointsInfoProps = {
  degree: Hakukohde;
};

export default function PointsInfo({ degree }: Readonly<PointsInfoProps>) {
  return (
    <InfoCard
      header="Kuinka pisteeni laskettiin?"
      subheader={`Yhteensä ${degree.vuosikerrat[0].laskumalli.summa.pisteet} pistettä`}
    >
      <div className="flex flex-col w-full m-2 ml-2 mr-2">
        {degree.vuosikerrat[0].laskumalli.summa.lasketut ? (
          degree.vuosikerrat[0].laskumalli.summa.lasketut?.map(
            (laskettu, index) => {
              return (
                <div
                  key={`arvosana_${laskettu.nimi}`}
                  className={`w-full flex flex-row justify-between p-3
                              ${index % 2 > 0 && 'bg-background'}`}
                >
                  <p>
                    {laskettu.nimi} {laskettu.arvosana}
                  </p>
                  <p className="ml-auto">{laskettu.pisteet} pistettä</p>
                </div>
              );
            },
          )
        ) : (
          <>Virhe</>
        )}
      </div>
    </InfoCard>
  );
}
