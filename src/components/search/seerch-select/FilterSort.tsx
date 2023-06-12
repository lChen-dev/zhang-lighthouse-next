import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CheckedIcon, SelectArrow } from '@components/shared/Icons';
import './index.css';
import { B1 } from '@components/shared/Typography';
import { removeUndefinedFields } from '@utils/helpers';
import router from 'next/router';

export type SelectOption = {
  label: string | number;
  value?: string | number;
  disabled?: boolean;
};

interface FilterOption {
  label: JSX.Element;
  value: number;
}

const DEFAULT_FILTER = 3;

const OPTIONS: FilterOption[] = [
  {
    label: (
      <B1 className="input-text" weight="font-book" lineHeight="1.5rem">
        Sort by <b className="font-bold input-text">Cash Back</b> (High to Low)
      </B1>
    ),
    value: 3,
  },
  {
    label: (
      <B1 className="input-text" weight="font-book" lineHeight="1.5rem">
        Sort by <b className="font-bold input-text">Cash Back</b> (Low to High)
      </B1>
    ),
    value: 4,
  },

  {
    label: (
      <B1 className="input-text" weight="font-book" lineHeight="1.5rem">
        Sort by <b className="font-bold input-text">Price</b> (Low to High)
      </B1>
    ),
    value: 1,
  },
  {
    label: (
      <B1 className="input-text" weight="font-book" lineHeight="1.5rem">
        Sort by <b className="font-bold input-text">Price</b> (High to Low)
      </B1>
    ),
    value: 2,
  },
];

const FilterSort: FC = () => {
  const node = useRef<HTMLDivElement>(null);
  const mainNode = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const { query, pathname } = router;

  const handleClickOutside = (e: any) => {
    if (mainNode?.current?.contains(e.target as Node) || node?.current?.contains(e.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const updateQuery = (newArgs: { [key: string]: any }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const [value, setValue] = useState<string | number>(DEFAULT_FILTER);

  return (
    <div className="select-wrapper" tabIndex={1}>
      <div ref={mainNode} className={`select-name ${open && 'open'}`} onClick={() => setOpen((prev) => !prev)}>
        {OPTIONS?.find((option) => option.value === value)?.label}
        <div>
          <SelectArrow open={open} arrowColor="#34966D" />
        </div>
      </div>
      {open && (
        <div ref={node} className={`options dropdown-wrapper bg-white ${open ? 'open' : ''}`}>
          {OPTIONS?.map((val) => (
            <div
              key={val.value}
              className={`simple-option rounded-option ${value === val.value && 'active'}`}
              onClick={() => {
                setValue(val?.value ?? '0');
                updateQuery({ sort: val.value });
                setOpen(false);
              }}
            >
              <span className="input-text">{val.label}</span>
              {value === val.value && (
                <div className="option-checked">
                  <CheckedIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSort;
