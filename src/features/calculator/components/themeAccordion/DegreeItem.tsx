import { DegreeItemProps } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolumeItem from './VolumeItem';
import { useResultContext } from '@/features/calculator/context/resultContext/useResultContext';
import { useInfoViewContext } from '@/features/calculator/context/infoViewContext/useResultContext';
import { ResultParams } from '../gradesForm/types/types';
import { getDegreeAndModel } from '../gradesForm/api/getDegreeAndModel';
import { Button } from '@/components/ui/button';
import NumberBall from '@/components/customUi/NumberBall';

/** Shows information on a degree
 * If there is only one Volume, information is shows on one page. Otherwise
 * it is shown as a tabs with each volume present
 *
 */
export default function DegreeItem({ degree }: Readonly<DegreeItemProps>) {
  const { resultParams, year } = useResultContext();
  const { setDegreesAndOpen, setResultParams } = useInfoViewContext();

  //Opens a side window with more information on a degree
  const handleClick = () => {
    const fetchDegreeInfo = async (
      resultParams: ResultParams,
      hakukohdeId: number,
      laskumalliID: number,
    ) => {
      try {
        setDegreesAndOpen([]);
        const degreeInfo = await getDegreeAndModel(
          resultParams,
          hakukohdeId,
          laskumalliID,
        );
        setResultParams(resultParams);
        setDegreesAndOpen([degreeInfo]);
      } catch (error: unknown) {
        setResultParams(null);
        console.log(error);
      }
    };
    if (resultParams) {
      fetchDegreeInfo(
        resultParams,
        degree.HakukohdeID,
        degree.vuosikerrat[0].LaskumalliID,
      );
    } else {
      setDegreesAndOpen([]);
      setResultParams(null);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        className={`font-bold text-2xl rounded-full bg-secondary z-10 w-[35px] h-[35px] hover:bg-accent cursor-pointer absolute right-3 top-1 shadow-lg
          ${!degree.vuosikerrat[0].kynnysehtoOK && 'bg-destructive'}`}
      >
        ?
      </Button>
      <Tabs defaultValue={(year || 2024).toString()} className="w-auto p-0">
        {degree.vuosikerrat.length > 1 && (
          <TabsList className="flex flex-row relative items-start align-bottom justify-start ">
            {degree.vuosikerrat.map((volume) => {
              const passed =
                volume.laskumalli.summa.pisteet >= volume.pisteRaja &&
                volume.kynnysehtoOK;
              return (
                <TabsTrigger
                  key={`volumeTab_${degree.HakukohdeID}_${volume.vuosi}`}
                  value={`${volume.vuosi}`}
                  className={`text-sm w-24 rounded-b-none bg-card data-[state=active]:bg-card`}
                >
                  {volume.vuosi}
                  {passed ? (
                    <NumberBall
                      text="✓"
                      className="bg-primary text-primary-foreground w-[16px] h-[16px]"
                    />
                  ) : (
                    <NumberBall text="𐄂" className="w-[16px] h-[16px]" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        )}
        {degree.vuosikerrat.map((volume) => {
          return (
            <TabsContent
              onClick={handleClick}
              value={`${volume.vuosi}`}
              key={`volume_${degree.HakukohdeID}_${volume.vuosi}`}
            >
              <VolumeItem volume={volume} degree={degree}></VolumeItem>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
