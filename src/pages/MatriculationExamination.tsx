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
      <div className="w-screen px-0 sm:px-1 md:px-6 lg:px-8 xl:px-16 flex justify-center gap-4">
        <AdsBanner ads={BannerAdsMatriculation} className="block lg:hidden" />
        <AdsBanner
          ads={BannerAdsMatriculation.slice(0, 1)}
          className="hidden lg:block"
        />
        <AdsBanner
          ads={BannerAdsMatriculation.slice(1)}
          className="hidden lg:block"
        />
      </div>
    </Calculator>
  );
}
