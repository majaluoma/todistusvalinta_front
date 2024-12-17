export type ThemeAccordionProps =  {
    themesAndDegree : Theme [];
}

export type DegreeItemProps = {
    degree : Degree;
}

type Degree = {
    degreeId : number;
    universityId : number;
    themeId : number;
    name : string;
    trueName : string;
    volumes : Volume []
}

type Volume = {
    volumeId : number;
    degreeId : number;
    calculationModel : CalculationModel
    year : number;
    percentAccepted : number;
    selectionType : 0 | 1 | 2 | 3 | 4
}

type CalculationModel = {
    name : string;
    calculationModelId : number;
    maxPoints : number;
    maxSubjects : number;
}

type Theme = {
    themeId : number;
    name : string;
    degrees : Degree []; 
}