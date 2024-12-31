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

  if (text.length > 8 && text !== "undefined") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className='bg-popover text-popover-foreground'>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }else {
    return <>{children}</>
  }
}
