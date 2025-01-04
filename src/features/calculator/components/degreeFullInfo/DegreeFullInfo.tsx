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

export default function DegreeFullInfo() {
  const {degrees, infoViewOpen, setInfoViewOpen } = useInfoViewContext();
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
                  <SheetTitle className="text-xl mb-8 ml-4 text-wrap">
                    {degree.hakukohteet[0].hakukohde}
                  </SheetTitle>
                </SheetHeader>
                <SheetDescription className="relative flex flex-col gap-4 bottom-7 left-4 ">
                  <h2>{degree.hakukohteet[0].korkeakoulu}</h2>
                </SheetDescription>
                <ScrollArea className="h-full sw-auto rounded-md border">
                  <SheetDescription className="flex flex-col gap-4 ">
                    {degree.hakukohteet[0].vuosikerrat.map((vuosikerta) => {
                      return (
                        <VolumeInfo
                          key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}
                          volume={vuosikerta}
                          kaikkienPisteet={
                            degree.hakukohteet[1]?.vuosikerrat.find((v) => {
                              return v.vuosi === vuosikerta.vuosi;
                            })?.pisteRaja
                          }
                        ></VolumeInfo>
                      );
                    })}
                    <PointsInfo degree={degree.hakukohteet[0]} />
                  </SheetDescription>
                  <SheetDescription>
                   {/**Calculation model not implemented*/}
                  </SheetDescription>
                </ScrollArea>
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
            <SheetDescription className="relative flex flex-col gap-4 bottom-7 left-4 ">
              <Skeleton className="h-[50px] w-6em m-6" />
              <Skeleton className="h-[50px] w-6em m-6" />
              <Skeleton className="h-[50px] w-6em m-6" />
              <Skeleton className="h-[50px] w-6em m-6" />
            </SheetDescription>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
