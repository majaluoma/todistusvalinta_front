import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactElement } from 'react';

type InfoCardProps = {
  header: string;
  children: ReactElement;
  subheader?: string;
  className?: string;
};

export default function InfoCard({
  header,
  children,
  subheader,
  className,
}: Readonly<InfoCardProps>) {
  return (
    <Card className={className}>
      <CardHeader className="p-4">
        <CardTitle>{header}</CardTitle>
        <CardDescription>{subheader}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row pb-4 justify-between">
        {children}
      </CardContent>
    </Card>
  );
}
