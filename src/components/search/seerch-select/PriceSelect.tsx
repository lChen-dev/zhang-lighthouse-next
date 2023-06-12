import React, { useEffect, useRef, useState } from 'react';

import { numberWithCommas, formatPriceRange } from '../../../utils/format';

import { B2 } from '../../shared/Typography';
import { CheckedIcon, SelectArrow } from '../../shared/Icons';
import SelectClearBtn from './SelectClearBtn';
import { removeUndefinedFields } from '@utils/helpers';
import router from 'next/router';

export interface Props {
  arrowColor: string;
  absolute?: boolean;
  className?: string;
  locked?: boolean;
  handleSelect?: (value: Record<string, any>) => void;
  minValue?: number | undefined;
  maxValue?: number | undefined;
  updateQuery?: (newArgs: { [key: string]: any }) => void;
}

function addCommas(value: number | undefined) {
  if (!value) {
    return value;
  }

  return numberWithCommas(value);
}

function removeCommas(_value: any) {
  if (!_value) {
    return _value;
  }
  const value = (_value || '')
    .toString()
    .replace(/\D/gm, '')
    .replace(/\,/g, '');
  if (!value) {
    // hnadle empty
    return;
  }
  return parseInt(value, 10);
}

export default function PriceSelect({
  absolute = true,
  className,
  locked = false,
  handleSelect,
  minValue,
  maxValue,
  updateQuery,
}: Props) {
  const { query } = router;
  const node = useRef<HTMLDivElement>(null);
  const mainNode = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  const handleClickOutside = (e: any) => {
    if (mainNode?.current?.contains(e.target as Node) || node?.current?.contains(e.target as Node)) {
      // inside click
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
    setMin(query?.minPrice ? Number(query.minPrice) : undefined);
    setMax(query?.maxPrice ? Number(query.maxPrice) : undefined);
  }, [query]);

  return (
    <div tabIndex={1} className={`relative flex-grow-0 flex-shrink-0 ${className} price-select-wrapper`}>
      <div
        ref={mainNode}
        onClick={() => {
          if (locked) {
            return;
          }
          setOpen(!open);
        }}
        className="relative border h-10 font-circular font-light text-md align-baseline focus:outline-none appearance-none w-full select-none input main-input"
        style={{ padding: '6px 15px' }}
      >
        <div className="w-40 mr-10 inline-block input-text font-circular text-18px font-medium input-name">
          {(handleSelect && (minValue || maxValue)) || (!handleSelect && (min || max)) ? (
            formatPriceRange(minValue ? Number(minValue) : min, maxValue ? Number(maxValue) : max)
          ) : (
            <span className="input-text font-circular font-book">Any Price</span>
          )}
        </div>
        {((min && !handleSelect) || (max && !handleSelect) || minValue || maxValue) && (
          <SelectClearBtn
            handleClick={() => {
              setMin(undefined);
              setMax(undefined);
              handleSelect
                ? handleSelect({ minPrice: undefined, maxPrice: undefined })
                : updateQuery && updateQuery({ minPrice: undefined, maxPrice: undefined });
            }}
          />
        )}
        <SelectArrow open={open} arrowColor="#34966D" />
      </div>
      {open && (
        <div
          className={`bg-white font-circular w-full flex ${
            absolute ? 'absolute' : ''
          } shadow-brand-lg md:p-2 pt-1 pb-2 select-none dropdown-wrapper price-dropdown-wrapper`}
          style={{ top: '55px' }}
          ref={node}
        >
          <div className="w-1/2 relative">
            <div>
              <input
                className="px-4 py-2 yborder bg-white h-10 text-18px font-circular font-book text-md align-baseline focus:outline-none appearance-none w-full mb-2 input"
                style={{ paddingLeft: '1.4rem' }}
                placeholder="Min"
                onChange={(e) => {
                  setMin(removeCommas(e.target.value));
                  handleSelect
                    ? handleSelect({ minPrice: removeCommas(e.target.value) })
                    : updateQuery && updateQuery({ minPrice: removeCommas(e.target.value) });
                }}
                value={minValue ? addCommas(minValue) : addCommas(min) || ''}
              />
            </div>
            {((min && !handleSelect) || minValue) && (
              <span
                style={{ paddingTop: '.4rem', top: '0', left: '0' }}
                className="absolute pl-3 font-circular text-18px font-book"
              >
                $
              </span>
            )}
            {[...Array(8).keys()]
              .map((key, i) => (max || 2000) - 200 * (i + 1))
              .filter((val) => val >= 600)
              .reverse()
              .map((val) => (
                <B2
                  className={`p-1 hover:bg-gray-200 cursor-pointer font-book ${((!handleSelect && min === val) ||
                    minValue === val) &&
                    'active'} simple-option rounded-option`}
                  onClick={() => {
                    setMin(removeCommas(val));
                    handleSelect
                      ? handleSelect({ minPrice: removeCommas(val) })
                      : updateQuery && updateQuery({ minPrice: removeCommas(val) });
                  }}
                >
                  <span className="input-text font-book">{formatPriceRange(val)}</span>
                  {((!handleSelect && min === val) || minValue === val) && (
                    <div className="option-checked">
                      <CheckedIcon />
                    </div>
                  )}
                </B2>
              ))}
            <B2
              color="text-gray-600"
              className="p-1 cursor-pointer simple-option font-book"
              onClick={() => {
                setMin(undefined);
                handleSelect
                  ? handleSelect({ minPrice: undefined })
                  : updateQuery && updateQuery({ minPrice: undefined });
              }}
            >
              No Min
            </B2>
          </div>
          <span className="mx-1 font-bold text-18px" style={{ marginTop: '2px', opacity: 0.15 }}>
            -
          </span>
          <div className="w-1/2 relative">
            <input
              className="px-4 py-2 border h-10 text-18px bg-white font-circular font-book text-md align-baseline focus:outline-none appearance-none w-full mb-2 input"
              style={{ paddingLeft: '1.4rem' }}
              placeholder="Max"
              onChange={(e) => {
                setMax(removeCommas(e.target.value));
                handleSelect
                  ? handleSelect({ maxPrice: removeCommas(e.target.value) })
                  : updateQuery && updateQuery({ maxPrice: removeCommas(e.target.value) });
              }}
              value={maxValue ? addCommas(maxValue) : addCommas(max) || ''}
            />
            {((!handleSelect && max) || maxValue) && (
              <span
                style={{ paddingTop: '.4rem', top: '0', left: '0' }}
                className="absolute pl-3 font-circular font-book text-18px"
              >
                $
              </span>
            )}
            {[...Array(8).keys()]
              .map((key, i) => (min || 1400) + 200 * (i + 1))
              .map((val) => (
                <B2
                  color="text-gray-600"
                  className={`p-1 cursor-pointer ${((!handleSelect && max === val) || maxValue === val) &&
                    'active'} simple-option rounded-option`}
                  onClick={() => {
                    setMax(removeCommas(val));
                    handleSelect
                      ? handleSelect({ maxPrice: removeCommas(val) })
                      : updateQuery && updateQuery({ maxPrice: removeCommas(val) });
                  }}
                >
                  <span className="input-text font-book">{formatPriceRange(val)}</span>
                  {((!handleSelect && max === val) || maxValue === val) && (
                    <div className="option-checked">
                      <CheckedIcon />
                    </div>
                  )}
                </B2>
              ))}
            <B2
              color="text-gray-600"
              className="p-1 cursor-pointer simple-option font-book"
              onClick={() => {
                setMax(undefined);
                handleSelect
                  ? handleSelect({ maxPrice: undefined })
                  : updateQuery && updateQuery({ maxPrice: undefined });
              }}
            >
              No Max
            </B2>
          </div>
        </div>
      )}
    </div>
  );
}
