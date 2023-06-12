import React, { useContext } from 'react';
import Button from '../ButtonUi';
import { Context } from '../../context/store';
import '../../../../../public/static/assets/css/blog.css';

interface Props {
  categoriesHandler: any;
  tagsHandler: any;
}

/* filter buttons */

const ExploreFilter: React.FC<Props> = ({ categoriesHandler = null, tagsHandler = null }: Props) => {
  const [state, dispatch]: any = useContext(Context);
  return (
    <div className="col-span- xl:col-span-1 mt-3">
      <div className="relative w-full flex items-center justify-left px-3 lg:px-0 mb-3 md:mb-0">
        {state.categoriesFilterClicked ? (
          <Button
            title="Categories"
            selected={false}
            classes="mr-5 "
            buttonWidth="150px"
            onClick={(): any => {
              dispatch({ type: 'SET_CATEGORIESFILTERCLICKED', payload: false });
              dispatch({ type: 'SET_TAGSFILTERCLICKED', payload: false });
            }}
            radius="8px"
            bottomLeftRadius="0px"
            bottomRightRadius="0px"
          />
        ) : (
          <Button
            title="Categories"
            selected={false}
            classes="mr-5"
            buttonWidth="150px"
            onClick={(): any => {
              dispatch({ type: 'SET_CATEGORIESFILTERCLICKED', payload: true });
              dispatch({ type: 'SET_TAGSFILTERCLICKED', payload: false });
            }}
          />
        )}
        {state.categoriesFilterClicked ? categoriesHandler() : null}
        {state.tagsFilterClicked ? (
          <Button
            title="Tags"
            selected={false}
            classes="mr-5 "
            buttonWidth="150px"
            onClick={(): any => {
              dispatch({ type: 'SET_TAGSFILTERCLICKED', payload: false });
              dispatch({ type: 'SET_CATEGORIESFILTERCLICKED', payload: false });
            }}
            radius="8px"
            bottomLeftRadius="0px"
            bottomRightRadius="0px"
          />
        ) : (
          <Button
            title="Tags"
            selected={false}
            classes="mr-5"
            buttonWidth="150px"
            onClick={(): any => {
              dispatch({ type: 'SET_TAGSFILTERCLICKED', payload: true });
              dispatch({ type: 'SET_CATEGORIESFILTERCLICKED', payload: false });
            }}
          />
        )}
        {state.tagsFilterClicked ? tagsHandler() : null}
      </div>
    </div>
  );
};

export default ExploreFilter;
