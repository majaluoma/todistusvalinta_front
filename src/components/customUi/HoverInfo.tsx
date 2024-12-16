import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '../ui/tooltip';

export default function HoverInfo({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
