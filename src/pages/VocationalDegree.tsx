import { Switch } from "@/components/ui/switch";
import Calculator from "@/features/calculator/Calculator";
import { useState } from "react";

export default function VocationalDegree() {
  const [degreeScaleIs5, setDegreeStateIs5] = useState<boolean>(true);
  const optionType5 = [{
    type: "ammMalu1-5",
  },
  {
    type: "ammYhty1-5",
  },
  {
    type: "ammVivu1-5",
  },
  {
    type: "ammKa1-5",
  }]
  const optionType3 = [{
    type: "ammMalu1-3",
  },
  {
    type: "ammYhty1-3",
  },
  {
    type: "ammVivu1-3",
  },
  {
    type: "ammKa1-3",
  }]
  return (
    <>
    <div>
    <Switch checked={degreeScaleIs5} onCheckedChange={setDegreeStateIs5}/>

    </div>
    {degreeScaleIs5 ? 
    <Calculator optionTypes={optionType5} addableOptions={false} vocational = {true}/>
    :
    <Calculator optionTypes={optionType3} addableOptions={false} vocational = {true}/>}
    </>

  );
}
