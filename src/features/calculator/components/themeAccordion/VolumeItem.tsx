import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { VolumeItemProps } from './types';

export default function DegreeItem({
  volume,
  degree,
}: Readonly<VolumeItemProps>) {
  const passed =
    volume.laskumalli.summa.pisteet >= volume.pisteRaja && volume.kynnysehtoOK;

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>{degree.hakukohde}</CardTitle>
        <CardDescription>{degree.korkeakoulu}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row pb-4 justify-between align-bottom">
        <div className='flex flex-row gap-3'>
        <p className={`text-xl ${passed && "bg-primary text-primary-foreground"} rounded-lg pr-2 pl-2`}>
          Pisteesi: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
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
