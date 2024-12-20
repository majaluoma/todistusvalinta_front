import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import CalculationModelTable from './CalculationModelTable';
import { ReactNode, useState } from 'react';
import { getDegreeAndModel } from './api/getDegreeAndModel';
import { ResultParams } from '../gradesForm/types/types';
import { Hakukohde, LaskumalliRakenne } from './types';
import { Skeleton } from '@/components/ui/skeleton';
import { useResultContext } from '@/components/context/resultContext/useResultContext';

type DegreeFullInfoProps = {
    hakukohdeId: number;
  className? : string;
  children?: ReactNode;
};

export default function DegreeFullInfo({
  hakukohdeId,
  className,
  children,
}: Readonly<DegreeFullInfoProps>) {
    const [degree, setDegree] = useState<Hakukohde| null>(null);
    const [calculationModel, setCalculationModel] = useState<LaskumalliRakenne | null>(null);
    const {resultParams} = useResultContext();

    const handleClick = () => {
      console.log(degree)
      const fetchDegreeInfo = async (resultParams : ResultParams, hakukohdeId : number) => {
          const degreeInfo =  await getDegreeAndModel(resultParams, hakukohdeId);
          setDegree(degreeInfo.degree);
          setCalculationModel(degreeInfo.calculationModel);
      } 
      if (resultParams) fetchDegreeInfo(resultParams, hakukohdeId);
    }
    
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        {
            children || <Button onClick={handleClick} className={`font-bold text-2xl rounded-full bg-secondary z-10 w-[35px] h-[35px] hover:bg-accent cursor-pointer ${className}`}>
            ?
          </Button>
        }
      </SheetTrigger>
      <SheetContent side={'left'} className="pl-0 pr-0">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="text-xl mb-8 ml-4 text-wrap mr-7">
            {degree?.hakukohde}
          </SheetTitle>
        </SheetHeader>
        {degree? <SheetDescription>
         <h3>{degree.korkeakoulu}</h3>
         <p>{"degree.nimivipusessa"}</p>
           {degree.vuosikerrat.map((vuosikerta) => {
            return (
              <div key={`moreInfo_volume_${vuosikerta.VuosikertaID}`}>
                <p>{vuosikerta.vuosi}</p>
                <p>Pisteesi: {vuosikerta.laskumalli.summa.pisteet} / {vuosikerta.pisteRaja}</p>
              </div>
            );
          })}
        </SheetDescription>: <Skeleton className="h-[100px] w-6em m-6"/>}
          {calculationModel? <SheetDescription><CalculationModelTable calculationModel={calculationModel}></CalculationModelTable>
          </SheetDescription>: 
          <div>
            <Skeleton className="h-[50px] w-6em m-6"/> 
            <Skeleton className="h-[50px] w-6em m-6"/> 
            <Skeleton className="h-[50px] w-6em m-6"/> 
            <Skeleton className="h-[50px] w-6em m-6"/> 
          </div>
            }
      </SheetContent>
    </Sheet>
  );
}
