// Define the type for 'Aine'
export type Aine = {
    nimi?: string;
    pisteet?: number;
    arvosana?: string;
  };
  
  // Define the type for 'YlaJoukko'
  export type Joukko = {
    LaskumalliID?: number;
    maxValinnat?: number;
    JoukkoID?: number;
    oppiaineet?: Aine[];
    alajoukot?: Joukko [];
  };
  
  // Define the type for 'LaskumalliRakenne'
  export type LaskumalliRakenne = {
    LaskumalliID: number;
    laskumalliNimi : string;
    maxPiste: number;
    maxAine: number;
    joukot: Joukko[];
  };
  
  // Define the type for 'Hakukohde'
  export type Hakukohde = {
    HakukohdeID: number;
    hakukohde: string;
    korkeakoulu: string;
    vuosikerrat: Vuosikerta[];
    AiheID: string;
    aihe: string;
  };
  
  // Define the type for 'Summa'
  type Summa = {
    pisteet: number;
    lasketut?: Aine[];
  };
  
  // Define the type for 'Laskumalli'
  type Laskumalli = {
    LaskumalliID: number;
    summa: Summa;
  };
  
  // Define the type for 'Kynnysehto'
  export type Kynnysehto = {
    KynnysehtoID: number;
    ehdot: Ehto[];
  };
  
  // Define the type for 'Ehto'
  type Ehto = {
    nimi?: string;
    arvosana?: string;
  };
  
  // Define the type for 'Vuosikerta'
  export type Vuosikerta = {
    VuosikertaID: number;
    hakukohde: string;
    pisteRaja: number;
    kynnysehdot: Kynnysehto[];
    laskumalli: Laskumalli;
    kynnysehtoOK: boolean;
    LaskumalliID: number;
    vuosi: number;
    haku: string;
  };
  
  // First is the ensikertalaiset, second the other
  export type FullDegreeInfo = {
    hakukohteet: [Hakukohde, Hakukohde | undefined];
    laskumalli: LaskumalliRakenne;
  };
