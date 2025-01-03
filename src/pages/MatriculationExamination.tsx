import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { BannerAdsMatriculation } from '@/data/adsData';
import Calculator from '@/features/calculator/Calculator';

export default function MatriculationExamination() {
  const optionType = [
    {
      type: 'yo',
      locked: false,
    },
    {
      type: 'yo',
      locked: false,
    },
    {
      type: 'yo',
      locked: false,
    },
    {
      type: 'yo',
      locked: false,
    },
    {
      type: 'yo',
      locked: false,
    },
  ];
  return (
    <Calculator
      optionTypes={optionType}
      addableOptions={true}
      vocational={false}
    >
      <AdsBanner ads={BannerAdsMatriculation}></AdsBanner>
    </Calculator>
  );
}
