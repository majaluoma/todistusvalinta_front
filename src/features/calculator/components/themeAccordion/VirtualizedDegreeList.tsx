import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { DegreeObject } from '@/types/apiTypes';
import { AccordionContent } from '@radix-ui/react-accordion';
import { FixedSizeList as List } from 'react-window';
import DegreeItem from './DegreeItem';
import { Ad, AdSchema, CustomAd, CustomAdSchema } from '@/components/customUi/adsBanner/types';

type VirtualizedDegreeListProps = {
    degreesAndAds : (DegreeObject | CustomAd | Ad)[] 
}

export default function VirtualizedDegreeList ({degreesAndAds} : Readonly<VirtualizedDegreeListProps>) {
  return (
    <List
      height={500} // Adjust this value based on your needs
      itemCount={degreesAndAds.length}
      itemSize={220} // Adjust this value based on your DegreeItem height
      width="100%"
    >
      {({ index, style }) => {
        const item = degreesAndAds[index];
        const ad = CustomAdSchema.safeParse(item).data || AdSchema.safeParse(item).data;
        return (
          <div style={style} className='bg-background'>
            {ad ? (
              <AccordionContent className='h-[220px] overflow-hidden flex align-center justify-center items-center z-20'>
                <AdsBanner ads={[ad]} />
              </AccordionContent>
            ):
            <AccordionContent>
              <DegreeItem degree={item as DegreeObject} />
            </AccordionContent>
            }
          </div>
        );
      }}
    </List>
  );
};