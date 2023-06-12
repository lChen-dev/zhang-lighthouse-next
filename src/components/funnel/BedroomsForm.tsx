import Modal from '../index/Modal';
import 'rc-slider/assets/index.css';


export interface OwnProps {
  handleNext: () => void;
  handleBack: () => void;
  hideHandler: () => void;
}

const BedroomsForm = (props: any): React.ReactElement => {
  const { search, handleNext, handleBack, hideHandler } = props || {};

  const { bedrooms } = search;

  const toggleBedroomAction = (bedroom: number) => {
    // const newBedrooms = produce(bedrooms, (draft: number[]) => {
    //   if (draft.includes(bedroom)) {
    //     draft = draft.filter((e) => e !== bedroom);
    //   } else {
    //     draft.push(bedroom);
    //   }
    // });
    // setBedroomsAction(newBedrooms);
  };

  return (
    <Modal hideHandler={hideHandler}>
      <div className="px-6 py-6 bg-white rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16">
        <div>
          <h2 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
            How many bedrooms?
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-900">
            Please select the number of bedrooms you are looking for.
          </p>
        </div>
        <div className="mt-8 sm:w-full sm:max-w-md flex flex-row content-center">
          <button
            onClick={() => toggleBedroomAction(0)}
            type="button"
            className={`${
              bedrooms && bedrooms.includes(0)
                ? 'bg-indigo-500  text-white hover:bg-indigo-400 border-l-0 border-r-0'
                : ' bg-white text-gray-700 hover:text-gray-500'
            } flex items-center px-4 py-2 rounded-l-md border border-gray-300  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
          >
            Studio
          </button>
          <button
            onClick={() => toggleBedroomAction(1)}
            type="button"
            className={`-ml-px ${
              bedrooms && bedrooms.includes(1)
                ? 'bg-indigo-500  text-white hover:bg-indigo-400 border-l-0 border-r-0'
                : ' bg-white text-gray-700 hover:text-gray-500'
            } flex items-center px-4 py-2 border border-gray-300  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
          >
            1
          </button>
          <button
            onClick={() => toggleBedroomAction(2)}
            type="button"
            className={`-ml-px ${
              bedrooms && bedrooms.includes(2)
                ? 'bg-indigo-500  text-white hover:bg-indigo-400 border-l-0 border-r-0'
                : ' bg-white text-gray-700 hover:text-gray-500'
            } flex items-center px-4 py-2 border border-gray-300  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
          >
            2
          </button>
          <button
            onClick={() => toggleBedroomAction(3)}
            type="button"
            className={`-ml-px ${
              bedrooms && bedrooms.includes(3)
                ? 'bg-indigo-500  text-white hover:bg-indigo-400 border-l-0 border-r-0'
                : ' bg-white text-gray-700 hover:text-gray-500'
            } flex items-center px-4 py-2 border border-gray-300  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
          >
            3
          </button>
          <button
            onClick={() => toggleBedroomAction(4)}
            type="button"
            className={`-ml-px ${
              bedrooms && bedrooms.includes(4)
                ? 'bg-indigo-500  text-white hover:bg-indigo-400 border-l-0 border-r-0'
                : ' bg-white text-gray-700 hover:text-gray-500'
            } flex items-center px-4 py-2 border border-gray-300  text-sm leading-5 font-medium   focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
          >
            4+
          </button>
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

export default BedroomsForm;
