import { Checkbox } from '@components/shared';
import { PrimaryButton } from '@components/shared/Buttons';
import { numberWithCommas } from '@utils/format';

const RequestAgentModal = ({
  data,
  building,
  setValue,
  trigger,
  getValues,
  formIsFilled,
  doSubmit,
}: any): React.ReactElement => {
  return (
    <>
      <div className="body font-circular">
        <b className="text-left font-bold block text-36px">What’s the best way to contact you?</b>
        <b className="text-left font-bold block text-18px">{building.propertyName.trim()}</b>
        <p className="text-left text-gray-template font-normal block text-16px">
          {building.address} {building.city}
        </p>
        <label className="font-circular text-lg mb-4" htmlFor="addOpts[]">
          <ul className="list-none block">
            <li className="block w-full">
              <div className="flex w-full pt-5">
                <Checkbox
                  name="addOpts[]"
                  label={`Email at ${(data.email || '').trim()}`}
                  outlineColor="#C0D4D4"
                  hoverColor="#C0D4D4"
                  value={getValues().contactByEmail}
                  onChange={(checked) => {
                    setValue('contactByEmail', checked);
                    trigger('contactByEmail');
                  }}
                />
              </div>
            </li>
            <li className="block w-full">
              <div className="flex w-full pt-5">
                <Checkbox
                  name="addOpts[]"
                  label={`Phone call at ${(data.phone || '').trim()}`}
                  outlineColor="#C0D4D4"
                  hoverColor="#C0D4D4"
                  value={getValues().contactByCall}
                  onChange={(checked) => {
                    setValue('contactByCall', checked);
                    trigger('contactByCall');
                  }}
                />
              </div>
            </li>
            <li className="block w-full">
              <div className="flex w-full pt-5">
                <Checkbox
                  name="addOpts[]"
                  label={`Text at ${(data.phone || '').trim()}`}
                  outlineColor="#C0D4D4"
                  hoverColor="#C0D4D4"
                  value={getValues().contactBySMS}
                  onChange={(checked) => {
                    setValue('contactBySMS', checked);
                    trigger('contactBySMS');
                  }}
                />
              </div>
            </li>
          </ul>
        </label>
        <div className="w-full flex pt-5 justify-center justify-items-center">
          <PrimaryButton
            onClick={formIsFilled ? doSubmit : null}
            BgColorClass={`${formIsFilled ? 'bg-green-bright' : 'bg-gray'}`}
            textColorClass="text-white"
            otherClasses="mx-auto rounded-sm justify-content-center text-20px text-center"
            hoverClass={`${formIsFilled ? 'hover:bg-green' : 'hover:bg-gray-light'}`}
            height="68px"
            width="405px"
            style={{
              cursor: !formIsFilled ? 'not-allowed' : 'pointer',
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

export default RequestAgentModal;
