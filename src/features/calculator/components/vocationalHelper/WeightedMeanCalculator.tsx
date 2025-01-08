import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import GradesSelect from '../gradesForm/components/GradesSelect';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

type WeightedMeanCalculatorProps = {
  subjects: { subject: string; points: number }[];
  gradeOptions: number[];
  callback: (weightedMean: number) => void;
  saveAndClose: (weightedMean: number) => void;
};

const meanFormSchema = z.object({
  grades: z.array(
    z.object({
      subject: z.string(),
      points: z.string(),
      grade: z.string(),
    }),
  ),
});

export default function WeightedMeanCalculator({
  subjects,
  gradeOptions,
  callback,
  saveAndClose
}: Readonly<WeightedMeanCalculatorProps>) {
  const form = useForm<z.infer<typeof meanFormSchema>>({
    resolver: zodResolver(meanFormSchema),
    defaultValues: {
      grades: subjects.map((s) => {
        return { subject: s.subject, points: s.points.toString(), grade: '1' };
      }),
    },
  });
  const [weightedMean, setWeightedMean] = useState(1);

  const { fields, append } = useFieldArray({
    name: 'grades',
    control: form.control,
  });

  const toValueLabelPair = (numbers: number[]) => {
    return numbers.map((num) => {
      return { label: num.toString(), value: num.toString() };
    });
  };

  const pointsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSubmit = (values: z.infer<typeof meanFormSchema>) => {
    saveAndClose(calculateMean(values));
  };

  const calculateMean = (values: z.infer<typeof meanFormSchema>) => {
    const gradesAsNumValues = values.grades.map((grade) => {
      return {
        points: Number.parseInt(grade.points),
        grade: Number.parseInt(grade.grade),
      };
    });
    const average =
      gradesAsNumValues.reduce((average, num) => {
        return average + num.grade * num.points;
      }, 0) /
      gradesAsNumValues.reduce((sum, num) => {
        return sum + num.points;
      }, 0);

    return Math.round(average);
  };

  const handeChange = () => {
    const mean = calculateMean(form.getValues())
    setWeightedMean(mean);
    callback(mean);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2"
        onChange={handeChange}
      >
        {fields.map((field, index) => {
          return (
            <div key={`meanGrade_${field.id}`}>
              <div className='flex flex-row justify-between'>
                <Label>{field.subject}</Label>
                <p>Arvosana</p>
              </div>
              <div className="flex flex-row justify-between">
                <div className='flex flex-row items-baseline'>
                  <span>laajuus:</span>
                <FormField
                  control={form.control}
                  key={`meanPoints_${field.id}`}
                  name={`grades.${index}.points`}
                  render={({ field }) => {
                    return (
                      <GradesSelect
                        id={index}
                        field={field}
                        placeholder={'1'}
                        options={
                          subjects[index]
                            ? toValueLabelPair([subjects[index].points])
                            : toValueLabelPair(pointsOptions)
                        }
                        className="w-[60px]"
                      ></GradesSelect> 
                    );
                  }}
                ></FormField> 
                <span></span>
                </div>
                <FormField
                  control={form.control}
                  key={`meanGrade_${field.id}`}
                  name={`grades.${index}.grade`}
                  render={({ field }) => {
                    return (
                      <GradesSelect
                        id={index}
                        field={field}
                        placeholder="1"
                        options={toValueLabelPair(gradeOptions)}
                        className="w-[60px]"
                      ></GradesSelect>
                    );
                  }}
                ></FormField>
              </div>
            </div>
          );
        })}
        <div className="flex flex-row gap-5 justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 text-base"
            onClick={() =>
              append({ subject: 'Valinnainen', points: '1', grade: '1' })
            }
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Valinnainen
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 text-base pl-7 pr-7"
            onClick={() => handleSubmit(form.getValues())}
          >
            Sulje
          </Button>
        </div>
        <p>Keskiarvo: {weightedMean}</p>
      </form>
    </Form>
  );
}
