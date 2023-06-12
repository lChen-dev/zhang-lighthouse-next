import { useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from 'email-validator';
import { sentryCaptureException } from '@utils/sentry';
import { sendTrack } from '@utils/analytics';

export default function InterestedPartyModal({ formData, saveData, display, setDisplay }) {
  const interestedParty = {
    firstName: formData.interestedPartyFirstName,
    lastName: formData.interestedPartyLastName,
    address: formData.interestedPartyAddress,
    city: formData.interestedPartyCity,
    state: formData.interestedPartyState,
    zip: formData.interestedPartyZip,
    email: formData.interestedPartyEmail,
  };

  useEffect(() => {
    sendTrack('InsuranceFormPageLoaded', {
      category: 'insurance',
      label: 'InsuranceFormPageLoaded',
      action: 'InsuranceFormPageLoaded',
      page: 'Interested Party',
      version: 1,
    });
  }, []);

  const updateInterestedParty = (e) => {
    e.preventDefault();

    const email = e.target.querySelector('#interested-party__email').value;
    if (email && !validate(email)) {
      toast.error('bad email');
      return;
    }
    const fullName = e.target.querySelector('#interested-party__name').value;
    const fullNameList = fullName.split(' ');
    const firstName = fullNameList[0];
    const lastName = fullNameList[1];
    const address = e.target.querySelector('#interested-party__address').value;
    const city = e.target.querySelector('#interested-party__city').value;
    const state = e.target.querySelector('#interested-party__state').value;
    const zip = e.target.querySelector('#interested-party__zip').value;
    if (!fullName || !address || !city || !state || !zip) {
      toast.error('please complete the form');
      return;
    }

    axios
      .post('/api/interested-party', {
        interestedPartyFirstName: firstName,
        interestedPartyLastName: lastName,
        interestedPartyEmail: email,
        interestedPartyAddress: address,
        interestedPartyCity: city,
        interestedPartyState: state,
        interestedPartyZip: zip,
        boostId: formData?.boostId,
        userId: formData?.userId,
      })
      .then((result) => {
        sendTrack('InsuranceFormPage', {
          category: 'insurance',
          label: 'InsuranceFormPage',
          action: 'InsuranceFormPage',
          page: 'Interested Party',
          ...formData,
          version: 1,
        });
        return result;
      })
      .then(() => {
        saveData({
          interestedPartyFirstName: firstName,
          interestedPartyLastName: lastName,
          interestedPartyEmail: email,
          interestedPartyAddress: address,
          interestedPartyCity: city,
          interestedPartyState: state,
          interestedPartyZip: zip,
        });
        setDisplay('none');
      })
      .catch((err) => {
        sentryCaptureException({
          info: 'unable to save interested party info',
          error: err,
        });
        toast.error('Something went wrong', { position: 'bottom-right' });
      });
  };

  const closeModal = () => {
    setDisplay('none');
  };

  const fullName =
    interestedParty.firstName && interestedParty.lastName
      ? `${interestedParty.firstName} ${interestedParty.lastName}`
      : interestedParty.firstName;

  return (
    <div className="o-modal-screen o-dashboard-modal-screen bg-white" style={{ display }} onClick={closeModal}>
      <div className="l-interested-party bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="o-card o-interested-party-modal">
          <div className="bg-white">
            <h2 className="o-card__secondary-headline">Interested Party</h2>
            <form onSubmit={updateInterestedParty}>
              <div className="o-card__add-interested-party-container">
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="text"
                    defaultValue={fullName}
                    placeholder="Name"
                    id="interested-party__name"
                  />
                </fieldset>
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="email"
                    defaultValue={interestedParty.email}
                    placeholder="Email"
                    id="interested-party__email"
                  />
                </fieldset>
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="text"
                    defaultValue={interestedParty.address}
                    placeholder="Address"
                    id="interested-party__address"
                  />
                </fieldset>
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="text"
                    defaultValue={interestedParty.city}
                    placeholder="City"
                    id="interested-party__city"
                  />
                </fieldset>
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="text"
                    defaultValue={interestedParty.state}
                    placeholder="State"
                    id="interested-party__state"
                  />
                </fieldset>
                <fieldset className="o-fieldset">
                  <input
                    className="o-text-input"
                    type="number"
                    defaultValue={interestedParty.zip}
                    placeholder="ZIP"
                    id="interested-party__zip"
                  />
                </fieldset>
              </div>
              <div className="o-save-and-remove-container">
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
