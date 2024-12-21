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
import { ScrollArea } from '@/components/ui/scroll-area';
import VolumeInfo from './VolumeInfo';
import PointsInfo from './PointsInfo';

export default function DegreeFullInfo() {
  const { degrees, infoViewOpen, setInfoViewOpen } = useInfoViewContext();

  return (
    <Sheet open={infoViewOpen} onOpenChange={setInfoViewOpen}>
      <SheetContent side={'left'}>
        {degrees.map((degree) => {
          return (
            <div key={`allinfo_${degree.hakukohteet[0].HakukohdeID}`}>
              <SheetHeader>
                <SheetTitle className="text-xl mb-8 ml-4 text-wrap mr-7">
                  {degree.hakukohteet[0].hakukohde}
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-screen pb-40 w-auto rounded-md border"> 
                <SheetDescription className="flex flex-col gap-4 ">
                  <h2>{degree.hakukohteet[0].korkeakoulu}</h2>

                  {degree.hakukohteet[0].vuosikerrat.map((vuosikerta
                  ) => {
                    return (
                      <VolumeInfo
                        key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}
                        volume={vuosikerta}
                        kaikkienPisteet={degree.hakukohteet[1]?.vuosikerrat.find(v => {return v.vuosi === vuosikerta.vuosi})?.pisteRaja}
                      ></VolumeInfo>
                    );
                  })}
                  <PointsInfo degree={degree.hakukohteet[0]} />
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
