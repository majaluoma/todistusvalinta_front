import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DegreeItem from './DegreeItem';
import { firstUpper } from '@/lib/utils';
import { useResultContext } from '@/components/context/resultContext/useResultContext';

export default function ThemeAccordion() {
  const {degrees} = useResultContext();
  return (
    degrees.length > 0?
    <Accordion type="single" collapsible className="w-full">
      {degrees.map((theme, index) => {
        return (
          <AccordionItem key={`theme_${theme.AiheID}`} value={`item-${index}`}>
            <AccordionTrigger>{firstUpper(theme.aihe)}</AccordionTrigger>
            {theme.hakukohteet.map((hakukohde) => {
              return (
                <AccordionContent key={`degree_${hakukohde.HakukohdeID}`}>
                  <DegreeItem degree={hakukohde} />
                </AccordionContent>
              );
            })}
          </AccordionItem>
        );
      })}
    </Accordion>:
    <></>
  );
}
