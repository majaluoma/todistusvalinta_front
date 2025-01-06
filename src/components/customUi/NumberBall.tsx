type NumberBallProps = {
  text?: number | string | null;
  image?: string;
  className?: string;
};

/** Custom UI -component to show small amount of information
 */
export default function NumberBall({
  text,
  image,
  className = '',
}: Readonly<NumberBallProps>) {
  return (
    <span
      className={`mx-2 text-base rounded-full w-7 h-7 text-center flex items-center justify-center 
        ${text && text?.toString().length > 2 && 'text-sm'}
        ${className}`}
    >
      {image === undefined && text}
      {image && 
      <img alt={text?.toString()} src={image} className="p-0.5">
      </img>}
    </span>
  );
}
