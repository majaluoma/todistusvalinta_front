import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import searchIcon from '@/assets/searchIcon.svg';
import { SearchbarProps } from './types';

/** Allows user to input strings which will trigger a search function
 *
 */
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
    <div className="relative flex w-full mr-12 justify-between">
      <Input
        onInput={handleInput}
        type="search"
        placeholder="Etsi hakukohdetta..."
        className="peer bg-input placeholder:text-sm md:text-base lg:text-base"
      ></Input>
      <img
        className="absolute size-5 right-3 top-2.5 peer-placeholder-shown:block peer-focus:hidden"
        src={searchIcon}
        alt={'etsi'}
      />
    </div>
  );
}
