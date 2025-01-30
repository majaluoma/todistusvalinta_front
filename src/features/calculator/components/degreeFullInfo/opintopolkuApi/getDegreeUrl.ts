import { fetchDegreeId as fetchVolumeId } from "@/lib/opintopolkuApi";
const opintopolkuDegrees =  "https://opintopolku.fi/konfo/fi/toteutus";
export async function getDegreeUrl (keyword : string) {
    const volumeId = await fetchVolumeId(keyword)
    return `${opintopolkuDegrees}/${volumeId}`
}