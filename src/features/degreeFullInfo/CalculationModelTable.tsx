import { CalculationModel } from "@/types/apiTypes"

type  CalculationModelProps =  {
    calculationModel: CalculationModel
}

export default function CalculationModelTable ({calculationModel} : Readonly<CalculationModelProps>) {
    return <>Not implemented {calculationModel.summa.pisteet}</>
}