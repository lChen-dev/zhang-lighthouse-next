import React from 'react';

import { B2 } from '@components/shared/Typography';
import classNames from 'classnames';

type BuildingFilter = {
  mostCashBack: boolean;
  newBuildings: boolean;
  luxury: boolean;
  closeToCampus: boolean;
  furnished: boolean;
  specials: boolean;
};

interface Props {
  filters: BuildingFilter;
  setFilters: (filters: any) => void;
}

interface FilterButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ selected, onClick, label }: FilterButtonProps) => (
  <button
    type="button"
    className={classNames(
      'font-semibold py-2 px-3 hover:border-green-600 rounded outline-none mr-2 text-sm whitespace-nowrap md:whitespace-nowrap',
      selected ? 'border-none bg-green-600' : 'border bg-transparent',
    )}
    onClick={onClick}
    style={{
      color: selected ? '#fff' : 'rgba(42, 52, 58, 0.75)',
      outline: 'none',
      whiteSpace: 'nowrap',
    }}>
    {label}
  </button>
);

const Filters: React.FC<Props> = ({ filters, setFilters }: Props) => {
  return (
    <div className="w-full relative flex flex-row items-center mb-6">
      <div className="flex flex-row items-center z-20 pl-18 w-full max-w-screen-xl mx-auto relative laptop-md:px-0 px-4 overflow-auto">
        <B2 className="text-left mr-4" color="text-gray-soft">
          Filters:{' '}
        </B2>
        {/* ======= */}
        <FilterButton
          label="Most cash back"
          selected={filters.mostCashBack}
          onClick={() => setFilters({ ...filters, mostCashBack: !filters.mostCashBack })}
        />
        <FilterButton
          label="New buildings"
          selected={filters.newBuildings}
          onClick={() => setFilters({ ...filters, newBuildings: !filters.newBuildings })}
        />
        <FilterButton
          label="Close to campus"
          selected={filters.closeToCampus}
          onClick={() => setFilters({ ...filters, closeToCampus: !filters.closeToCampus })}
        />
        <FilterButton
          label="Luxury"
          selected={filters.luxury}
          onClick={() => setFilters({ ...filters, luxury: !filters.luxury })}
        />
        <FilterButton
          label="Furnished"
          selected={filters.furnished}
          onClick={() => setFilters({ ...filters, furnished: !filters.furnished })}
        />
        <FilterButton
          label="Specials"
          selected={filters.specials}
          onClick={() => setFilters({ ...filters, specials: !filters.specials })}
        />
      </div>
    </div>
  );
};

export default Filters;
