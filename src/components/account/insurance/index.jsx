/* eslint-disable react/button-has-type */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { H2 } from '@components/shared/Typography';
import {
  getDocumentLink,
  isNotExpired,
  POLICY_STATUS,
  policyActiveStatuses,
  policyInactiveStatuses,
} from '@utils/policy-helpers';
import { useUser } from '@components/shared/UserProvider';
import { nextApi } from '@utils/http';

import CancelPolicyModal from './CancelPolicyModal';
import SubmitClaimModal from './SubmitClaimModal';
import 'react-toastify/dist/ReactToastify.css';

export default function Insurance() {
  const { user } = useUser();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelPolicyModalDisplay, setCancelPolicyModalDisplay] = useState('none');
  const [submitClaimModalDisplay, setSubmitClaimModalDisplay] = useState('none');
  const [selectedPolicyId, setSelectedPolicyId] = useState('');

  const openCancelPolicyModal = (policyId) => {
    setCancelPolicyModalDisplay('flex');
    setSelectedPolicyId(policyId);
  };

  const openSubmitClaimModal = (policyId) => {
    setSubmitClaimModalDisplay('flex');
    setSelectedPolicyId(policyId);
  };

  useEffect(() => {
    sessionStorage.removeItem('quote');
    sessionStorage.removeItem('formData');
  }, []);

  useEffect(() => {
    nextApi
      .get('/policy', { timeout: 120000 })
      .then(({ data }) => {
        const policiesFromApi = data;
        if (policiesFromApi.length > 0) {
          setPolicies(policiesFromApi);
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!', { position: 'bottom-right' });
      })
      .then(() => {
        setLoading(false);
      });
  }, [cancelPolicyModalDisplay, submitClaimModalDisplay]);

  const activePolicies = policies.filter(({ policy }) => {
    const policyStatus = policy?.data?.attributes?.status;
    if (policyActiveStatuses(policyStatus)) {
      return true;
    }
    return false;
  });

  const inactivePolicies = policies.filter(({ policy }) => {
    const policyStatus = policy?.data?.attributes?.status;
    if (policyInactiveStatuses(policyStatus)) {
      return true;
    }
    return false;
  });

  const pendingPolicies = policies.filter(({ policy }) => {
    if (policy?.data?.attributes?.status === POLICY_STATUS.ISSUED) {
      return true;
    }
    return false;
  });

  const selectedPolicy = policies.find(({ policy }) => policy?.data?.id === selectedPolicyId);

  return (
    <div className="l-insurance">
      <CancelPolicyModal
        policyId={selectedPolicyId}
        display={cancelPolicyModalDisplay}
        setDisplay={setCancelPolicyModalDisplay}
      />
      <SubmitClaimModal
        policy={selectedPolicy?.policy}
        display={submitClaimModalDisplay}
        setDisplay={setSubmitClaimModalDisplay}
      />
      <ToastContainer />
      <Head>
        <title>Dashboard | Lighthouse Insurance</title>
      </Head>
      {user?.givenName && (
        <div className="o-dashboard-header">
          <h1>Welcome, {user.givenName}!</h1>
          <p className="o-dashboard-header__subhead">This is your dashboard for everything Lighthouse.</p>
        </div>
      )}
      {activePolicies.length > 0 && (
        <div className="o-policy-group">
          <H2>Active</H2>
          <p className="o-your-policy__paragraph">Click view to edit</p>
          <div className="o-policy-list">
            {loading && (
              <div className="o-policy-card">
                <h2>
                  <Skeleton width="100%" />
                </h2>
                <div className="o-policy-card__monthly-premium">
                  <Skeleton width={100} />
                </div>
                <p>
                  <Skeleton width={200} />
                </p>
                <button className="o-policy-card__view-button">
                  <Skeleton width={100} />
                </button>
              </div>
            )}
            {activePolicies.map(({ policy, documents }) => {
              const policyEntityRelation = policy?.included?.find(
                (object) => object?.type === 'policy_entity_relation'
              );
              const addressObject = policyEntityRelation.attributes?.physical_address;
              const addressString = Object.values(addressObject)
                .filter((property) => property.length > 0)
                .join(', ');
              const monthlyPremium = parseFloat(policy?.data?.attributes?.term_premium) / 12;

              const customers = policy?.included
                ?.filter((object) => object?.type === 'customer')
                .map((customer) => `${customer?.attributes?.first_name} ${customer?.attributes?.last_name}`)
                .join(', ');

              let documentFileUrl = '';
              if (documents && documents?.data) {
                const document = documents?.data[0];
                documentFileUrl = document?.attributes?.file_url;
              }

              return (
                <div className="o-policy-card" key={policy?.data?.id}>
                  <Dropdown className="o-policy-card__dropdown">
                    <DropdownTrigger>
                      <button className="o-policy-card__hamburger-menu">
                        <img src="/static/assets/Icons/hamburger_dots.svg" alt="dots" />
                      </button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {documentFileUrl && (
                        <div>
                          <a href={documentFileUrl} target="_blank" rel="noreferrer">
                            Download PDF
                          </a>
                        </div>
                      )}
                      {isNotExpired(policy) && (
                        <>
                          <div>
                            <a href="#" onClick={openSubmitClaimModal.bind(this, policy?.data?.id)}>
                              Submit Claim
                            </a>
                          </div>
                          <div>
                            <a href="#" onClick={openCancelPolicyModal.bind(this, policy?.data?.id)}>
                              Cancel Policy
                            </a>
                          </div>
                        </>
                      )}
                    </DropdownContent>
                  </Dropdown>
                  <h2>{addressString}</h2>
                  <div className="o-policy-card__monthly-premium">${monthlyPremium.toFixed(2)}/mo</div>
                  <p>{customers}</p>
                  <a href={`/account/insurance/policy/${policy?.data?.id}`}>
                    <button className="o-policy-card__view-button">
                      <b>View</b> <img src="/static/assets/Icons/arrow_right_alt_green.svg" alt="arrow" />
                    </button>
                  </a>
                </div>
              );
            })}
            <div className="o-policy-card">
              <h2>Add a policy</h2>
              <p className="o-policy-card__paragraph">Get the affordable renters coverage you need within minutes</p>
              <a href="/insurance/quote">
                <button className="o-btn o-btn--primary o-btn--full-width">Get started</button>
              </a>
            </div>
          </div>
        </div>
      )}
      {pendingPolicies.length > 0 && (
        <div className="o-policy-group">
          <h2>Pending</h2>
          <div className="o-policy-list">
            {loading && (
              <div className="o-policy-card">
                <h2>
                  <Skeleton width="100%" />
                </h2>
                <div className="o-policy-card__monthly-premium">
                  <Skeleton width={100} />
                </div>
                <p>
                  <Skeleton width={200} />
                </p>
                <button className="o-policy-card__view-button">
                  <Skeleton width={100} />
                </button>
              </div>
            )}
            {pendingPolicies.map(({ policy, documents }) => {
              const policyEntityRelation = policy?.included?.find(
                (object) => object?.type === 'policy_entity_relation'
              );
              const addressObject = policyEntityRelation.attributes?.physical_address;
              const addressString = Object.values(addressObject)
                .filter((property) => property.length > 0)
                .join(', ');
              const monthlyPremium = parseFloat(policy?.data?.attributes?.term_premium) / 12;

              const customers = policy?.included
                ?.filter((object) => object?.type === 'customer')
                .map((customer) => `${customer?.attributes?.first_name} ${customer?.attributes?.last_name}`)
                .join(', ');

              const documentFileUrl = getDocumentLink(documents);

              return (
                <div className="o-policy-card" key={policy?.data?.id}>
                  {(documentFileUrl || isNotExpired(policy)) && (
                    // to display manu we need documentFileUrl or isNotExpired to be true
                    <Dropdown className="o-policy-card__dropdown">
                      <DropdownTrigger>
                        <button className="o-policy-card__hamburger-menu">
                          <img src="/static/assets/Icons/hamburger_dots.svg" alt="dots2" />
                        </button>
                      </DropdownTrigger>
                      <DropdownContent>
                        {documentFileUrl && (
                          <div>
                            <a href={documentFileUrl} target="_blank" rel="noreferrer">
                              Download PDF
                            </a>
                          </div>
                        )}
                        {isNotExpired(policy) && (
                          <>
                            <div>
                              <a href="#" onClick={openSubmitClaimModal.bind(this, policy?.data?.id)}>
                                Submit Claim
                              </a>
                            </div>
                            <div>
                              <a href="#" onClick={openCancelPolicyModal.bind(this, policy?.data?.id)}>
                                Cancel Policy
                              </a>
                            </div>
                          </>
                        )}
                      </DropdownContent>
                    </Dropdown>
                  )}
                  <h2>{addressString}</h2>
                  <div className="o-policy-card__monthly-premium">${monthlyPremium.toFixed(2)}/mo</div>
                  <p>{customers}</p>
                  <a href={`/account/insurance/policy/${policy?.data?.id}`}>
                    <button className="o-policy-card__view-button">
                      <b>View</b> <img src="/static/assets/Icons/arrow_right_alt_green.svg" alt="green2" />
                    </button>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {activePolicies.length === 0 && (
        <div className="o-policy-group">
          {loading && (
            <>
              <h2>
                <Skeleton width={80} />
              </h2>
              <p className="o-your-policy__paragraph">
                <Skeleton width={100} />
              </p>
            </>
          )}
          <div className="o-policy-list">
            {loading ? (
              <div className="o-policy-card">
                <h2>
                  <Skeleton width="100%" />
                </h2>
                <div className="o-policy-card__monthly-premium">
                  <Skeleton width={100} />
                </div>
                <p>
                  <Skeleton width={200} />
                </p>
                <button className="o-policy-card__view-button">
                  <Skeleton width={100} />
                </button>
              </div>
            ) : (
              <div className="o-policy-card">
                <h2>Add a policy</h2>
                <p className="o-policy-card__paragraph mt-5">
                  Get the affordable renters coverage you need within minutes
                </p>
                <a href="/insurance/quote/name">
                  <button className="o-btn o-btn--primary o-btn--full-width">Get started</button>
                </a>
              </div>
            )}
          </div>
          {loading === false && (
            <div className="o-policy__explainer">
              <h2>Why Do Apartments Require Renter’s Insurance?</h2>
              <p className="mt-5">
                Though renters insurance benefits renters by protecting their property, landlords also require renters
                insurance to help reduce their risk.
              </p>
              <p>
                If you are not covered, the landlord might have to pay for additional coverage beyond their standard
                insurance. If renters insurance covers the damage for lost belongings, renters are less likely to sue
                their landlord for damages. As a result, landlords can rest better knowing that there is coverage for
                your property and liabilities.
              </p>
              <p>
                Secondly, when a renter has adequate coverage, it is positive signaling to the landlord that the renter
                is responsible and able to pay rent on time.
              </p>
              <p>
                Finally, since renters insurance covers temporary housing, the policy might cover the cost of shelter in
                the event of a natural disaster or fire.
              </p>
            </div>
          )}
        </div>
      )}
      {inactivePolicies.length > 0 && (
        <div className="o-policy-group">
          <h2>Expired</h2>
          <div className="o-policy-list">
            {loading && (
              <div className="o-policy-card">
                <h2>
                  <Skeleton width="100%" />
                </h2>
                <div className="o-policy-card__monthly-premium">
                  <Skeleton width={100} />
                </div>
                <p>
                  <Skeleton width={200} />
                </p>
                <button className="o-policy-card__view-button">
                  <Skeleton width={100} />
                </button>
              </div>
            )}
            {inactivePolicies.map(({ policy, documents }) => {
              const policyEntityRelation = policy?.included?.find(
                (object) => object?.type === 'policy_entity_relation'
              );
              const addressObject = policyEntityRelation.attributes?.physical_address;
              const addressString = Object.values(addressObject)
                .filter((property) => property.length > 0)
                .join(', ');
              const monthlyPremium = parseFloat(policy?.data?.attributes?.term_premium) / 12;

              const customers = policy?.included
                ?.filter((object) => object?.type === 'customer')
                .map((customer) => `${customer?.attributes?.first_name} ${customer?.attributes?.last_name}`)
                .join(', ');

              const documentFileUrl = getDocumentLink(documents);

              return (
                <div className="o-policy-card" key={policy?.data?.id}>
                  {documentFileUrl && (
                    <Dropdown className="o-policy-card__dropdown">
                      <DropdownTrigger>
                        <button className="o-policy-card__hamburger-menu">
                          <img src="/static/assets/Icons/hamburger_dots.svg" alt="dots3" />
                        </button>
                      </DropdownTrigger>
                      <DropdownContent>
                        <div>
                          <a href={documentFileUrl} target="_blank" rel="noreferrer">
                            Download PDF
                          </a>
                        </div>
                      </DropdownContent>
                    </Dropdown>
                  )}
                  <h2>{addressString}</h2>
                  <div className="o-policy-card__monthly-premium">${monthlyPremium.toFixed(2)}/mo</div>
                  <p>{customers}</p>
                  <a href={`/account/insurance/policy/${policy?.data?.id}`}>
                    <button className="o-policy-card__view-button">
                      <b>View</b> <img src="/static/assets/Icons/arrow_right_alt_green.svg" alt="green3" />
                    </button>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
