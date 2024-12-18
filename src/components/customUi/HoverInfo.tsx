import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '../ui/tooltip';

type HoverInfoProps = {
  text: string;
  children: React.ReactNode;
}

export default function HoverInfo({
  text,
  children,
}: Readonly<HoverInfoProps>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
