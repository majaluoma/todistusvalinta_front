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
    volume.laskumalli.summa.pisteet > volume.pisteRaja && volume.kynnysehtoOK;

  return (
    <Card className={`${passed ? 'bg-accent' : ''}`}>
      <CardHeader className="p-4">
        <CardTitle>{degree.hakukohde}</CardTitle>
        <CardDescription>{degree.korkeakoulu}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row pb-4 justify-between">
        <p className='text-xl'>
          Pisteesi: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
        </p>
        {!volume.kynnysehtoOK && (
            <p className={`ml-4 text-sm`}>Kynnysehto ei täyty</p>
        )}
      </CardContent>
    </Card>
  );
}
