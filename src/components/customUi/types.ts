import { ReactElement } from 'react';

export type InfoCardProps = {
  header: string;
  children: ReactElement;
  subheader?: string;
  className?: string;
};

export type HoverInfoProps = {
  text: string;
  children: React.ReactNode;
};
