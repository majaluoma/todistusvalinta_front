import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import { DegreeObject } from '@/types/apiTypes';
import CalculationModelTable from './CalculationModelTable';

type DegreeFullInfoProps = {
  degree: DegreeObject;
};

export default function DegreeFullInfo({
  degree,
}: Readonly<DegreeFullInfoProps>) {
  return (
    <Sheet>
      <SheetTrigger className="fixed top-7 right-7 bg-none" asChild>
        {
          <Button className="absolute right-2 top-2 rounded-full z-10 w-[40px] h-[40px] hover:bg-accent cursor-pointer">
            Icon
          </Button>
        }
      </SheetTrigger>
      <SheetContent side={'left'} className="pl-0 pr-0">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="text-xl mb-8 ml-4 text-wrap mr-7">
            {degree.hakukohde}
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <h3>{degree.korkeakoulu}</h3>
          <p>{degree.nimiVipusessa}</p>
          {degree.vuosikerrat.map((vuosikerta) => {
            return (
              <div key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}>
                <p>{vuosikerta.vuosi}</p>
                <p>Pisteesi: {vuosikerta.laskumalli.summa.pisteet} / {vuosikerta.pisteRaja}</p>
              </div>
            );
          })}
          <CalculationModelTable calculationModel={degree.vuosikerrat[0].laskumalli}></CalculationModelTable>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
