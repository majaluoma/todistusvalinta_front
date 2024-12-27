import Calculator from "@/features/calculator/Calculator";

export default function MatriculationExamination() {
  const optionType = [{
    type: "yo",
    locked: false
  },
  {
    type: "yo",
    locked: false
  },
  {
    type: "yo",
    locked: false
  },
  {
    type: "yo",
    locked: false
  },
  {
    type: "yo",
    locked: false
  }]
  return (
    <Calculator optionTypes={optionType} addableOptionType="yo"/>
  );
}
