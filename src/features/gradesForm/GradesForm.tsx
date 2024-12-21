'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
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
import { GradeFormProps, ResultParams } from './types/types';
import { formSchema } from './types/schemas';
import OptionCheckBox from './components/OptionCheckBox';
import GradesSelect from './components/GradesSelect';
import { getResult } from './api/getResult';
import { useResultContext } from '@/components/context/resultContext/useResultContext';
import { BaseSyntheticEvent, useState } from 'react';
import laskin from '@/assets/laskin.svg';

export default function GradeForm({
  gradeOptions,
  subjectOptions,
  handleCalculation,
  production = true,
}: Readonly<GradeFormProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstTimer: true,
      onlyPassed: false,
      test: false,
      grades: Array(5).fill({ value: '' }),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setDegreesAndThemes } = useResultContext();

  const { fields, append, remove } = useFieldArray({
    name: 'grades',
    control: form.control,
  });

  const onSubmit = async (values: ResultParams) => {
    try {
      setIsLoading(true);
      const result = await getResult(values, false);
      setDegreesAndThemes(result, values);
      handleCalculation();
      setInterval(() => setIsLoading(false), 500);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  function testausData() {
    form.setValue('grades', [
      { subject: 'ai', grade: 'e' },
      { subject: 'maa', grade: 'm' },
      { subject: 'ena', grade: 'c' },
      { subject: 's2', grade: 'm' },
      { subject: 'r2', grade: 'l' },
      { subject: 'mab', grade: 'c' },
    ]);
  }

  function withErrorLog(
    submitHandler: (
      e?: BaseSyntheticEvent<object, unknown, unknown> | undefined,
    ) => Promise<void>,
    logInfo: FieldErrors,
  ) {
    if (logInfo.root) console.log(logInfo);
    return submitHandler;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={withErrorLog(
          form.handleSubmit(onSubmit),
          form.formState.errors,
        )}
        className="space-y-4 flex flex-col items-center"
      >
        {form.formState.errors.grades && (
          <div className="text-red-500 mb-2">
            {form.formState.errors.grades.root?.message}
          </div>
        )}
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`grades.${index}.subject`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${index !== 0 ? 'sr-only' : ''} text-xl`}
                >
                  Oppiaineet ja arvosanat
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <GradesSelect
                      placeholder={'Oppiaine'}
                      field={field}
                      options={subjectOptions}
                    />
                    <GradesSelect
                      placeholder={'Arvosana'}
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
                <FormField
                  control={form.control}
                  name={`grades.${index}.grade`}
                  render={({ fieldState }) => (
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  )}
                />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2 text-base"
          onClick={() => append({ subject: '', grade: '' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Lisää arvosana
        </Button>
        <div className="flex flex-col gap-3 items-start justify-start align-top w-full ml-5">
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
        </div>
        <div className='flex gap-4'>
          <Button
            type="submit"
            className={`${
              isLoading ? 'bg-primary' : 'bg-secondary'
            } bg-secondary pt-6 pb-6 pl-10 pr-10 text-xl hover:bg-primary shadow-sm shadow-secondary`}
          >
            {isLoading ? 'Pieni hetki' : 'Laske'}
            <img
              alt="loading..."
              src={laskin}
              className={`h-5 w-5 mr-3
              ${isLoading && 'animate-pulse'}`}
            />
          </Button>
          {!production && (
            <Button
              onClick={testausData}
              className={`${
                isLoading ? 'bg-secondary' : 'bg-primary'
              } bg-primary text-accent-foreground pt-6 pb-6 pl-10 pr-10 text-xl hover:bg-accent shadow-sm shadow-secondary`}
            >
              {isLoading ? 'Pieni hetki' : 'Testaa'}
              <img
                alt="loading..."
                src={laskin}
                className={`h-5 w-5 mr-3
              ${isLoading && 'animate-pulse'}`}
              />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
