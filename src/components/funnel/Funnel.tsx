/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/router';
import PriceRangeForm from './PriceRangeForm';
import BedroomsForm from './BedroomsForm';
import { getQueryObjectFromSearch } from '../../models/Search';

const STEPS = [{ component: PriceRangeForm }, { component: BedroomsForm }];

export interface OwnProps {}

interface StateProps {
  search: any;
}


/**
 * Steps and values within this funnel are controlled through redux
 * and set using actions. See stores/funnel and actions/funnel
 */
const Funnel = (props: any): React.ReactElement | null => {
  const { nextStepAction, previousStepAction, hideFunnelAction, search } = props || {};
  const { showFunnel, step } = search;

  if (step === undefined || step >= STEPS.length) return null;

  const StepComponent = STEPS[step].component;

  const router = useRouter();

  const handleNext = async () => {
    if (step === STEPS.length - 1) {
      const query = getQueryObjectFromSearch(search) as any;

      await router.push({
        pathname: '/search',
        query,
      });
    } else {
      return nextStepAction();
    }
  };
  const handleBack = () => {
    if (step > 0) return previousStepAction();
    return hideFunnelAction();
  };
  const hideHandler = () => hideFunnelAction();
  return (
    <div className={showFunnel ? 'visible' : 'hidden'}>
      <StepComponent handleNext={handleNext} handleBack={handleBack} hideHandler={hideHandler} />
    </div>
  );
};

export default Funnel;
