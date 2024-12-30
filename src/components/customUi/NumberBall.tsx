type NumberBallProps = {
  text?: number | string | null;
  className?: string;
};

export default function NumberBall({
  text,
  className = '',
}: Readonly<NumberBallProps>) {
  return (
    <div
      className={`ml-2 mr-2 text-sm rounded-full w-7 h-7 bg-primary text-foreground text-center flex align-middle items-center justify-center 
        ${text && text?.toString().length > 2 && "text-[0.75em]"}
        ${className}`}
    >
      {text ?? '?'}
    </div>
  );
}
