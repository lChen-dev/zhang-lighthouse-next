import { PrimaryButton } from '@components/shared/Buttons';
import { numberWithCommas } from '@utils/format';

const AppConfirmationModal = ({ building, doSubmit }: any): React.ReactElement => {
  return (
    <>
      <div className="body font-circular">
        <b className="text-left block text-34px">Are you sure you want to apply?</b>
        <p className="text-left text-gray-template font-normal block text-16px">
          Lighthouse will send your information to
          <b className="text-left font-bold block text-18px">{building.propertyName.trim()}</b>
        </p>

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
            svgHeight="14px"
          >
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

export default AppConfirmationModal;
