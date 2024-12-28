import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradesSelectProps } from '../types/types';
import { FieldValues } from 'react-hook-form';
import HoverInfo from '@/components/customUi/HoverInfo';

export default function GradesSelect<T extends FieldValues>({id, placeholder, field, options, fieldValue = field.value, onValueChange = field.onChange, className} : Readonly<GradesSelectProps<T>> ) {
  
  
  return (
    <Select value={fieldValue} onValueChange={onValueChange} disabled={options.length <= 1}>
      <HoverInfo text={options.find(e=> {return e.value === fieldValue})?.label ?? 'Valitse'}>
      <SelectTrigger className={`w-[220px] bg-card ${fieldValue && "bg-accent break-all" } disabled:opacity-70 ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      </HoverInfo>
      <SelectContent className={`w-[220px] ${className}`}>
        {options.map((option) => (
          <SelectItem key={`${id}_${option.value}`} value={option.value} className={`w-[220px] ${className}`}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
