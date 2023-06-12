import ReactTooltip from 'react-tooltip';
import { useState } from 'react';

const PERSONAL_CONTENTS_ALLOWED_VALUES = [10000, 15000, 20000, 25000, 30000, 35000, 40000];
const PERSONAL_LIABILITY_ALLOWED_VALUES = [25000, 50000, 100000, 300000];
const DEDUCTIBLE_ALLOWED_VALUES = [250, 500, 1000];

export default function CorePolicyModal({ currentPolicy, policyChanges, saveData, display, setDisplay }) {
  const { personalContents, personalLiability, deductible } = currentPolicy;

  const changeValue = (operation, state) => {
    let ALLOWED_VALUES = [];
    let currentValue;
    if (state === 'personalContents') {
      ALLOWED_VALUES = PERSONAL_CONTENTS_ALLOWED_VALUES;
      currentValue = policyChanges?.personalContents || personalContents;
    } else if (state === 'personalLiability') {
      ALLOWED_VALUES = PERSONAL_LIABILITY_ALLOWED_VALUES;
      currentValue = policyChanges?.personalLiability || personalLiability;
    } else if (state === 'deductible') {
      ALLOWED_VALUES = DEDUCTIBLE_ALLOWED_VALUES;
      currentValue = policyChanges?.deductible || deductible;
    }

    const currentIndex = ALLOWED_VALUES.indexOf(currentValue);
    let newIndex;

    if (operation === 'subtract') {
      newIndex = currentIndex - 1;
      if (newIndex < 0) return;
    } else if (operation === 'add') {
      newIndex = currentIndex + 1;
      if (newIndex === ALLOWED_VALUES.length) return;
    }

    const newChanges = { [state]: ALLOWED_VALUES[newIndex] };
    const previousPolicyChanges = policyChanges || {};

    saveData({ corePolicies: { ...previousPolicyChanges, ...newChanges } });
  };

  function formatAmount(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const closeModal = () => {
    setDisplay('none');
  };

  return (
    <div className="o-modal-screen o-dashboard-modal-screen" style={{ display }} onClick={closeModal}>
      <ReactTooltip className="o-tooltip-theme" />
      <div
        className="o-dashboard-modal-contents  o-dashboard-modal-contents--wide"
        onClick={(e) => e.stopPropagation()}>
        <div className="o-modal-container o-dashboard-modal-container">
          <div className="l-core-policy-container">
            <h2>
              Personal Property{' '}
              <img
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="Personal Property covers sudden direct accidental physical loss or damage to covered property owned by or rented"
                data-effect="solid"
              />
            </h2>
            <p>
              Most apartments require at least $10,000. Covers property you own or rent. We suggest you purchase enough
              to cover the full value of everything you own.
            </p>
            <div className="o-incrementer">
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'subtract', 'personalContents')}>
                <img src="/static/assets/Icons/minus.svg" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span>{' '}
                {formatAmount(policyChanges?.personalContents || personalContents)}
              </div>
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'add', 'personalContents')}>
                <img src="/static/assets/Icons/plus.svg" />
              </button>
            </div>
          </div>
          <div className="l-core-policy-container">
            <h2>
              Personal Liability{' '}
              <img
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="Personal Liability covers damages for bodily injury or property damage caused by an occurrence covered by this policy for which an insured becomes legally liable."
                data-effect="solid"
              />
            </h2>
            <p>
              Most apartments require approximately $100,000. Covers your liabilities that arise from bodily injury or
              property damage.
            </p>
            <div className="o-incrementer">
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'subtract', 'personalLiability')}>
                <img src="/static/assets/Icons/minus.svg" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span>{' '}
                {formatAmount(policyChanges?.personalLiability || personalLiability)}
              </div>
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'add', 'personalLiability')}>
                <img src="/static/assets/Icons/plus.svg" />
              </button>
            </div>
          </div>
          <div className="l-core-policy-container">
            <h2>
              Deductible{' '}
              <img
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-tip="You will receive payments for loss to covered property only when it exceeds the applicable deductible."
                data-effect="solid"
              />
            </h2>
            <p>
              The deductible is the amount you must pay out of pocket before receiving reimbursement for a claim. A
              lower deductible will increase the price of your policy but means you will pay less out of pocket in the
              event of a claim.
            </p>
            <div className="o-incrementer">
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'subtract', 'deductible')}>
                <img src="/static/assets/Icons/minus.svg" />
              </button>
              <div className="o-incrementer__amount">
                <span className="o-incrementer__dollar-sign">$</span>{' '}
                {formatAmount(policyChanges?.deductible || deductible)}
              </div>
              <button className="o-incrementer__btn" onClick={changeValue.bind(this, 'add', 'deductible')}>
                <img src="/static/assets/Icons/plus.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
