import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradesSelectProps } from '../types/types';
import { FieldValues } from 'react-hook-form';

export default function GradesSelect<T extends FieldValues>({id, placeholder, field, options, fieldValue = field.value, onValueChange = field.onChange} : Readonly<GradesSelectProps<T>> ) {
  return (
    <Select value={fieldValue} onValueChange={onValueChange} >
      <SelectTrigger className={`w-[180px] bg-card ${fieldValue && "bg-accent"}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={`${id}_${option.value}`} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
