import { DegreeObject, VolumeObject } from '@/types/apiTypes';

export type DegreeItemProps = {
  degree: DegreeObject;
};

export type VolumeItemProps = {
  volume: VolumeObject;
  degree: DegreeObject;
};

export type SearchbarProps = {
  searchFunction: (string: string | null) => void;
};

export type AccordionFiltersProps = {
  filters: Filters;
  defaultFilters: Filters;
  callback: (filters: Filters) => void;
};

export type Filters = {
  universities: boolean;
  vocationalUnviersities: boolean;
  onlyPassed: boolean;
  isSpring: boolean;
};

export type FilterDisplayerProps = {
  filters: Filters;
  defaultFilters: Filters;
  callback: (filters: Filters) => void;
};
