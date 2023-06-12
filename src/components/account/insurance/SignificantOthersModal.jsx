/* eslint-disable no-shadow */
import Router from 'next/router';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { validate } from 'email-validator';

const formatSignificantOthers = (significantOthersArray) => {
  if (!significantOthersArray) return {};

  const formDataSignificantOthers = {};

  significantOthersArray.forEach((significantOther) => {
    formDataSignificantOthers[significantOther.attributes.email] = {
      firstName: significantOther.attributes.first_name,
      lastName: significantOther.attributes.last_name,
      email: significantOther.attributes.email,
    };
  });

  return formDataSignificantOthers;
};

export default function CorePolicyModal({ formData, saveData, display, setDisplay }) {
  const formDataSignificantOthers = formatSignificantOthers(formData?.significantOthersArray);
  const [significantOthers, setSignificantOthers] = useState(formDataSignificantOthers || {});
  const [focusedSignificantOther, setFocusedSignificantOther] = useState({ firstName: '', lastName: '', email: '' });
  const [significantOthersActiveStep, setSignificantOthersActiveStep] = useState(0);
  const [significantOthersHaveChanged, setSignificantOthersHaveChanged] = useState(false);

  useEffect(() => {
    const formDataSignificantOthers = formatSignificantOthers(formData?.significantOthersArray);
    setSignificantOthers(formDataSignificantOthers);
  }, [formData?.significantOthersArray]);

  useEffect(() => {
    if (
      Object.keys(significantOthers).length !== 0 &&
      significantOthers.constructor === Object &&
      significantOthersHaveChanged
    ) {
      saveData({ significantOthers });
    }
  }, [significantOthers]);

  const closeModal = () => {
    setDisplay('none');
    setSignificantOthersActiveStep(0);
  };

  const addSignificant = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector('#significant-other__first-name').value;
    const lastName = e.target.querySelector('#significant-other__last-name').value;
    const email = e.target.querySelector('#significant-other__email').value;
    if (!firstName || !lastName || !email) {
      toast.error('please fill all form');
      return;
    }
    if (!validate(email)) {
      toast.error('bad email');
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
    setSignificantOthersHaveChanged(true);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
    moveToSignificantOthersStep(0);
  };

  const editSignificant = (e) => {
    e.preventDefault();
    const firstName = e.target.querySelector('#significant-other__first-name--edit').value;
    const lastName = e.target.querySelector('#significant-other__last-name--edit').value;
    const email = e.target.querySelector('#significant-other__email--edit').value;
    if (!firstName || !lastName || !email) {
      toast.error('please fill all form');
      return;
    }
    if (!validate(email)) {
      toast.error('bad email');
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
    setSignificantOthersHaveChanged(true);
    setFocusedSignificantOther({ firstName: '', lastName: '', email: '' });
    moveToSignificantOthersStep(0);
  };

  const goToEditSignificantOtherStep = (significantOther) => {
    setFocusedSignificantOther(significantOther);
    moveToSignificantOthersStep(2);
  };

  const removeSignificant = () => {
    const { email } = focusedSignificantOther;
    const newSignificantOthers = { ...significantOthers };
    delete newSignificantOthers[email];

    setSignificantOthers(newSignificantOthers);
    setSignificantOthersHaveChanged(true);
    moveToSignificantOthersStep(0);
  };

  const moveToSignificantOthersStep = (step) => {
    setSignificantOthersActiveStep(step);
  };

  const significantOthersArray = Object.values(significantOthers);

  return (
    <div className="o-modal-screen o-dashboard-modal-screen" style={{ display }} onClick={closeModal}>
      <ReactTooltip className="o-tooltip-theme" />
      <div className="o-dashboard-modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="o-modal-container o-dashboard-modal-container">
          <div style={{ display: significantOthersActiveStep === 0 ? 'block' : 'none' }}>
            <h2>Significant Others</h2>
            <p>Living with your spouse or significant other? Add them to your policy.</p>
            <div className="l-significants">
              {significantOthersArray.map((significantOther) => {
                return (
                  <div className="o-card__significant" key={`significant-${significantOther.email}`}>
                    <button
                      type="button"
                      className="o-significant-btn"
                      onClick={goToEditSignificantOtherStep.bind(this, significantOther)}
                    >
                      <img src="/static/assets/Icons/user.svg" alt="user" />
                    </button>
                    <button
                      type="button"
                      className="o-significant-btn__text"
                      onClick={goToEditSignificantOtherStep.bind(this, significantOther)}
                    >
                      {significantOther.firstName} {significantOther.lastName} <a href="#">(edit)</a>
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="o-card__add-button"
              onClick={moveToSignificantOthersStep.bind(this, 1)}
              disabled={significantOthersArray.length >= 1}
              style={{ display: significantOthersArray.length >= 1 ? 'none' : 'flex' }}
              title={
                significantOthersArray.length >= 1
                  ? 'Only up to 1 significant others can be added'
                  : 'Add a significant other'
              }
            >
              <img src="/static/assets/Icons/plus_mini.svg" alt="plus" /> Add significant other
            </button>
          </div>
          <div style={{ display: significantOthersActiveStep === 1 ? 'block' : 'none' }}>
            <button type="button" className="o-card__back-button" onClick={moveToSignificantOthersStep.bind(this, 0)}>
              <img alt="arrowl" src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Add Significant</h2>
            <form onSubmit={addSignificant}>
              {significantOthersActiveStep === 1 && (
                <div className="o-card__add-significant-container">
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      placeholder="First Name"
                      id="significant-other__first-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      placeholder="Last Name"
                      id="significant-other__last-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input className="o-text-input" type="email" placeholder="Email" id="significant-other__email" />
                  </fieldset>
                </div>
              )}
              <button className="o-btn o-btn--primary o-card__add-item-button" type="submit">
                <img alt="plusw" src="/static/assets/Icons/plus_white.svg" />
                Add
              </button>
            </form>
          </div>
          <div style={{ display: significantOthersActiveStep === 2 ? 'block' : 'none' }}>
            <button type="button" className="o-card__back-button" onClick={moveToSignificantOthersStep.bind(this, 0)}>
              <img alt="arrowl1" src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Edit Significant</h2>
            <form onSubmit={editSignificant}>
              {significantOthersActiveStep === 2 && (
                <div className="o-card__add-significant-container">
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
                      className="o-text-input"
                      type="email"
                      placeholder="Email"
                      defaultValue={focusedSignificantOther.email}
                      id="significant-other__email--edit"
                      readOnly
                    />
                  </fieldset>
                </div>
              )}
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
    </div>
  );
}
