import Router from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Head from 'next/head';
import ReactTooltip from 'react-tooltip';
import { LoadingSpinner } from '@components/shared';
import { toast } from 'react-toastify';
import { validate } from 'email-validator';
import { sendTrack } from '@utils/analytics';

const VALUABLE_ITEMS = [
  {
    label: 'Cameras',
    value: 'cameras',
    iconPath: '/static/assets/Icons/cameras.svg',
  },
  {
    label: 'Jewelry',
    value: 'jewelry',
    iconPath: '/static/assets/Icons/jewelry.svg',
  },
  {
    label: 'Bikes',
    value: 'bicycles',
    iconPath: '/static/assets/Icons/bicycles.svg',
  },
  {
    label: 'Fine Arts',
    value: 'fine_arts',
    iconPath: '/static/assets/Icons/fine_arts.svg',
  },
  {
    label: 'Trading Cards',
    value: 'trading_cards',
    iconPath: '/static/assets/Icons/trading_cards.svg',
  },
  {
    label: 'Golf Equipment',
    value: 'golf_equipment',
    iconPath: '/static/assets/Icons/golf_equipment.svg',
  },
  {
    label: 'Coin Collection',
    value: 'coin_collection',
    iconPath: '/static/assets/Icons/coin_collection.svg',
  },
  {
    label: 'Stamp Collection',
    value: 'stamp_collection',
    iconPath: '/static/assets/Icons/stamp_collection.svg',
  },
  {
    label: 'Musical Instruments',
    value: 'musical_instruments',
    iconPath: '/static/assets/Icons/musical_instruments.svg', // TODO: Need new svg for this
  },
  {
    label: 'Silverware & Goldware',
    value: 'silverware_and_goldware',
    iconPath: '/static/assets/Icons/furnished_property.svg', //TODO: Replace with silverware icon
  },
  {
    label: 'Firearms',
    value: 'guns',
    iconPath: '/static/assets/Icons/guns.svg',
  },
];

export default function FinalSteps({ formData, saveData, stepPath, nextStep, previousStep, quote }) {

  const [valuableItems, setValuableItems] = useState(formData?.valuableItems || {});
  const [significantOthers, setSignificantOthers] = useState(formData?.significantOthers || {});
  const [focusedValuableItem, setFocusedValuableItem] = useState({ label: '', value: '', iconPath: '', limit: '' });
  const [focusedSignificantOther, setFocusedSignificantOther] = useState({ firstName: '', lastName: '', email: '' });
  const [valuableItemsActiveStep, setValuableItemsActiveStep] = useState(0);
  const [significantOthersActiveStep, setSignificantOthersActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'finalSteps',
      version: 1,
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);

    saveData({ valuableItems, significantOthers }).then((e) => {
      setIsLoading(false);
    });
  }, [valuableItems, significantOthers]);

  const onSubmit = (e) => {
    e.preventDefault();

    sendTrack('InsuranceFormPage', {
      category: 'insurance',
      label: 'InsuranceFormPage',
      action: 'InsuranceFormPage',
      page: 'finalSteps',
      questions: ['valuableItems', 'significantOthers'],
      valuableItems,
      significantOthers,
      focusedValuableItem,
      focusedSignificantOther,
      valuableItemsActiveStep,
      significantOthersActiveStep,
      version: 1,
    });

    nextStep();
  };

  const changeValue = (e) => {
    setFocusedValuableItem({ ...focusedValuableItem, limit: parseInt(e.target.value, 10) });
  };

  function formatAmount(x = 10000) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const changeItemType = (item) => {
    setFocusedValuableItem({ ...focusedValuableItem, ...item });
  };

  const addItem = (e) => {
    e.preventDefault();
    setValuableItems({ ...valuableItems, ...{ [focusedValuableItem.value]: focusedValuableItem } });
    setFocusedValuableItem({ label: '', value: '', limit: '' });
    moveToValuableItemsStep(1);
  };

  const addSignificant = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector('#significant-other__first-name').value;
    const lastName = e.target.querySelector('#significant-other__last-name').value;
    const email = e.target.querySelector('#significant-other__email').value;
    if (!email || !validate(email)) {
      toast.error('email is required');
      return;
    }
    const newSignificantOthers = {
      ...significantOthers,
      [email]: {
        firstName,
        lastName,
        email,
      },
    };
    setSignificantOthers(newSignificantOthers);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
    moveToSignificantOthersStep(0);
  };

  const editSignificant = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector('#significant-other__first-name--edit').value;
    const lastName = e.target.querySelector('#significant-other__last-name--edit').value;
    const email = e.target.querySelector('#significant-other__email--edit').value;
    if (!email || !validate(email)) {
      toast.error('email is required');
      return;
    }
    const newSignificantOthers = {
      ...significantOthers,
      [email]: {
        firstName,
        lastName,
        email,
      },
    };
    setSignificantOthers(newSignificantOthers);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
    moveToSignificantOthersStep(0);
  };

  const goToEditItemStep = (item) => {
    setFocusedValuableItem(item);
    moveToValuableItemsStep(3);
  };

  const goToEditSignificantOtherStep = (significantOther) => {
    moveToSignificantOthersStep(2);
    setFocusedSignificantOther(significantOther);
  };

  const removeItem = () => {
    const { value } = focusedValuableItem;
    const newValuableItems = { ...valuableItems };
    delete newValuableItems[value];

    setValuableItems(newValuableItems);
    moveToValuableItemsStep(1);
  };

  const removeSignificant = () => {
    const { email, firstName, lastName } = focusedSignificantOther;
    const newSignificantOthers = { ...significantOthers };
    delete newSignificantOthers[email];
    delete newSignificantOthers[''];
    delete newSignificantOthers[`${firstName} ${lastName}`];

    setSignificantOthers(newSignificantOthers);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
    moveToSignificantOthersStep(0);
    // eslint-disable-next-line no-param-reassign
    formData.significantOthers = {};
  };

  const moveToValuableItemsStep = (step) => {
    setValuableItemsActiveStep(step);
  };

  const moveToSignificantOthersStep = (step) => {
    setSignificantOthersActiveStep(step);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
  };

  const valuableItemsArray = Object.values(valuableItems);
  const significantOthersArray = Object.values(significantOthers);

  let newMax = 10000;
  let totalValue = 0;
  valuableItemsArray.forEach((item) => {
    newMax -= item.limit;
    totalValue += item.limit;
  });

  return (
    <div>
      <ReactTooltip className="o-tooltip-theme" />
      <Head>
        <title>Final Steps. Dotting i's and crossing t's. | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header">
        <h1>Final Steps</h1>
      </div>
      <div>
        <div className="l-final-steps">
          <div className="o-card">
            <div style={{ display: valuableItemsActiveStep === 0 ? 'block' : 'none' }}>
              <h2>
                Valuable Items{' '}
                <img
                  alt="circle"
                  className="o-info-circle"
                  src="/static/assets/Icons/info_circle.svg"
                  data-effect="solid"
                  data-tip="Some items have specific coverage limits. These have to be listed separately to be fully covered by sudden direct accidental physical loss or damage."
                />
              </h2>
              <p>
                Additional coverage on your most valued items. Standard personal property allows for $500 coverage for
                specific items like bikes, jewelry, and cameras.{' '}
                <b>Adding items here is not required here and your standard phone and computer are covered normally.</b>
              </p>
              <div className="o-confirmed-items">
                {valuableItemsArray.map((item) => {
                  return (
                    <button
                      type="button"
                      key={`item-${item.value}`}
                      className="o-valuable-item-btn"
                      onClick={goToEditItemStep.bind(this, item)}
                    >
                      <img src={item.iconPath} alt="iconpath" />
                    </button>
                  );
                })}
              </div>
              <button className="o-card__add-button" type="button" onClick={moveToValuableItemsStep.bind(this, 1)}>
                <img src="/static/assets/Icons/plus_mini.svg" alt="plusmini" /> Add items
              </button>
            </div>
            <div style={{ display: valuableItemsActiveStep === 1 ? 'block' : 'none' }}>
              <button className="o-card__back-button" type="button" onClick={moveToValuableItemsStep.bind(this, 0)}>
                <img src="/static/assets/Icons/arrow_left_alt.svg" alt="arrowleft" />
              </button>
              <h2 className="o-card__secondary-headline">+ Add Valuable</h2>
              <p>
                <b>Total value*:</b> ${formatAmount(totalValue)} <br />
                <div className="mt-4 text-sm">*Must not exceed $10,000</div>
              </p>
              <div className="o-valuable-items-container">
                {valuableItemsArray.map((item) => {
                  return (
                    <button
                      type="button"
                      key={`item-${item.value}`}
                      className="o-valuable-item-btn"
                      onClick={goToEditItemStep.bind(this, item)}
                    >
                      <img src={item.iconPath} alt="iconpath" />
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="o-valuable-item-btn o-valuable-item-o-btn--add"
                  onClick={moveToValuableItemsStep.bind(this, 2)}
                  disabled={totalValue >= 10000}
                  style={{
                    cursor: totalValue >= 10000 ? 'not-allowed' : 'pointer',
                  }}
                  title={totalValue >= 10000 ? 'Total value has reached $10,000' : ''}
                >
                  <img src="/static/assets/Icons/plus.svg" alt="plus" />
                </button>
              </div>
            </div>
            <div style={{ display: valuableItemsActiveStep === 2 ? 'block' : 'none' }}>
              <button className="o-card__back-button" type="button" onClick={moveToValuableItemsStep.bind(this, 1)}>
                <img src="/static/assets/Icons/arrow_left_alt.svg" alt="arrowleft" />
              </button>
              <h2 className="o-card__secondary-headline">+ Add Valuable</h2>
              <div>
                <form onSubmit={addItem}>
                  <label className="o-text-input__label">Type</label>
                  <Select
                    value={focusedValuableItem}
                    onChange={changeItemType}
                    options={VALUABLE_ITEMS}
                    className="o-valuable-item-select"
                  />
                  <fieldset className="o-fieldset">
                    <label className="o-text-input__label">Estimated Value (multiples of 100)</label>
                    <input
                      className="o-text-input"
                      type="number"
                      placeholder="Enter value"
                      id="valuable-item__estimated-value"
                      step="100"
                      min="100"
                      max={newMax}
                      required
                      onChange={changeValue}
                      value={focusedValuableItem.limit}
                    />
                  </fieldset>
                  <button className="o-btn o-btn--primary o-card__add-item-button" type="submit">
                    <img src="/static/assets/Icons/plus_white.svg" alt="pluswhite" />
                    Add Item
                  </button>
                </form>
              </div>
            </div>
            <div style={{ display: valuableItemsActiveStep === 3 ? 'block' : 'none' }}>
              <button className="o-card__back-button" type="button" onClick={moveToValuableItemsStep.bind(this, 1)}>
                <img src="/static/assets/Icons/arrow_left_alt.svg" alt="arrowleft" />
              </button>
              <h2 className="o-card__secondary-headline">+ Edit Valuable: {focusedValuableItem.label}</h2>
              <div>
                <form onSubmit={addItem}>
                  <fieldset className="o-fieldset">
                    <label className="o-text-input__label">Estimated Value (multiples of 100)</label>
                    <input
                      className="o-text-input"
                      type="number"
                      placeholder="Enter value"
                      id="valuable-item__estimated-value"
                      step="100"
                      min="100"
                      max={
                        newMax > valuableItems[focusedValuableItem.value]?.limit
                          ? newMax
                          : valuableItems[focusedValuableItem.value]?.limit + newMax
                      }
                      required
                      onChange={changeValue}
                      value={focusedValuableItem.limit}
                    />
                  </fieldset>
                  <div className="o-save-and-remove-container">
                    <button className="o-btn o-btn--tertiary" type="button" onClick={removeItem}>
                      <span className="o-btn--tertiary__text">Remove</span>
                    </button>
                    <button className="o-btn o-btn--primary" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="o-card">
            <div style={{ display: significantOthersActiveStep === 0 ? 'block' : 'none' }}>
              <h2>Significant Others</h2>
              <p>Living with your spouse or significant other? Add them to your policy.</p>
              <div className="l-significants">
                {significantOthersArray.map((significantOther) => {
                  return (
                    <div className="o-card__significant" key={`significant-${significantOther.email}`}>
                      <button
                        className="o-significant-btn"
                        type="button"
                        onClick={goToEditSignificantOtherStep.bind(this, significantOther)}
                      >
                        <img src="/static/assets/Icons/user.svg" alt="user" />
                      </button>
                      <button
                        className="o-significant-btn__text"
                        type="button"
                        onClick={goToEditSignificantOtherStep.bind(this, significantOther)}
                      >
                        {significantOther.firstName} {significantOther.lastName} <a href="#">(edit)</a>
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                className="o-card__add-button"
                type="button"
                onClick={moveToSignificantOthersStep.bind(this, 1)}
                disabled={significantOthersArray.length >= 1}
                style={{ display: significantOthersArray.length >= 1 ? 'none' : 'flex' }}
                title={
                  significantOthersArray.length >= 1
                    ? 'Only up to 1 significant others can be added'
                    : 'Add a significant other'
                }
              >
                <img src="/static/assets/Icons/plus_mini.svg" alt="plusmini" /> Add significant other
              </button>
            </div>
            <div style={{ display: significantOthersActiveStep === 1 ? 'block' : 'none' }}>
              <button className="o-card__back-button" type="button" onClick={moveToSignificantOthersStep.bind(this, 0)}>
                <img src="/static/assets/Icons/arrow_left_alt.svg" alt="arrowleft" />
              </button>
              <h2 className="o-card__secondary-headline">+ Add Significant</h2>
              <form onSubmit={addSignificant}>
                <div className="o-card__add-significant-container">
                  {significantOthersActiveStep === 1 && (
                    <>
                      <fieldset className="o-fieldset">
                        <input
                          className="o-text-input"
                          type="text"
                          placeholder="First Name"
                          id="significant-other__first-name"
                          defaultValue=""
                        />
                      </fieldset>
                      <fieldset className="o-fieldset">
                        <input
                          className="o-text-input"
                          type="text"
                          placeholder="Last Name"
                          id="significant-other__last-name"
                          defaultValue=""
                        />
                      </fieldset>
                      <fieldset className="o-fieldset">
                        <input
                          className="o-text-input"
                          type="email"
                          placeholder="Email"
                          id="significant-other__email"
                          defaultValue=""
                        />
                      </fieldset>
                    </>
                  )}
                </div>
                <button className="o-btn o-btn--primary o-card__add-item-button" type="submit">
                  <img src="/static/assets/Icons/plus_white.svg" alt="pluswhite" />
                  Add
                </button>
              </form>
            </div>
            <div style={{ display: significantOthersActiveStep === 2 ? 'block' : 'none' }}>
              <button className="o-card__back-button" type="button" onClick={moveToSignificantOthersStep.bind(this, 0)}>
                <img src="/static/assets/Icons/arrow_left_alt.svg" alt="arrowleft" />
              </button>
              <h2 className="o-card__secondary-headline">+ Edit Significant</h2>
              <form onSubmit={editSignificant}>
                <div className="o-card__add-significant-container">
                  {significantOthersActiveStep === 2 && (
                    <>
                      <fieldset className="o-fieldset">
                        <input
                          className="o-text-input"
                          type="text"
                          placeholder="First Name"
                          defaultValue={focusedSignificantOther.firstName}
                          id="significant-other__first-name--edit"
                        />
                      </fieldset>
                      <fieldset className="o-fieldset">
                        <input
                          className="o-text-input"
                          type="text"
                          placeholder="Last Name"
                          defaultValue={focusedSignificantOther.lastName}
                          id="significant-other__last-name--edit"
                        />
                      </fieldset>
                      <fieldset className="o-fieldset">
                        <input
                          disabled
                          readOnly
                          className="o-text-input cursor-not-allowed"
                          type="email"
                          placeholder="Email"
                          defaultValue={focusedSignificantOther.email}
                          id="significant-other__email--edit"
                        />
                      </fieldset>
                    </>
                  )}
                </div>
                <div className="o-save-and-remove-container">
                  <button className="o-btn o-btn--tertiary" type="button" onClick={removeSignificant}>
                    <span className="o-btn--tertiary__text">Remove</span>
                  </button>
                  <button className="o-btn o-btn--primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="l-previous-next-container">
          <button
            className="o-btn o-btn--secondary o-btn--secondary__small"
            disabled={isLoading}
            type="button"
            onClick={previousStep}
          >
            <img src="/static/assets/Icons/arrow_left.svg" alt="arrowleft" />
          </button>
          <button
            className="o-btn o-btn--primary o-btn--primary__with-estimate"
            disabled={isLoading}
            type="submit"
            onClick={onSubmit}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <span className="o-btn--primary__text">
                  ${quote.totalPremium || '--'}/mo <span className="o-btn--primary__continue-text">- continue</span>
                </span>
                <img src="/static/assets/Icons/arrow_right.svg" alt="arrowright" />
              </>
            )}
          </button>
        </div>
        <div className="o-cancel-container">
          <a className="o-cancel" href="/account/insurance">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
