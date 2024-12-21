import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../../components/ui/sheet';
import CalculationModelTable from './CalculationModelTable';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfoViewContext } from '@/components/context/infoViewContext/useResultContext';
import InfoCard from './InfoCard';
import { Kynnysehto } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DegreeFullInfo() {
  const { degrees, infoViewOpen, setInfoViewOpen } = useInfoViewContext();

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
    <Sheet open={infoViewOpen} onOpenChange={setInfoViewOpen}>
      <SheetContent side={'left'}>
        {degrees.map((degree) => {
          return (
            <div key={`allinfo_${degree.hakukohde.HakukohdeID}`}>
              <SheetHeader>
                <SheetTitle className="text-xl mb-8 ml-4 text-wrap mr-7">
                  {degree.hakukohde.hakukohde}
                </SheetTitle>
              </SheetHeader>
            <ScrollArea>
              <SheetDescription className="flex flex-col gap-4 ">
                <h2>{degree.hakukohde.korkeakoulu}</h2>

                {degree.hakukohde.vuosikerrat.map((vuosikerta) => {
                  return (
                    <InfoCard
                      key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}
                      header={vuosikerta.vuosi.toString()}
                      >
                      <div>
                        <p>
                          Pisteesi: {vuosikerta.laskumalli.summa.pisteet} /{' '}
                          {vuosikerta.pisteRaja}
                        </p>
                        {vuosikerta.kynnysehdot && (
                          <p> Kynnysehdot:
                            {kynnysehdotLuettelona(vuosikerta.kynnysehdot)}</p>
                        )}
                      </div>
                    </InfoCard>
                  );
                })}

                <InfoCard
                  header="Kuinka pisteeni laskettiin?"
                  subheader={`Yhteensä ${degree.hakukohde.vuosikerrat[0].laskumalli.summa.pisteet} pistettä`}
                  >
                  <div className="flex flex-col w-full m-2 ml-2 mr-2">
                    {degree.hakukohde.vuosikerrat[0].laskumalli.summa
                      .lasketut ? (
                        degree.hakukohde.vuosikerrat[0].laskumalli.summa.lasketut?.map(
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
                              <p className="ml-auto">
                                {laskettu.pisteet} pistettä
                              </p>
                            </div>
                          );
                        },
                      )
                    ) : (
                      <>Virhe</>
                    )}
                  </div>
                </InfoCard>
              </SheetDescription>

              {degree.laskumalli ? (
                <SheetDescription>
                  <CalculationModelTable
                    calculationModel={degree.laskumalli}
                  ></CalculationModelTable>
                </SheetDescription>
              ) : (
                <div>
                  <Skeleton className="h-[50px] w-6em m-6" />
                  <Skeleton className="h-[50px] w-6em m-6" />
                  <Skeleton className="h-[50px] w-6em m-6" />
                  <Skeleton className="h-[50px] w-6em m-6" />
                </div>
              )}
              </ScrollArea>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}
