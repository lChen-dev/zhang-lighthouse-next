import 'rheostat/initialize';
import { useRouter } from 'next/router';
import Rheostat from 'rheostat';

import './rheostat.css';
import { useEffect, useState } from 'react';
import { Checkbox, LoadingSpinner } from '@components/shared';
import { unAuthedbackendApi } from '@utils/http';
import { ResetDarkSVG, ResetSVG, ToTheRightArrowSVG } from '@components/shared/Icons';
import { removeUndefinedFields } from '@utils/helpers';

const STEP = 100;

const Histogramme = ({
  getData,
  saveData,
  nextStep,
  prevStep,
  sendTrack,
  toast,
  setNextStep,
  updateCompletedSteps,
  stepId,
}) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { budget } = getData();
  const [values, setValues] = useState(budget || [0, 6000]);
  const [boundaries, setBoundaries] = useState([0, 6000]);
  const [count, setCount] = useState([]);
  const [priceApplied, setPriceApplied] = useState(false);
  const [budgetDefined, setBudgetDefined] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const updateQuery = ({ ...newArgs }) => {
    const newQuery = { ...query, ...newArgs };
    removeUndefinedFields(newQuery);
    router.replace({
      pathname,
      query: newQuery,
    });
  };
  useEffect(() => {
    sendTrack('Guided Visit form step loaded', { Step: 'Budget' });
    (async () => {
      let flatenedMinPrices = [];
      let flatenedMaxPrices = [];
      let counts = [];
      const results = (
        await unAuthedbackendApi.get(
          `properties/search?ne[0]=-96.7732914016786&ne[1]=32.833682945233946&sw[0]=-96.8271280355464&sw[1]=32.738652498403574&fields=id%2Cname%2CpropertyPhotos%2Cfloorplan%2Ccity%2Czip%2Cstate%2Ccashback%2Caddress%2Cwebsite%2Ccoordinates%2CminRent%2CnanoId` /*  `properties/search?${qs.stringify(query)}` */,
          { timeout: 60000 }
        )
      ).data?.properties;
      try {
        for (const building of results) {
          for (const floorPlan of building.floorplan) {
            flatenedMaxPrices = [...flatenedMaxPrices, Math.ceil(floorPlan.maxRent / STEP) * STEP];
            flatenedMinPrices = [...flatenedMinPrices, Math.ceil(floorPlan.minRent / STEP) * STEP];
          }
        }
        const min = Math.floor(Math.min(...flatenedMinPrices) / STEP);
        counts = [
          ...Array(Math.ceil((Math.max(...flatenedMaxPrices) - Math.min(...flatenedMinPrices)) / STEP)).keys(),
        ].map((i) => {
          return { value: (i + 1 + min) * STEP, count: 0 };
        });
        flatenedMaxPrices.map((price) => {
          const index = counts.findIndex((i) => price === i?.value);
          if (index >= 0) {
            counts[index] = { ...counts[index], count: counts[index].count + 1 };
          } else {
            counts = [...counts, { value: price, count: 1 }];
          }
        });
        flatenedMinPrices.map((price) => {
          const index = counts.findIndex((i) => price === i?.value);
          if (index >= 0) {
            counts[index].count = 1 + counts[index].count;
          } else {
            counts = [...counts, { value: price, count: 1 }];
          }
        });
        let sum = 0;
        let target = -1;
        counts.map((i, ind) => {
          sum += i.count;

          if (sum > Math.ceil(((flatenedMaxPrices.length + flatenedMinPrices.length) * 90) / 100) && target === -1) {
            target = ind;
          }
        });

        counts = [
          ...counts.filter((i, ind) => ind < target),
          {
            value: counts[target].value,
            count: counts
              .filter((i, ind) => ind < target - 1)
              .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
          },
        ];
        if (counts.length > target) setBoundaries([counts[0].value, counts[target].value]);
        if (counts.length > target && !budget) setValues([counts[0].value, counts[target].value]);
        setCount(counts);
      } catch (e) {}
    })();
  }, []);
  function PitComponent({ style, children }) {
    const countPit = count.find((c) => children === c.value)?.count || 0;
    const height = Math.round(countPit * 2);
    return (
      <div
        style={{
          ...style,
          background: children >= values[0] && children <= values[1] ? '#34966D' : '#E8E8E8',
          borderTopRightRadius: 2,
          borderTopLeftRadius: 2,
          width: 6,
          marginLeft: 1,
          marginRight: 1,
          height: height,
          bottom: 0,
        }}
      />
    );
  }
  const onChangeMin = (e) => {
    let num = e.target.value.replace('$', '').replace('+', '');
    let isValid = true;
    let newNum;
    try {
      newNum = parseInt(num);
      if (newNum > boundaries[1] || Number.isNaN(newNum) || newNum < 0) isValid = false;
    } catch (error) {
      isValid = false;
    }
    if (isValid) {
      setPriceApplied(true);
      updateQuery({ minPrice: newNum });
      setValues([newNum, values[1]]);
    }
    if (Number.isNaN(newNum) || newNum < 0) {
      setPriceApplied(true);
      updateQuery({ minPrice: undefined });
      setValues([0, values[1]]);
    }
  };
  const onChangeMax = (e) => {
    let num = e.target.value.replace('$', '').replace('+', '');
    let isValid = true;
    let newNum;
    try {
      newNum = parseInt(num);
      if (newNum > boundaries[1] || Number.isNaN(newNum)) isValid = false;
    } catch (error) {
      isValid = false;
    }
    if (isValid) {
      setPriceApplied(true);
      updateQuery({ maxPrice: newNum });
      setValues([values[0], newNum]);
    }
    if (!isValid && Number.isNaN(newNum)) {
      setPriceApplied(true);
      updateQuery({ maxPrice: undefined });
      setValues([values[0], 0]);
    }
    if (newNum > boundaries[1]) {
      setPriceApplied(true);
      updateQuery({ maxPrice: boundaries[1] });
      setValues([values[0], boundaries[1]]);
    }
  };
  return (
    <div className=" w-full  -mt-8 font-circular">
      {!budgetDefined && (
        <>
          <div className="w-full mb-40 text-gray-medium  text-18px font-normal font-circular">
            📣 Tip: Many apartments require pre-tax monthly income to be "3 times rent."
          </div>
          {!count.length > 0 && (
            <div className="w-full">
              <div className="m-auto w-8">
                <LoadingSpinner color="#34966D" />
              </div>
            </div>
          )}
          {count.length > 0 && (
            <>
              <Rheostat
                className="w-full"
                min={boundaries[0]}
                max={boundaries[1]}
                values={values}
                pitComponent={PitComponent}
                pitPoints={
                  count.map((count) => count.value).sort((a, b) => a - b) /* ranges?.map((i) => i.min) */ || []
                }
                onValuesUpdated={(e) => {
                  setPriceApplied(true);
                  updateQuery({
                    minPrice: e.values[0] > boundaries[0] ? e.values[0] : undefined,
                    maxPrice: e.values[1] < boundaries[1] ? e.values[1] : undefined,
                  });
                  setValues(e.values);
                }}
                snap={true}
                progressBar={false}
                snapPoints={
                  count.map((count) => count.value).sort((a, b) => a - b) /* ranges?.map((i) => i.min) */ || []
                }
              />
              <div className="flex flex-row w-full  justify-between  mt-10 pb-2">
                <div className="w-162px border-b flex flex-row justify-between">
                  <div className="justify-self-start  text-20px text-gray-medium  font-circular">from</div>

                  <input
                    className="w-full inline-block font-circular text-right justify-self-end text-gray-blue font-bold text-20  outline-none focus:outline-none"
                    value={`$${values[0]}`}
                    onChange={onChangeMin}
                  />
                </div>
                <div className="w-162px border-b flex flex-row justify-between">
                  <div className="justify-self-start text-20px font-circular text-gray-medium">to</div>

                  <input
                    className="w-full inline-block text-right font-circular justify-self-end text-gray-blue font-bold text-20 outline-none focus:outline-none"
                    value={`${values[1] === boundaries[1] ? '+' : ''}$${values[1]}`}
                    onChange={onChangeMax}
                  />
                </div>
              </div>
            </>
          )}

          {priceApplied && (
            <button
              type="button"
              style={{ marginTop: '14px' }}
              className={`w-full font-bold font-circular text-lg text-white h-15 outline-none focus:outline-none rounded  bg-brand`}
              onClick={(e) => {
                e.preventDefault();
                saveData({ budget: values });
                setBudgetDefined(true);
              }}>
              <span className="text-white">Apply this price</span>
            </button>
          )}
          {priceApplied && (
            <button
              type="button"
              style={{ marginTop: '14px' }}
              className="w-full font-bold relative font-circular text-lg  h-15 outline-none focus:outline-none rounded  "
              onClick={(e) => {
                e.preventDefault();
                setValues(boundaries);
              }}>
              <span className="text-gray-medium">Reset budget</span>
              <div className="absolute top-0 mt-5" style={{ marginLeft: '6.05rem' }}>
                <ResetSVG />
              </div>
            </button>
          )}
        </>
      )}
      {budgetDefined && (
        <>
          <div
            style={{ height: 'auto', marginTop: '3.5rem' }}
            className="w-full  relative align-middle rounded border border-gray-light">
            <div
              className="align-middle mt-4 ml-6 mb-4  font-circular text-16px font-normal pr-10"
              style={{ lineHeight: '25px' }}>
              Your budget is from <span className=" font-bold text-gray-blue text-20px">$800</span> to{' '}
              <span className=" font-bold text-gray-blue text-20px">$1,200</span>
            </div>
            <div className="h-full absolute top-0 right-0 my-auto flex">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setScenarios([]);
                  setBudgetDefined(false);
                }}
                className="outline-none  focus:outline-none my-auto content-center"
                style={{ marginRight: '24px' }}>
                <ResetDarkSVG />
              </button>
            </div>
          </div>
          <div className="text-18px text-gray-medium mt-12 mb-px font-circular font-normal">
            Do any of these apply to you? (Optional)
          </div>
          <div className="text-14px text-gray-soft mt-px ">
            Don't worry. Our apartment network is friendly to various backgrounds.
          </div>
          {[
            'Rental History: Broken Leases, Evictions, Unpaid Balances Key',
            'Credit Score below 550, or No Credit History',
            'Gross Income below $2,100 per month',
            'Financial Past: Bankruptcies, Foreclosures',
            'Background Issues: Misdemeanors, Felonies',
          ].map((situation) => (
            <button
              type="button"
              style={{ paddingLeft: '28px', marginTop: '24px' }}
              onClick={(e) => {
                e.preventDefault();
                setScenarios([
                  ...(scenarios.includes(situation)
                    ? scenarios.filter((sc) => sc !== situation)
                    : [...scenarios, situation]),
                ]);
              }}
              className="outline-none w-full mbp:w-368px  relative focus:outline-none text-left text-16px font-normal font-circular  text-gray-blue">
              <div className="absolute top 0   h-full flex  flex-col justify-center" style={{ marginLeft: '-28px' }}>
                <Checkbox
                  key={situation}
                  name="addOpts[]"
                  outlineColor="#e0e2e2"
                  hoverColor="#C0D4D4"
                  value={scenarios.includes(situation)}
                  className="mb-2 w-8 noFlex flex-none font-circular  "
                />
              </div>
              {situation}
            </button>
          ))}
          <button
            type="button"
            style={{ marginTop: '41px' }}
            className="w-full h-15 mb-5 flex flex-row outline-none focus:outline-none flex-no-wrap rounded font-circular justify-center items-center bg-brand"
            onClick={() => {
              sendTrack('Guided Visit form step', {
                Step: 'Budget',
                data: { budget: values, budgetscenarios: scenarios },
              });
              setNextStep('calendar');
              saveData({ budgetscenarios: scenarios });
              updateCompletedSteps(stepId);
            }}>
            <span className="w-32 font-bold font-circular text-lg text-white">Next step</span>
            <div className=" my-auto font-bold text-lg">
              <ToTheRightArrowSVG />
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default Histogramme;
