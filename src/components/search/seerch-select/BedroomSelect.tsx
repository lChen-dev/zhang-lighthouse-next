import React, { FC, useEffect, useRef, useState } from 'react';
import { bedRange } from '@utils/building-helper';
import { CheckedIcon, SelectArrow } from '@components/shared/Icons';
import './index.css';
import SelectClearBtn from './SelectClearBtn';
import router from 'next/router';

export type SelectOption = {
  handleSelect?: (value: string | number | undefined) => void;
  updateQuery?: (newArgs: { [key: string]: any }) => void;
  value?: number | null | undefined;
};

const SelectBedroom: FC<SelectOption> = ({ handleSelect, updateQuery, value }) => {
  const node = useRef<HTMLDivElement>(null);
  const mainNode = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState<number>();
  const [max] = useState<number>();
  const { query } = router;

  const handleClickOutside = (e: any) => {
    if (mainNode?.current?.contains(e.target as Node) || node?.current?.contains(e.target as Node)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    setMin(query?.bedrooms ? Number(query.bedrooms) : undefined);
  }, [query]);

  return (
    <div className="select-wrapper font-circular" tabIndex={1}>
      <div
        ref={mainNode}
        className={`select-name font-circular ${open && 'open'}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {(handleSelect && value) || (!handleSelect && (min || max)) ? (
          bedRange(handleSelect ? value : min, max, 'Studio', 'Bed')
        ) : (
          <span className="input-text font-book">Any Beds</span>
        )}

        <div>
          <SelectArrow open={open} arrowColor="#34966D" />
        </div>
      </div>
      {((min && !handleSelect) || value) && (
        <SelectClearBtn
          handleClick={() => {
            if (handleSelect) {
              handleSelect(undefined);
              setMin(undefined);
            } else {
              setMin(undefined);
              updateQuery && updateQuery({ bedrooms: undefined });
            }
          }}
        />
      )}
      {open && (
        <div ref={node} className={`bg-white options ${open ? 'open' : ''}`}>
          {[0.5, 1, 2, 3, 4]
            .filter((val) => !max || val < max)
            .map((val) => (
              <div
                key={val}
                className={`simple-option ${min === val && 'active'}`}
                onClick={() => {
                  {
                    if (handleSelect) {
                      handleSelect(val);
                      setMin(val);
                    } else {
                      setMin(val);
                      updateQuery && updateQuery({ bedrooms: val });
                    }
                  }
                  setOpen(false);
                }}
              >
                <span className="input-text font-book">{bedRange(val, undefined, 'Studio', 'Bed')}</span>
                {((!handleSelect && min === val) || value === val) && (
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

export default SelectBedroom;
