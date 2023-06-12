import NumberFormat from 'react-number-format';

import Slider from 'rc-slider';
import Modal from '../index/Modal';
import 'rc-slider/assets/index.css';

export interface OwnProps {
  handleNext: () => void;
  hideHandler: () => void;
  handleBack: () => void;
}

const PriceRangeForm = (props: any): React.ReactElement => {
  const { search, setMaxPriceAction, handleNext, handleBack, hideHandler } = props || {};
  const { maxPrice } = search;

  return (
    <Modal hideHandler={hideHandler}>
      <div className="px-6 py-6 bg-white rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16">
        <div>
          <h2 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
            Almost there!
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-900">
            Please select your price range
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md">
          <span className="inline-flex items-center self-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-purple-100 text-purple-800">
            <NumberFormat
              value={maxPrice}
              displayType="text"
              thousandSeparator
              prefix="$"
              renderText={(value): string => `${value} or less`}
            />
          </span>
          <Slider
            value={maxPrice}
            onChange={setMaxPriceAction}
            min={0}
            max={10000}
            step={250}
          />
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
            <button
              onClick={handleNext}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Next
            </button>
          </span>
          <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
            <button
              onClick={handleBack}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Back
            </button>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default PriceRangeForm;
