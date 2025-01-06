import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import VolumeInfo from './VolumeInfo';
import PointsInfo from './PointsInfo';
import { useInfoViewContext } from '../../context/infoViewContext/useResultContext';
import ErrorBlock from '@/components/error/ErrorBlock';

export default function DegreeFullInfo() {
  const { degrees, infoViewOpen, setInfoViewOpen, resultParams } =
    useInfoViewContext();
  return (
    <Sheet open={infoViewOpen} onOpenChange={setInfoViewOpen}>
      <SheetContent side={'left'}>
        {degrees.length > 0 ? (
          degrees.map((degree) => {
            return (
              <div
                key={`allinfo_${degree.hakukohteet[0].HakukohdeID}`}
                className="h-full pb-28"
              >
                <SheetHeader>
                  <SheetTitle className="text-xl mb-8 mr-[2rem] text-wrap text-start">
                    {degree.hakukohteet[0].hakukohde}
                  </SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex flex-col h-screen pb-40">
                  <div className="flex flex-col mb-8 left-4 ">
                    <h2>{degree.hakukohteet[0].korkeakoulu}</h2>
                  </div>
                  <ScrollArea type="always"  className="h-full sw-auto rounded-md mb-5">
                    {degree.hakukohteet[0].vuosikerrat.map((vuosikerta) => {
                      return (
                        <div 
                        key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}
                        className='mb-3'>
                          <VolumeInfo
                            
                            volume={vuosikerta}
                            kaikkienPisteet={
                              degree.hakukohteet[1]?.vuosikerrat.find((v) => {
                                return v.vuosi === vuosikerta.vuosi;
                              })?.pisteRaja
                            }
                          ></VolumeInfo>
                        </div>
                      );
                    })}
                    <PointsInfo degree={degree.hakukohteet[0]} />
                    {/* <CalculationModelTable calculationModel={degree.laskumalli}></CalculationModelTable> */}
                  </ScrollArea>
                </SheetDescription>
              </div>
            );
          })
        ) : (
          <div className="h-full pb-20">
            <SheetHeader>
              <SheetTitle className="text-xl mb-8 ml-4 text-wrap">
                Ladataan tietoja
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <div className="relative flex flex-col gap-4 bottom-7 left-4 ">
                {!resultParams && (
                  <ErrorBlock
                    error="Tapahtui virhe, kokeile myöhemmin uudestaan"
                    className="w-6em m-6"
                  />
                )}
                <Skeleton className="h-[50px] w-6em m-6" />
                <Skeleton className="h-[50px] w-6em m-6" />
                <Skeleton className="h-[50px] w-6em m-6" />
                <Skeleton className="h-[50px] w-6em m-6" />
              </div>
            </SheetDescription>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
