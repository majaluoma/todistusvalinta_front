type apiText = {
  fi : string;
  sv : string;
  en : string;
}

type Toteutus = {
  toteutusOid: string;
  toteutusNimi:	apiText
};

type Hit = {
  toteutukset : Toteutus [];
  opintojenLaajuusNumero	: number;
  nimi: apiText;
};

type OpintopolkuResponse = {
  total: number;
  hits: Hit[];
};

export async function fetchDegreeId(keyword: string) {
  try {
    const filteredKeyword = keyword
    .replace(".","")
    .replace (",", "")
    const res = await fetch(
      `https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain?koulutustyyppi=amk,yo&keyword=${filteredKeyword}&pohjakoulutusvaatimus=pohjakoulutusvaatimuskonfo_002`,
    );
    const response = await res.json() as OpintopolkuResponse;

    const filteredHits = response.hits.filter(hit => {
      return hit.opintojenLaajuusNumero >= 170;
    })
    const volumeId = filteredHits[0].toteutukset[0].toteutusOid;
 
    return volumeId
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}