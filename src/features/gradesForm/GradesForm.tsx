'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PlusCircle, X } from 'lucide-react';
import { GradeFormProps } from './types/types';
import { formSchema } from './types/schemas';
import OptionCheckBox from './components/OptionCheckBox';
import GradesSelect from './components/GradesSelect';
import { getResult } from './api/getResult';
import { useResultContext } from '@/components/context/resultContext/useResultContext';
import { useState } from 'react';
import laskin from '@/assets/laskin.svg'

export default function GradeForm({
  gradeOptions,
  subjectOptions,
  handleCalculation
}: Readonly<GradeFormProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstTimer: false,
      onlyPassed: false,
      grades: Array(5).fill({ value: '' }),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setDegreesAndThemes } = useResultContext();

  const { fields, append, remove } = useFieldArray({
    name: 'grades',
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const result = await getResult(values, false);
      setDegreesAndThemes(result);
      handleCalculation();
      setInterval(() => setIsLoading(false), 500);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`grades.${index}.subject`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                    Oppiaineet ja arvosanat
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <GradesSelect
                        placeholder={'Select subject'}
                        field={field}
                        options={subjectOptions}
                      />
                      <GradesSelect
                        placeholder={'Select grade'}
                        field={field}
                        options={gradeOptions}
                        fieldValue={form.watch(`grades.${index}.grade`)}
                        onValueChange={(value) =>
                          form.setValue(`grades.${index}.grade`, value || '')
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ subject: '', grade: '' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Lisää arvosana
          </Button>
        </div>
        <OptionCheckBox
          formcontrol={form.control}
          label="Olen ensikertalainen"
          name="firstTimer"
          tooltip="Jos et ole ottanut paikkaa vastaan suomalaisesta korkeakoulusta"
        ></OptionCheckBox>
        <OptionCheckBox
          formcontrol={form.control}
          label="Vain paikat, joihin pääsisin"
          name="onlyPassed"
          tooltip="Näytä vain paikat joihin olisit viime vuonna päässyt sisään"
        ></OptionCheckBox>
        <Button type="submit">
          {isLoading? "Pieni hetki" : "Laske"}  
          <img
            alt="loading..."
            src={laskin}
            className={`h-5 w-5 mr-3
              ${isLoading && 'animate-pulse'}`}
          />
        </Button>
      </form>
    </Form>
  );
}
