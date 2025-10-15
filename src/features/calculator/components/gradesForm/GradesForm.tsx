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
import { GradeFormProps, ResultParams } from './types/types';
import { formSchema } from './types/schemas';
import OptionCheckBox from './components/OptionCheckBox';
import GradesSelect from './components/GradesSelect';
import { getResult } from './api/getResult';
import { useResultContext } from '@/features/calculator/context/resultContext/useResultContext';
import { useEffect, useRef, useState } from 'react';
import { EvaluationOptions } from '../../types/types';
import VocationalHelper from '../vocationalHelper/VocationalHelper';
import { numberGradeToString } from '@/lib/utils';
import SubmitButton from './components/SubmitButton';

const VITE_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

/** Allows user to input it's evaluation information to be
 * posted to the server. Can be set up differently to align to
 * vocational schools and high-school.
 */
export default function GradeForm({
  readyOptions,
  addableOptions,
  handleCalculation,
  vocational,
  saveDegreesByDefault,
  helperCalculators,
}: Readonly<GradeFormProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vocational: vocational,
      firstTimer: true,
      test: false,
      isSpring: true,
      saveDegrees: saveDegreesByDefault,
      grades: Array(readyOptions.length).fill({ subject: '', grade: '' }),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setDegreesAndThemes, year } = useResultContext();
  const ref = useRef<HTMLDivElement>(null);
  const { fields, append, remove } = useFieldArray({
    name: 'grades',
    control: form.control,
  });

  const toSubjectOptions = (options: EvaluationOptions) => {
    return options.oppiaineet.map((option) => {
      return { value: option.oppiaine, label: option.oppiaineTeksti };
    });
  };
  const toGradeOptions = (options: EvaluationOptions) => {
    return options.arvosanat.map((option) => {
      return { value: option.arvosana, label: option.arvosanaTeksti };
    });
  };

  //Initializes default options that appear to user at the start of render
  useEffect(() => {
    const defaultOptions = readyOptions.map((options) => {
      if (options.oppiaineet.length > 1) {
        return {
          subject: options.initialSubject ?? '',
          grade: options.initialGrade ?? '',
        };
      } else {
        return {
          subject: options.oppiaineet[0].oppiaine,
          grade: options.initialGrade ?? '',
        };
      }
    });

    Array(readyOptions.length).fill({ subject: '', grade: '' });

    form.reset({
      ...form.getValues(),
      grades: defaultOptions,
    });
  }, [readyOptions, form]);

  const fetchResult = async (values: ResultParams) => {
    try {
      setIsLoading(true);
      const result = await getResult(values, year);
      setDegreesAndThemes(result, values);
      handleCalculation(values);
      setInterval(() => setIsLoading(false), 2000);
      form.clearErrors();
    } catch (error: unknown) {
      console.log(error);
      handleCalculation(null);
      setInterval(() => setIsLoading(false), 3000);
    }
  };

  function inputTestData() {
    const testData = readyOptions.map((option, index) => {
      if (option.oppiaineet.length > 1) {
        return { subject: option.oppiaineet[index].oppiaine, grade: 'e' };
      } else {
        return {
          subject: option.oppiaineet[0].oppiaine,
          grade: option.arvosanat[2].arvosana,
        };
      }
    });
    form.setValue('grades', testData);
  }

  const handleHelperCalculator = (result: number, fieldIndex: number) => {
    form.setValue(
      `grades.${fieldIndex}.grade`,
      numberGradeToString(result, readyOptions[0].tyyppi),
    );
  };

  const handleError = () => {
    if (!form.formState.isValid && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Form {...form}>
      <div ref={ref} className="absolute top-0"></div>
      <form
        onSubmit={form.handleSubmit(fetchResult, handleError)}
        className="space-y-4 flex flex-col items-center w-full align-top"
      >
        {form.formState.errors.grades && (
          <div className="text-red-500 mb-2">
            {form.formState.errors.grades.root?.message}
          </div>
        )}
        <div className="flex space-y-4 flex-col items-center w-full align-top min-h-[21rem]">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={`field_${field.id}`}
              name={`grades.${index}.subject`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className={`${index !== 0 ? 'sr-only' : ''} text-xl`}
                  >
                    Oppiaineet ja arvosanat
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <GradesSelect
                        className="w-3/5"
                        id={index}
                        placeholder={'Oppiaine'}
                        field={field}
                        options={
                          readyOptions[index]
                            ? toSubjectOptions(readyOptions[index])
                            : toSubjectOptions(readyOptions[0])
                        }
                      />
                      <GradesSelect
                        className="w-2/5"
                        id={index}
                        placeholder={'Arvosana'}
                        field={field}
                        options={
                          readyOptions[index]
                            ? toGradeOptions(readyOptions[index])
                            : toGradeOptions(readyOptions[0])
                        }
                        fieldValue={form.watch(`grades.${index}.grade`)}
                        onValueChange={(value) =>
                          form.setValue(`grades.${index}.grade`, value || '')
                        }
                      />
                      {addableOptions && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:bg-card"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {helperCalculators && helperCalculators[index] && (
                        <VocationalHelper
                          calculator={helperCalculators[index]}
                          callback={(num) => handleHelperCalculator(num, index)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <div className=" flex flex-row mr-4">
                    <FormMessage className="w-3/5" />
                    <FormField
                      control={form.control}
                      name={`grades.${index}.grade`}
                      render={({ fieldState }) => (
                        <FormMessage className="w-2/5 mr-4">
                          {fieldState.error?.message}
                        </FormMessage>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
        {addableOptions ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 text-base hover:bg-card"
            onClick={() => append({ subject: '', grade: '' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Lisää arvosana
          </Button>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-3 items-start justify-start align-top w-full max-w-[26rem]">
          <OptionCheckBox
            formcontrol={form.control}
            label="Olen ensikertalainen"
            name="firstTimer"
            tooltip="Jos et ole ottanut paikkaa vastaan suomalaisesta korkeakoulusta"
          ></OptionCheckBox>
          <OptionCheckBox
            formcontrol={form.control}
            label="Muista arvosanani"
            name="saveDegrees"
            tooltip="Arvosanasi tallennetaan evästeelle."
          ></OptionCheckBox>
        </div>
        <div className="flex gap-4">
          <SubmitButton text="Laske" isLoading={isLoading} />
          {VITE_ENVIRONMENT === 'development' && (
            <SubmitButton
              text="Testaa"
              isLoading={isLoading}
              onClick={inputTestData}
              className="bg-primary hover:bg-secondary"
            />
          )}
        </div>
      </form>
    </Form>
  );
}
