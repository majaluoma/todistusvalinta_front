type NumberBallProps = {
  text?: number | string | null;
  className?: string;
};

/** Custom UI -component to show small amount of information
 */
export default function NumberBall({
  text,
  className = '',
}: Readonly<NumberBallProps>) {
  return (
    <div
      className={`mx-2 text-base rounded-full w-7 h-7 text-center flex items-center justify-center 
        ${text && text?.toString().length > 2 && 'text-sm'}
        ${className}`}
    >
      {text ?? '?'}
    </div>
  );
}
