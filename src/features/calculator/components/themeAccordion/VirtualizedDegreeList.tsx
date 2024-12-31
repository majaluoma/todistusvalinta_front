import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { DegreeObject } from '@/types/apiTypes';
import { AccordionContent } from '@radix-ui/react-accordion';
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import DegreeItem from './DegreeItem';

type VirtualizedDegreeListProps = {
    degreesAndAds : DegreeAndAd[]
}

type DegreeAndAd = {
    degree: DegreeObject;
    ad: {
        id: string;
        mainospalvelu: "custom" | "adsense";
    } | {
        id: string;
        mainospalvelu: "custom" | "adsense";
        kuva: string;
        kuvaus: string;
        osoite: string;
    } | undefined;
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
        const { degree, ad } = degreesAndAds[index];
        return (
          <div style={style}>
            {ad && (
              <AccordionContent className='h-[220px] overflow-hidden flex align-center justify-center items-center z-20'>
                <AdsBanner ads={[ad]} />
              </AccordionContent>
            )}
            <AccordionContent>
              <DegreeItem degree={degree} />
            </AccordionContent>
          </div>
        );
      }}
    </List>
  );
};