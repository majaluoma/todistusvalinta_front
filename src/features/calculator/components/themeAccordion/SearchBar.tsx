import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import searchIcon from '@/assets/searchIcon.svg';
import crossIcon from '@/assets/crossIcon.svg';
import { SearchbarProps } from './types';
import { Button } from '@/components/ui/button';

/** Allows user to input strings which will trigger a search function
 *
 */
export default function Searchbar({
  searchFunction,
}: Readonly<SearchbarProps>) {
  const [inputValue, setInputValue] = useState('');
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
    if (value.length > 2) {
      searchFunction(value);
    } else {
      searchFunction(null);
    }
  };

  const clearInput = () => {
    setInputValue('');
    searchFunction(null);
  };

  return (
    <div className="relative flex w-full mr-4 justify-between">
      <Input
        onInput={handleInput}
        type="text"
        value={inputValue}
        placeholder="Etsi hakukohdetta..."
        className="peer bg-input placeholder:text-sm md:text-base lg:text-base"
      ></Input>
      {!inputValue &&<img
        className="absolute size-5 right-3 top-2.5 peer-placeholder-shown:block peer-focus:hidden"
        src={searchIcon}
        alt={'etsi'}
      />}
      {inputValue && (
        <Button type='button' variant="ghost" className='bg-transparent absolute right-0' onClick={clearInput}>
          <img
            className="size-5"
            src={crossIcon}
            alt={'etsi'}
          />
        </Button>
      )}
    </div>
  );
}
