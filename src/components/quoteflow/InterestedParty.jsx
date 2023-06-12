import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from 'email-validator';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';

export default function InterestedParty({ formData, saveData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [interestedParties, setInterestedParties] = useState(formData?.interestedParties || {});
  const [focusedInterestedParty, setFocusedInterestedParty] = useState({});

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Interested Party',
      version: 1,
    });
  }, []);

  const moveToStep = (step) => {
    setActiveStep(step);
  };

  const updateInterestedParty = (e) => {
    e.preventDefault();
    // In case the user changed the email field, we want to delete the old email property and create a new one
    const { email } = focusedInterestedParty;
    if (email) delete interestedParties[email];

    const newEmail = e.target.querySelector('#interested-party__email').value;
    if (!validate(newEmail)) {
      toast.error('bad email');
      return;
    }
    const firstName = e.target.querySelector('#interested-party__first-name').value;
    const lastName = e.target.querySelector('#interested-party__last-name').value;
    const formEmail = e.target.querySelector('#interested-party__email').value;
    const address = e.target.querySelector('#interested-party__address').value;
    const city = e.target.querySelector('#interested-party__city').value;
    const state = e.target.querySelector('#interested-party__state').value;
    const zip = e.target.querySelector('#interested-party__zip').value;
    if (!firstName || !lastName || !formEmail || !address || !city || !state || !zip) {
      toast.error('please complete the form');
      return;
    }
    const newInterestedParties = Object.assign(interestedParties, {
      [newEmail]: {
        firstName,
        lastName,
        email: formEmail,
        address,
        city,
        state,
        zip,
      },
    });

    axios
      .post('/api/interested-party', {
        interestedPartyFirstName: newInterestedParties[newEmail].firstName,
        interestedPartyLastName: newInterestedParties[newEmail].lastName,
        interestedPartyEmail: newInterestedParties[newEmail].email,
        interestedPartyAddress: newInterestedParties[newEmail].address,
        interestedPartyCity: newInterestedParties[newEmail].city,
        interestedPartyState: newInterestedParties[newEmail].state,
        interestedPartyZip: newInterestedParties[newEmail].zip,
        boostId: formData?.policy?.data?.id,
        userId: formData?.userId,
      })
      .then((result) => {
        sendTrack('InsuranceFormPage', {
          category: 'insurance',
          label: 'InsuranceFormPage',
          action: 'InsuranceFormPage',
          page: 'Interested Party',
          interestedParties,
          version: 1,
        });

        if (result.error) {
          throw result;
        }

        return result;
      })
      .then(async ({ data }) => {
        saveData({ interestedParty: data });
      })
      .catch((error) => {
        sentryCaptureException({
          info: 'unable to updateInterestedParty',
          error,
        });
        toast.error('Something went wrong!', { position: 'bottom-right' });
      });

    setFocusedInterestedParty({});
    setInterestedParties(newInterestedParties);
    moveToStep(0);
  };

  const moveToEditInterestedPartyStep = (interestedParty) => {
    setFocusedInterestedParty(interestedParty);
    moveToStep(2);
  };

  const removeInterestedParty = () => {
    const { email } = focusedInterestedParty;
    const newInterestedParties = Object.assign({}, interestedParties);
    delete newInterestedParties[email];

    axios
      .post('/api/interested-party', {
        interestedPartyFirstName: '',
        interestedPartyLastName: '',
        interestedPartyEmail: '',
        interestedPartyAddress: '',
        interestedPartyCity: '',
        interestedPartyState: '',
        interestedPartyZip: '',
        boostId: formData?.policy?.data?.id,
        userId: formData?.userId,
      })
      .then((result) => {
        if (result.error) {
          throw result;
        }

        return result;
      })
      .catch((error) => {
        sentryCaptureException({
          info: 'unable to interested-party data',
          error,
        });
      });

    setInterestedParties(newInterestedParties);
    setFocusedInterestedParty({});
    moveToStep(0);
  };

  const interestedPartiesArray = Object.values(interestedParties);

  return (
    <div>
      <ToastContainer />
      <ReactTooltip className="o-tooltip-theme" />
      <Head>
        <title>Add an Interested Party. | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header">
        <h1>Almost finished...</h1>
      </div>
      <div className="l-interested-party">
        <div className="o-card">
          <div style={{ display: activeStep === 0 ? 'block' : 'none' }}>
            <h2>
              Interested Party{' '}
              <img
                className="o-info-circle"
                src="/static/assets/Icons/info_circle.svg"
                data-effect="solid"
                data-tip="Enter your landlord or other Interested Party’s info here."
              />
            </h2>
            <p>
              Enter your landlord or other Interested Party’s info here. We’ll update them with your proof of insurance
              and keep them in the loop if you decided to move.
            </p>
            <div className="l-interested-party-list">
              {interestedPartiesArray.map((interestedParty) => {
                return (
                  <div className="o-card__interested-party" key={`interested-party-${interestedParty.email}`}>
                    <button
                      className="o-interested-party-btn"
                      onClick={moveToEditInterestedPartyStep.bind(this, interestedParty)}
                    >
                      <img src="/static/assets/Icons/user.svg" />
                    </button>
                    <button
                      className="o-interested-party-btn__text"
                      onClick={moveToEditInterestedPartyStep.bind(this, interestedParty)}
                    >
                      {interestedParty.firstName} {interestedParty.lastName}
                    </button>
                  </div>
                );
              })}
            </div>
            {interestedPartiesArray.length === 0 && (
              <button className="o-card__add-button" onClick={moveToStep.bind(this, 1)}>
                <img src="/static/assets/Icons/plus_mini.svg" /> Add party
              </button>
            )}
          </div>
          <div style={{ display: activeStep === 1 ? 'block' : 'none' }}>
            <button className="o-card__back-button" onClick={moveToStep.bind(this, 0)}>
              <img src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Add Interested Party</h2>
            <form onSubmit={updateInterestedParty}>
              {activeStep === 1 && (
                <div className="o-card__add-interested-party-container">
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.firstName}
                      placeholder="First Name"
                      id="interested-party__first-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.lastName}
                      placeholder="Last Name"
                      id="interested-party__last-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="email"
                      defaultValue={focusedInterestedParty.email}
                      placeholder="Email"
                      id="interested-party__email"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.address}
                      placeholder="Address"
                      id="interested-party__address"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.city}
                      placeholder="City"
                      id="interested-party__city"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="state"
                      defaultValue={focusedInterestedParty.state}
                      placeholder="State"
                      id="interested-party__state"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="number"
                      defaultValue={focusedInterestedParty.zip}
                      placeholder="ZIP"
                      id="interested-party__zip"
                    />
                  </fieldset>
                </div>
              )}
              <button className="o-btn o-btn--primary o-card__add-item-button" type="submit">
                <img src="/static/assets/Icons/plus_white.svg" />
                Add
              </button>
            </form>
          </div>
          <div style={{ display: activeStep === 2 ? 'block' : 'none' }}>
            <button className="o-card__back-button" onClick={moveToStep.bind(this, 0)}>
              <img src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Edit Interested Party</h2>
            <form onSubmit={updateInterestedParty}>
              {activeStep === 2 && (
                <div className="o-card__add-interested-party-container">
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.firstName}
                      placeholder="First Name"
                      id="interested-party__first-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.lastName}
                      placeholder="Last Name"
                      id="interested-party__last-name"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="email"
                      defaultValue={focusedInterestedParty.email}
                      readOnly
                      placeholder="Email"
                      id="interested-party__email"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.address}
                      placeholder="Address"
                      id="interested-party__address"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.city}
                      placeholder="City"
                      id="interested-party__city"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="text"
                      defaultValue={focusedInterestedParty.state}
                      placeholder="State"
                      id="interested-party__state"
                    />
                  </fieldset>
                  <fieldset className="o-fieldset">
                    <input
                      className="o-text-input"
                      type="number"
                      defaultValue={focusedInterestedParty.zip}
                      placeholder="ZIP"
                      id="interested-party__zip"
                    />
                  </fieldset>
                </div>
              )}
              <div className="o-save-and-remove-container">
                <button className="o-btn o-btn--tertiary" type="button" onClick={removeInterestedParty}>
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
      <div className="l-next-container">
        <a className="o-btn o-btn--primary" href="/account/insurance">
          <span className="o-btn--primary__text">Go to insurance page</span>
          <img src="/static/assets/Icons/arrow_right.svg" alt="arrowright" />
        </a>
      </div>
    </div>
  );
}
