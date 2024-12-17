import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DegreeItem from './DegreeItem';
import { ThemeAccordionProps } from './types';
import { firstUpper } from '@/lib/utils';

export default function ThemeAccoridon({
  themesAndDegree,
}: ThemeAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {themesAndDegree.map((theme) => {
        return (
          <AccordionItem key={`theme_${theme.themeId}`} value="item-3">
            <AccordionTrigger>{firstUpper(theme.name)}</AccordionTrigger>
            {theme.degrees.map((degree) => {
              return (
                <AccordionContent key={`degree_${degree.degreeId}`}>
                  <DegreeItem degree={degree} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
