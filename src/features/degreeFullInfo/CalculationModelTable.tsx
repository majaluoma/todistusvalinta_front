import { LaskumalliRakenne } from "./types"

type  CalculationModelProps =  {
    calculationModel: LaskumalliRakenne
}

export default function CalculationModelTable ({calculationModel} : Readonly<CalculationModelProps>) {
    return <>{calculationModel.laskumalliNimi}</>
}