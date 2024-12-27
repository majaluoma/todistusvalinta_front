export type EvaluationOptions =  {
    ArvosanaValikkoID: number;
    tyyppi: string;
    oppiaineet : OptionSubject []
    arvosanat : OptionEvaluation[]
  }
  
  export type OptionEvaluation = {
    arvosana: string;
    arvosanaTeksti : string;
  }
  
  export type OptionSubject = {
    oppiaine: string;
    oppiaineTeksti: string;
  }