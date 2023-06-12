import React, { FC } from 'react';
import { SelectClearIcon } from '@components/shared/Icons';

type Props = {
  handleClick: () => void;
};

const SelectClearBtn: FC<Props> = ({ handleClick }) => {
  return (
    <span
      className="cursor-pointer select-clear"
      style={{ position: 'absolute', right: '45px', top: '50%', transform: 'translateY(-50%)' }}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <SelectClearIcon />
    </span>
  );
};

export default SelectClearBtn;
