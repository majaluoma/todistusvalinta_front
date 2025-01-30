

export async function fetchDegreeId(keyword: string) {
  try {
    const res = await fetch(
      `https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain?koulutustyyppi=amk,yo&keyword=${keyword}`,
    );
    const json = await res.json();
    const volumeId = json.hits[0].toteutukset[0].toteutusOid
    return volumeId
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}
