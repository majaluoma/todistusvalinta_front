import { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export type Grade = {
    value: string;
    label: string;
  };
  
  export type Subject = {
    value: string;
    label: string;
  };
  
  export type GradeFormProps = {
    gradeOptions: Grade[];
    subjectOptions: Subject[];
  }
  
  export type FormData  = {
    firstGo: boolean;
    onlyPassed: boolean;
    grades: {
      subject: string;
      grade: string;
    }[];
  }

  export  type OptionCheckBoxProps<T extends FieldValues> =
 {
  formcontrol : Control<T>;
  label : string;
  name : Path<T>;
  tooltip : string;
 }  
  export type GradesSelectProps<T extends FieldValues> =
  {
    placeholder : string;
    field : ControllerRenderProps<T>;
    options : {label: string, value : string} [];
    fieldValue? : string; 
    onValueChange? : (value : string) => void;
  }