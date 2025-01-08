import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { BannerAdsMatriculation } from '@/data/adsData';
import { evaluationOptionsMatriculation } from '@/data/evaluationOptions';
import Calculator from '@/features/calculator/Calculator';

export default function MatriculationExamination() {
  const evaluationOptions = [
    evaluationOptionsMatriculation,
    evaluationOptionsMatriculation,
    evaluationOptionsMatriculation,
    evaluationOptionsMatriculation,
    evaluationOptionsMatriculation,
  ];
  return (
    <Calculator
      evaluationOptions={evaluationOptions}
      addableOptions={true}
      vocational={false}
    >
      <AdsBanner ads={BannerAdsMatriculation}></AdsBanner>
    </Calculator>
  );
}
