import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import searchIcon from '@/assets/searchIcon.svg';

type SearchbarProps = {
  searchFunction: (string: string | null) => void;
};
export default function Searchbar({
  searchFunction,
}: Readonly<SearchbarProps>) {
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value.length > 2) {
      searchFunction(value);
    } else {
      searchFunction(null);
    }
  };

  return (
    <div className="flex w-full mr-4 justify-between">
      <Input
        onInput={handleInput}
        type="search"
        placeholder="Etsi hakukohdetta..."
        className="bg-input placeholder:text-sm md:text-base lg:text-base"
      ></Input>
      <img
        className="relative size-5 right-8 top-2.5"
        src={searchIcon}
        alt={'etsi'}
      />
    </div>
  );
}
