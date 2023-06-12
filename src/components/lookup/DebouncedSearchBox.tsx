import React, { useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { ConnectedComponentClass, SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';

import { SmallText } from '@components/shared/ResponsiveFonts';
import ButtonCta from '@components/shared/ButtonCta';

interface Props extends SearchBoxProvided {
  delay: number;
  onNewBuilding: () => void;
  placeholder?: string;
}

const DebouncedSearchBoxFC: React.FC<Props> = ({
  delay,
  onNewBuilding,
  currentRefinement,
  refine,
  placeholder,
}: Props) => {
  const [value, setValue] = useState(currentRefinement);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const onChangeDebounced = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value: val },
    } = event;
    if (timerId) clearTimeout(timerId);
    setValue(val);
    if (refine) {
      setTimerId(setTimeout(() => refine(val), delay));
    }
  };

  return (
    <div className="block max-w-4xl relative w-full">
      <div
        style={{ maxWidth: '770px' }}
        className="flex flex-row items-center p-2 bg-white border mt-6 md:mt-8 w-full rounded md:bg-offwhite md:border-0">
        <input
          type="search"
          className="flex-1 font-book font-circular opacity-75 bg-transparent outline-none text-16px lg:text-20px 4k:text-40px px-5 w-full"
          style={{
            WebkitAppearance: 'none',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
            borderRadius: '8px',
            backdropFilter: 'blur(50px)',
          }}
          placeholder={placeholder}
          onChange={onChangeDebounced}
          value={value}
        />

        <ButtonCta className="px-4 py-2 md:px-10">Search</ButtonCta>
      </div>
      <p className="pl-4 pt-4 cursor-pointer w-0" onClick={onNewBuilding}>
        <SmallText
          fontSizeClass="text-16px"
          style={{ color: 'rgba(255,255,255,0.7)' }}
          otherClasses="text-center underline absolute right-0 left-0">
          Don&apos;t see the building you&apos;re looking for?
        </SmallText>
      </p>
    </div>
  );
};

const DebouncedSearchBox: ConnectedComponentClass<Props, SearchBoxProvided, SearchBoxExposed> = connectSearchBox(
  DebouncedSearchBoxFC,
);
export default DebouncedSearchBox;
