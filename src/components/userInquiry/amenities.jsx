import { CloseSVG, TickSVG, ToTheRightArrowSVG } from '@components/shared/Icons';
import setDate from 'date-fns/setDate';
import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { AMENITY_LIST } from '../building/Amenities';
import { useRouter } from 'next/router';
import { removeUndefinedFields } from '@utils/helpers';

function Amenities({
  getData,
  saveData,
  nextStep,
  prevStep,
  sendTrack,
  toast,
  setNextStep,
  updateCompletedSteps,
  stepId,
}) {
  const form = getData();
  const [amenities, setAmenities] = useState(form?.amenities || []);
  const router = useRouter();
  const { query, pathname } = router;
  const [search, setSearch] = useState('');
  const updateQuery = ({ ...newArgs }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };
  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'Amenities' });
  }, []);
  return (
    <div className=" w-full font-circular">
      <div className="relative w-full  border-b h-auto">
        <div className="flex flex-row flex-wrap justify-start">
          {amenities.map((amenity) => (
            <div
              className=" bg-brand font-circular text-white font-bold relative pl-3 my-1 rounded-sm mx-1 pt-1 pr-4"
              style={{ height: '33px' }}>
              {amenity}
              <button
                type="button"
                className="ml-2 outline-none focus:outline-none "
                onClick={(e) => {
                  e.preventDefault();
                  updateQuery({ amenities: amenities.filter((am) => am !== amenity) });
                  setAmenities(amenities.filter((am) => am !== amenity));
                }}>
                <CloseSVG />
              </button>
            </div>
          ))}
          <input
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: '11.5px' }}
            className="w-full outline-none focus:outline-none font-circular"
            placeholder="Search amenities..."
          />
        </div>
      </div>
      <div
        style={{ height: '280px', paddingRight: '11px' }}
        className="overflow-y-scroll  scrollbarrounded mt-4 scrolling-auto">
        {AMENITY_LIST.filter((r) => r.includes(search)).map((amenity) => (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (amenities.includes(amenity)) {
                updateQuery({ amenities: amenities.filter((am) => am !== amenity) });
                setAmenities(amenities.filter((am) => am !== amenity));
              } else {
                updateQuery({ amenities: [...amenities, amenity] });
                setAmenities([...amenities, amenity]);
              }
            }}
            className={`relative w-full outline-none focus:outline-none text-20px font-bold rounded-lg  text-left ${
              amenities.includes(amenity) ? 'border-2 border-brand  text-brand' : 'border border-gray-lighter'
            }  `}
            style={{
              height: '54px',
              marginBottom: '7px',
              marginTop: '7px',
              paddingLeft: '24px',
              paddingTop: '12px',
              paddingBottom: '15px',
              lineHeight: '25px',
            }}>
            <div className=" text-20px font-bold font-circular "> {amenity}</div>
            {amenities.includes(amenity) && (
              <div className=" absolute top-0 right-0" style={{ marginRight: '29px', marginTop: '16px' }}>
                <TickSVG />
              </div>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        style={{ marginTop: '14px' }}
        className="w-full h-15  flex flex-row outline-none focus:outline-none flex-no-wrap rounded font-circular justify-center items-center bg-brand"
        onClick={() => {
          sendTrack('Guided Visit form step', { Step: 'Amenities', data: { amenities } });
          setNextStep('budget', {}, { amenities });
          saveData({ amenities });
          updateCompletedSteps(stepId);
        }}>
        <span className="w-32 font-bold font-circular text-lg text-white">Next step</span>
        <div className=" my-auto font-bold text-lg">
          <ToTheRightArrowSVG />
        </div>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          sendTrack('Skipped Guided Visit form step', { skippedStep: 'Amenities' });
          setNextStep('budget');
          saveData({ amenities });
          updateCompletedSteps(stepId);
        }}
        style={{ marginTop: '14px' }}
        className="w-full bg-white h-14 text-16px font-bold font-circular  text-gray-soft rounded">
        Skip this step
      </button>
    </div>
  );
}

export default Amenities;
