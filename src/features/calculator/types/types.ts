export type EvaluationOptions =  {
    ArvosanaValikkoID: number;
    tyyppi: string;
    oppiaineet : OptionSubject [];
    arvosanat : OptionEvaluation[];
    initialGrade?: string; 
    initialSubject?: string; 
  }
  
  export type OptionEvaluation = {
    arvosana: string;
    arvosanaTeksti : string;
  }
  
  export type OptionSubject = {
    oppiaine: string;
    oppiaineTeksti: string;
  }


  export type MeanCalculator = {
    subjects: { subject: string; points: number }[];
    gradeOptions : number  [];
    text: string;
  };