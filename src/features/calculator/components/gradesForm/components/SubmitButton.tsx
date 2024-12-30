import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import laskin from '@/assets/laskin.svg';

type SubmitButtonProps = {
  text: string;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
};

export default function SubmitButton({
  text,
  isLoading,
  onClick,
  className,
}: Readonly<SubmitButtonProps>) {
  const [isAnimating, setIsAnimating] = useState(isLoading);

  useEffect(() => {
    setIsAnimating(isLoading);
  }, [isLoading]);

  return (
    <Button
      type='submit'
      onClick={onClick}
      className={`${
        isAnimating ? 'bg-primary' : 'bg-secondary'
      } bg-secondary pt-6 pb-6 pl-10 pr-10 w-44 text-xl hover:bg-primary shadow-sm shadow-secondary ${className}`}
    >
      {isAnimating ? 'Pieni hetki' : text}
      <img
        alt="loading..."
        src={laskin}
        className={`h-5 w-5 mr-3
              ${isAnimating && 'animate-pulse'}`}
      />
    </Button>
  );
}
