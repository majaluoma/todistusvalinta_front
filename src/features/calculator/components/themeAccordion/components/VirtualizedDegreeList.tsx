import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { DegreeObject } from '@/types/apiTypes';
import { AccordionContent } from '@radix-ui/react-accordion';
import { FixedSizeList as List } from 'react-window';
import DegreeItem from './DegreeItem';
import {
  Ad,
  AdSchema,
  CustomAd,
  CustomAdSchema,
} from '@/components/customUi/adsBanner/types';
import { useResultContext } from '../../../context/resultContext/useResultContext';
import { useEffect, useState } from 'react';

type VirtualizedDegreeListProps = {
  degreesAndAds: (DegreeObject | CustomAd | Ad)[];
};

const heightWithTabs = 220;
const normalHeight = 160;

/** To counter performance issues with large amount of
 * degree data, VirtualizedDegreeList will show degrees as
 * a virtualized react window. This renders only those elements
 * present in user's window
 *
 */
export default function VirtualizedDegreeList({
  degreesAndAds,
}: Readonly<VirtualizedDegreeListProps>) {
  const { year } = useResultContext();
  const [itemHeight, setItemHeight] = useState(normalHeight);
  const [height, setHeight] = useState(540);

  useEffect(() => {
    if (!year) {
      setItemHeight(heightWithTabs);
    }
    if (degreesAndAds.length < 4) {
      setHeight(degreesAndAds.length * (year ? 160 : heightWithTabs));
    }
  }, [year, degreesAndAds]);

  return (
    <List
      height={height}
      itemCount={degreesAndAds.length}
      itemSize={itemHeight}
      width="100%"
    >
      {({ index, style }) => {
        const item = degreesAndAds[index];
        const ad =
          CustomAdSchema.safeParse(item).data || AdSchema.safeParse(item).data;
        return (
          <div style={style} className="bg-black/10 pt-4">
            {ad ? (
              <AccordionContent className="h-[150px] overflow-hidden flex align-center justify-center items-center z-20">
                <AdsBanner ads={[ad]} />
              </AccordionContent>
            ) : (
              <AccordionContent>
                <DegreeItem degree={item as DegreeObject} />
              </AccordionContent>
            )}
          </div>
        );
      }}
    </List>
  );
}
