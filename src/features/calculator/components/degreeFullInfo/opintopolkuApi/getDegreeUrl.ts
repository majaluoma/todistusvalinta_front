import { fetchDegreeId as fetchVolumeId } from "@/lib/opintopolkuApi";
const opintopolkuDegrees =  "https://opintopolku.fi/konfo/fi/toteutus";
export async function getDegreeUrl (degreeName : string, university : string) {
    const volumeId = await fetchVolumeId(degreeName + ' ' + university);
    if (volumeId === null) {
        return `https://opintopolku.fi/konfo/fi/haku/${degreeName}%20?koulutustyyppi=amk-alempi,kandi,kandi-ja-maisteri&order=desc&size=20&sort=score`
    }else {
        return `${opintopolkuDegrees}/${volumeId}`
    }
}