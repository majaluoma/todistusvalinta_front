import { Button } from '@/components/ui/button';
import { FilterDisplayerProps, Filters } from '../types';

export default function FilterDisplayer({
  filters,
  defaultFilters,
  callback,
}: Readonly<FilterDisplayerProps>) {

  const handleClick = (key: keyof Filters) => {
    const newFilters = { ...filters, [key]: !filters[key] };
    callback(newFilters);
  };

  const renderFilterButton = (key: keyof Filters, label: string) => (
    <Button variant="ghost" size="sm" onClick={() => handleClick(key)}>
      <span className="bg-transparent text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-secondary">
        {label}
        <span className={`text-secondary ml-1 text-sm font-bold`}>
        x
      </span>
      </span>
      
    </Button>
  );

  return (
    <div className="flex flex-row">
      {filters.onlyPassed !== defaultFilters.onlyPassed &&
        renderFilterButton('onlyPassed', 'Vain hyväksytyt')}
      {filters.universities !== defaultFilters.universities &&
        renderFilterButton('universities', 'Ei yliopistoja')}
      {filters.vocationalUnviersities !== defaultFilters.vocationalUnviersities &&
        renderFilterButton('vocationalUnviersities', 'Ei AMK-kohteita')}
    </div>
  );
}
