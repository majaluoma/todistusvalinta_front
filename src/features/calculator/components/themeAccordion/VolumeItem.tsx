import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { VolumeItemProps } from './types';

export default function VolumeItem({
  volume,
  degree,
}: Readonly<VolumeItemProps>) {
  const passed =
    volume.laskumalli.summa.pisteet >= volume.pisteRaja && volume.kynnysehtoOK;

  return (
    <Card>
      <CardHeader className='pl-8 pb-2 pt-1'>
        <CardTitle className='flex items-center text-base h-[3.5rem] overflow-hidden'>{degree.hakukohde}</CardTitle>
        <CardDescription className='text-sm'>{degree.korkeakoulu}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between pt-0">
        <div className='flex flex-row '>
          <p className='text-sm ml-2 mr-4 text-muted-foreground'>2024: </p>
        <p className={`text-sm ${passed && "bg-primary text-primary-foreground"} rounded-lg pr-2 pl-2`}>
          Pisteesi 2024: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
        </p>
        {passed && <div className='relative top-1'></div>}
        </div>
        {!volume.kynnysehtoOK && (
            <p className={`ml-4 text-sm`}>Kynnysehto ei täyty</p>
        )}
      </CardContent>
    </Card>
  );
}
