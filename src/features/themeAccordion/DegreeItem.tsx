import { DegreeItemProps } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolumeItem from './VolumeItem';
import DegreeFullInfo from '../degreeFullInfo/DegreeFullInfo';

export default function DegreeItem({ degree }: Readonly<DegreeItemProps>) {
  return (
    <div className='relative'>
    <DegreeFullInfo degree={degree}></DegreeFullInfo>
    <Tabs defaultValue={degree.vuosikerrat[0].vuosi.toString()} className="w-auto p-0">
      <TabsList className="flex flex-row relative items-start align-bottom justify-start ">
        {degree.vuosikerrat.map((volume) => {
          const passed = volume.laskumalli.summa.pisteet > volume.pisteRaja;
          return (
            <TabsTrigger
              key={`volumeTab_${degree.HakukohdeID}_${volume.vuosi}`}
              value={`${volume.vuosi}`}
              className={`text-sm w-24 rounded-b-none ${passed? "bg-accent data-[state=active]:bg-accent": "bg-card data-[state=active]:bg-card"}`}
            >
              {volume.vuosi}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {degree.vuosikerrat.map((volume) => {
        return (
          <TabsContent
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
