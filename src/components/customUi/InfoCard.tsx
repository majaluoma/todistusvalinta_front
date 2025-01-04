import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InfoCardProps } from './types';

/** Custom UI -component to show large amount of information
 */
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
