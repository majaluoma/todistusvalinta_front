// Define the type for 'Aine'
type Aine = {
    nimi?: string;
    pisteet?: number;
    arvosana?: string;
  };
  
  // Define the type for 'Alajoukko'
  type Alajoukko = {
    LaskumalliID?: number;
    maxValinnat?: number;
    JoukkoID?: number;
    oppiaineet?: Aine[];
  };
  
  // Define the type for 'YlaJoukko'
  type YlaJoukko = {
    LaskumalliID?: number;
    maxValinnat?: number;
    JoukkoID?: number;
    oppiaineet?: Aine[];
    alajoukot?: Alajoukko;
  };
  
  // Define the type for 'LaskumalliRakenne'
  export type LaskumalliRakenne = {
    LaskumalliID: number;
    laskumalliNimi?: string;
    maxPiste?: number;
    maxAine?: number;
    joukot?: YlaJoukko[];
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
  type Vuosikerta = {
    VuosikertaID: number;
    hakukohde: string;
    pisteRaja: number;
    kynnysehdot?: Kynnysehto[];
    laskumalli: Laskumalli;
    kynnysehtoOK: boolean;
    LaskumalliID: number;
    vuosi: number;
  };
  
  // Define the overall return type
  export type FullDegreeInfo = {
    hakukohde: Hakukohde;
    laskumalli: LaskumalliRakenne;
  };
