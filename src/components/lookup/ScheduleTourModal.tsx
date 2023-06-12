import { PrimaryButton } from '@components/shared/Buttons';
import { numberWithCommas } from '@utils/format';

const ScheduleTourModal = ({ building, setTourNote, doSubmit }: any): React.ReactElement => {
  return (
    <>
      <div className="body font-circular">
        <b className="text-left block text-34px">When’s the best time for you to tour?</b>
        <p className="text-left text-gray-template font-normal block text-16px">
          {building.address} {building.city}
        </p>
        <b className="text-left font-bold block text-18px">{building.propertyName.trim()}</b>
        <div className="py-3">
          <textarea
            onChange={(e) => {
              setTourNote(e.target.value);
            }}
            className="w-full p-2 outline-1"
            style={{
              border: '1px solid rgba(42, 52, 58, 0.13)',
              height: '107px',
              resize: 'none',
            }}
            placeholder="Ex. this weekend, or Thursdays after 4pm"
          />
        </div>
        <div className="w-full flex pt-5 justify-center justify-items-center">
          <PrimaryButton
            onClick={doSubmit}
            BgColorClass="bg-green-bright"
            textColorClass="text-white"
            otherClasses="mx-auto rounded-sm justify-content-center text-20px text-center"
            hoverClass="hover:bg-green"
            height="68px"
            width="405px"
            style={{
              fontStyle: 'normal',
              fontWeight: 500,
              paddingLeft: 0,
              position: 'relative',
            }}
            svgStyle={{
              display: 'block',
              top: 25,
              right: 140,
              position: 'absolute',
            }}
            svgHeight="14px">
            Submit
          </PrimaryButton>
        </div>
        <p className="text-gray-template text-16px px-2 pt-5">
          ${numberWithCommas(building.cashback)} back when you put Lighthouse on your application.
        </p>
      </div>
    </>
  );
};

export default ScheduleTourModal;
