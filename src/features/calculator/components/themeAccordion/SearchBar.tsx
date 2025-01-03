import { Input } from "@/components/ui/input";
import { FormEvent } from "react";


type SearchbarProps = {
    searchFunction : (string : string | null) => void;
}
export default function Searchbar ({searchFunction} : Readonly<SearchbarProps>) {
    
    const handleInput = (event : FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value.length > 2) {
            searchFunction(value)
        }else {
            searchFunction(null);
        }
    }
    
    return (
        <Input onInput={handleInput} type="search" placeholder="Etsi hakukohdetta..." className="bg-input mr-4">
        </Input>
    )
}