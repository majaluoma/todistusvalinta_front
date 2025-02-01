import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import VolumeInfo from './VolumeInfo';
import PointsInfo from './PointsInfo';
import { useInfoViewContext } from '../../context/infoViewContext/useResultContext';
import ErrorBlock from '@/components/error/ErrorBlock';
import { getDegreeUrl } from './opintopolkuApi/getDegreeUrl';
import { Button } from '@/components/ui/button';
import { FullDegreeInfo } from './types';

export default function DegreeFullInfo() {
  const { degrees, infoViewOpen, setInfoViewOpen, resultParams } =
    useInfoViewContext();

  const handleTitleClick = async (degree: FullDegreeInfo) => {
    const redirectUrl = await getDegreeUrl(
      degree.hakukohteet[0].hakukohde + ' ' + degree.hakukohteet[0].korkeakoulu,
    );
   
    window.open(
      redirectUrl,
      '_blank' // <- This is what makes it open in a new window.
    );
  };

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
                  <SheetTitle className="mb-8 mr-[2rem]">
                    <Button
                      variant="link"
                      onClick={() => handleTitleClick(degree)}
                      className="text-wrap text-start text-xl"
                    >
                      {degree.hakukohteet[0].hakukohde}
                    </Button>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-screen pb-40">
                  <div className="flex flex-col mb-8 left-4 ">
                    <h2>{degree.hakukohteet[0].korkeakoulu}</h2>
                  </div>
                  <ScrollArea
                    type="always"
                    className="h-full sw-auto rounded-md mb-5"
                  >
                    {degree.hakukohteet[0].vuosikerrat.map((vuosikerta) => {
                      return (
                        <div
                          key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}
                          className="mb-3"
                        >
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
                </div>
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
            <div>
              <div className="relative flex flex-col gap-4 bottom-7 left-4 ">
                {resultParams && degrees.length < 1 && (
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
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
