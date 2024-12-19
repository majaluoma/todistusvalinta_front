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
  degree: hakukohde,
}: Readonly<VolumeItemProps>) {

  const passed = volume.laskumalli.summa.pisteet > volume.pisteRaja;

  return (
    <Card className={`${passed? "bg-accent" : ""}`} >
      <CardHeader className="p-4">
        <CardTitle>{hakukohde.hakukohde}</CardTitle>
        <CardDescription>{hakukohde.korkeakoulu}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row pb-4 text-xl">
        <p className={``}>
          Pisteesi: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
        </p>
      </CardContent>
    </Card>
  );
}
