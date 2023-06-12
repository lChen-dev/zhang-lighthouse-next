/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
export const labelStatus = (status = 0, hide = false) => {
  const REWARD_STATUS = {
    PAID: 1,
    SCHEDULED: 2,
    PENDING: 3,
    PROCESSING: 0,
  };
  let clsName = '';
  let text = '';

  if (status === REWARD_STATUS.PROCESSING) {
    clsName = 'bg-gray-400';
    text = 'Processing';
  }
  if (status === REWARD_STATUS.PAID) {
    clsName = 'bg-green-400 ';
    text = 'Paid';
  }
  if (status === REWARD_STATUS.SCHEDULED) {
    clsName = 'bg-gray-400 ';
    text = 'Scheduled';
  }
  if (status === REWARD_STATUS.PENDING) {
    clsName = 'bg-yellow-300 ';
    text = 'Pending';
  }
  if (hide) {
    clsName = '';
    text = '';
  }
  return { clsName, text };
};
