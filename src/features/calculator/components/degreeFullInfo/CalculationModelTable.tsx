import InfoCard from '@/components/customUi/InfoCard';
import { Joukko, LaskumalliRakenne } from './types';
import { firstUpper } from '@/lib/utils';

type CalculationModelProps = {
  calculationModel: LaskumalliRakenne;
};

const printGroup = (group : Joukko) => {
    return <>{group.JoukkoID}</>
};

export default function CalculationModelTable({
  calculationModel,
}: Readonly<CalculationModelProps>) {
  return (
    <InfoCard header={firstUpper(calculationModel.laskumalliNimi)} subheader={`Enintään ${calculationModel.maxAine} ainetta ja ${calculationModel.maxPiste} pistettä`}>
      

      
      <div className="flex flex-col w-full m-2 ml-2 mr-2">
        {calculationModel.joukot.map(group => {
            return printGroup (group);
        })}
      </div>
    </InfoCard>
  );
}
