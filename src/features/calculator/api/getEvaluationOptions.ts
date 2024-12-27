import { post } from "@/lib/apiClient";
import { EvaluationOptions } from "../types/types";

type EvaluationOptionsResponse = {
  arvosanaValikko : EvaluationOptions []
}

export async function getEvaluationOptions () {
    const query = {
        query: `
     {
  arvosanaValikko {
    ArvosanaValikkoID
    tyyppi
    oppiaineet {
      ValikkoOppiaineID
      oppiaine
      oppiaineTeksti
    }
     arvosanat {
        arvosana
        arvosanaTeksti
      }
  } 
}

    `,
      };
      const response = await post<EvaluationOptionsResponse>(query);
      return response.data.arvosanaValikko
}