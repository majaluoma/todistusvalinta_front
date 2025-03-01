import { VolumeObject } from '@/types/apiTypes';

type ResultInfoProps = {
  volume: VolumeObject;
};

export default function ResultInfo({ volume }: Readonly<ResultInfoProps>) {
  const passed =
    volume.laskumalli.summa.pisteet >= volume.pisteRaja && volume.kynnysehtoOK;

  return (
    <div className="flex flex-row ">
      <p className="text-sm mr-0.5 text-muted-foreground">
        {volume.vuosi}
        {volume.haku === 'Kevään yhteishaku' ? ' kevät' : ' syksy'}:{' '}
      </p>
      <p
        className={`text-sm ${
          passed && 'bg-primary text-primary-foreground'
        } text-nowrap rounded-lg pr-2 pl-2`}
      >
        Pisteesi: {volume.laskumalli.summa.pisteet} / {volume.pisteRaja}
      </p>
    </div>
  );
}
