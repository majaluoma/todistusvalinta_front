import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { VolumeItemProps } from './types';

/** VolumeItem potrays one volume from a degree like year first-goer's
 * information from year 2025.
 *
 */
export default function VolumeItem({
  volume,
  degree,
}: Readonly<VolumeItemProps>) {
  const passed =
    volume.laskumalli.summa.pisteet >= volume.pisteRaja && volume.kynnysehtoOK;

  return (
    <Card className="h-[140px] mx-2">
      <CardHeader className="flex flex-col justify-center pl-6 pb-1 pt-1 h-[6.3rem]">
        <CardTitle className="flex text-base max-h-[3.5rem] overflow-hidden mr-3">
          {degree.hakukohde}
        </CardTitle>
        <CardDescription className="text-sm">
          {degree.korkeakoulu}
        </CardDescription>
      </CardHeader>
      <div className="flex flex-col justify-end pt-0">
        <CardContent className="flex flex-row justify-between">
          <div className="flex flex-row ">
            <p className="text-sm mr-0.5 text-muted-foreground">
              {volume.vuosi}:{' '}
            </p>
            <p
              className={`text-sm ${
                passed && 'bg-primary text-primary-foreground'
              } text-nowrap rounded-lg pr-2 pl-2`}
            >
              Pisteesi: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
            </p>
            {passed && <div className="relative top-1"></div>}
          </div>
          {!volume.kynnysehtoOK && (
            <p
              className={`flex items-end relative h-[2.5rem] bottom-4 text-sm text-wrap text-end`}
            >
              Kynnysehto ei täyty
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
