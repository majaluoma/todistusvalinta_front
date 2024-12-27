import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schemas';
import { EvaluationOptions } from '@/features/calculator/types/types';

export type Grade = {
  value: string;
  label: string;
};

export type Subject = {
  value: string;
  label: string;
};

export type GradeFormProps = {
  readyOptions : { option: EvaluationOptions; locked: boolean; }[]
  handleCalculation : () => void;
  production : boolean;
  addableOptions? : EvaluationOptions;
};

export type FormData = {
  firstGo: boolean;
  onlyPassed: boolean;
  grades: {
    subject: string;
    grade: string;
  }[];
};

export type ResultParams = z.infer<typeof formSchema>

export type OptionCheckBoxProps<T extends FieldValues> = {
  formcontrol: Control<T>;
  label: string;
  name: Path<T>;
  tooltip: string;
};
export type GradesSelectProps<T extends FieldValues> = {
  id: number;
  placeholder: string;
  field: ControllerRenderProps<T>;
  options: { label: string; value: string }[];
  fieldValue?: string;
  onValueChange?: (value: string) => void;
};