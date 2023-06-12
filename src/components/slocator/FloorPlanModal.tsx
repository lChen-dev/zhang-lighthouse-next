import { bedName } from '@utils/building-helper';

const FloorPlanModal = ({ setShowFloorPlanModal, activeProperty }: any) => {
  const { floorPlans } = activeProperty;
  const bedroomGroups: any = {};

  floorPlans.forEach((floorPlan: any) => {
    if (!bedroomGroups[floorPlan.bedrooms]) {
      bedroomGroups[floorPlan.bedrooms] = [];
    }
    bedroomGroups[floorPlan.bedrooms].push(floorPlan);
  });

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => setShowFloorPlanModal(false)}
      >
        <div className="relative w-full my-6 mx-auto max-h-full max-w-6xl h" onClick={e => e.stopPropagation()}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">
                {activeProperty.address}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowFloorPlanModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {Object.entries(bedroomGroups).map(([bedroomGroup, floorPlans]: any) => (
                <div>
                  <h4>{bedName(bedroomGroup)}</h4>
                  <hr className="py-2" />
                  <div className="flex flex-wrap">
                    {floorPlans.map((floorPlan: any) => (
                      <div className="flex w-6/12 justify-between p-4">
                        <div>
                          <h5><b>Model {floorPlan.model}</b></h5>
                          <div>From ${floorPlan.minPrice}</div>
                          <div>{floorPlan.bedrooms} bed/{floorPlan.bathrooms} bath</div>
                          <div>{floorPlan.sqFt} sqft</div>
                        </div>
                        <img src={floorPlan.image.src}  className="w-6/12 bg-contain" alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FloorPlanModal;
