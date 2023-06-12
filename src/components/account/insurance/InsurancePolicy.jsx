import Head from 'next/head';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import ReactTooltip from 'react-tooltip';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import { DateTime } from 'luxon';
import { toast, ToastContainer } from 'react-toastify';

import { nextApi } from '@utils/http';
import ConfirmPolicyChange from '@components/account/insurance/ConfirmPolicyChange';
import { POLICY, policyActiveStatuses } from '@utils/policy-helpers';
import { useUser } from '@components/shared/UserProvider';

import CorePolicyModal from './CorePolicyModal';
import SignificantOthersModal from './SignificantOthersModal';
import ValuableItemsModal from './ValuableItemsModal';
import CancelPolicyModal from './CancelPolicyModal';
import SubmitClaimModal from './SubmitClaimModal';
import CheckoutModal from './CheckoutModal';

import 'react-toastify/dist/ReactToastify.css';
import InterestedPartyModal from './InterestedPartyModal';

function formatAmount(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const iconPath = require('./strings/iconPath.json');
const defaultAddOns = require('./strings/defaultAddOns.json');
const coverageDictionary = require('./strings/coverageDictionary.json');
const VALUABLE_ITEMS = require('./strings/valueableItems.json');

const defaultSelectedAddOns = {
  replacementCost: {
    selected: false,
  },
  theft: {
    selected: false,
  },
  earthquake: {
    selected: false,
  },
  identityFraud: {
    selected: false,
  },
};

const formatValuableItems = (valuableItems) => {
  if (!valuableItems) return {};
  const formDataValuableItems = {};
  for (const key in valuableItems) {
    formDataValuableItems[key] = VALUABLE_ITEMS.find((item) => {
      if (item.value === key) {
        return true;
      }
    });

    formDataValuableItems[key].limit = valuableItems[key];
  }

  return formDataValuableItems;
};

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

export default function Insurance() {
  const { user } = useUser();
  const router = useRouter();
  const { policyId } = router.query;

  const [policy, setPolicy] = useState({});
  const [documents, setDocuments] = useState({});
  const [addOns, setAddOns] = useState(defaultAddOns);
  const [totalAddOnCost, setTotalAddOnCost] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState(defaultSelectedAddOns);
  const [loading, setLoading] = useState(true);
  const [addOnLoading, setAddOnLoading] = useState(true);
  const [addressString, setAddressString] = useState('');
  const [monthlyPremium, setMonthlyPremium] = useState();
  const [customers, setCustomers] = useState([]);
  const [personalContentsLimit, setPersonalContentsLimit] = useState();
  const [personalContentsLimitFormatted, setPersonalContentsLimitFormatted] = useState('');
  const [deductible, setDeductible] = useState();
  const [deductibleFormatted, setDeductibleFormatted] = useState('');
  const [personalLiabilityLimit, setPersonalLiabilityLimit] = useState();
  const [personalLiabilityLimitFormatted, setPersonalLiabilityLimitFormatted] = useState('');
  const [factors, setFactors] = useState({});
  const [significants, setSignificants] = useState([]);
  const [interestedParty, setInterestedParty] = useState({});

  // Policy changes (when the user requests changes to their policy, its stored as a "dirtied" state)
  const [policyChanges, setPolicyChanges] = useState({});

  // modals
  const [corePolicyModalDisplay, setCorePolicyModalDisplay] = useState('none');
  const [significantOthersModalDisplay, setSignificantOthersModalDisplay] = useState('none');
  const [valuableItemsModalDisplay, setValuableItemsModalDisplay] = useState('none');
  const [cancelPolicyModalDisplay, setCancelPolicyModalDisplay] = useState('none');
  const [submitClaimModalDisplay, setSubmitClaimModalDisplay] = useState('none');
  const [checkoutModalDisplay, setCheckoutModalDisplay] = useState('none');
  const [interestedPartyModalDisplay, setInterestedPartyModalDisplay] = useState('none');
  // Updated Quotes
  const [updatedQuote, setUpdatedQuote] = useState({});

  const isPolicyChanged = Object.keys(policyChanges).length > 0;

  const isPolicyLoaded = Object.keys(policy).length > 0;

  useEffect(() => {
    nextApi
      .get(`/policy/${policyId}`)
      .then(({ data }) => {
        nextApi.get(`/insurance-policies/${policyId}`).then(({ data: row }) => {
          const policyFromApi = data;
          setPolicy({ ...policyFromApi?.policy });
          setInterestedParty({
            ...row,
          });
          setDocuments(policyFromApi?.documents);
          setLoading(false);
        });
      })
      .catch((err) => {
        toast.error('Something went wrong!', { position: 'bottom-right' });
      });
  }, []);

  useEffect(() => {
    const primaryNamedInsured = policy?.included?.find(
      (object) => object?.type === 'policy_entity_relation' && object?.attributes?.role === 'primary_named_insured',
    );
    const addressObject = primaryNamedInsured?.attributes?.physical_address || {};
    const addressStringFromAPI = Object.values(addressObject)
      .filter((property) => property.length > 0)
      .join(', ');
    const monthlyPremiumFromAPI = parseFloat(policy?.data?.attributes?.term_premium) / 12;
    const customersFromAPI = policy?.included
      ?.filter((object) => object?.type === 'customer')
      .map((customer) => `${customer?.attributes?.first_name} ${customer?.attributes?.last_name}`)
      .join(', ');

    setAddressString(addressStringFromAPI);
    setMonthlyPremium(monthlyPremiumFromAPI);
    setCustomers(customersFromAPI);

    // Personal Property
    const personalContents = policy?.included?.find(
      (object) => object?.relationships?.product_coverage?.data?.id === POLICY.PERSONAL_CONTENTS,
    );
    const personalContentsLimitFromAPI = Math.round(parseFloat(personalContents?.attributes?.limit));
    const personalContentsLimitFormattedFromAPI = formatAmount(personalContentsLimitFromAPI);

    setPersonalContentsLimit(personalContentsLimitFromAPI);
    setPersonalContentsLimitFormatted(personalContentsLimitFormattedFromAPI);

    // Deductible
    const deductibleFromAPI = Math.round(parseFloat(personalContents?.attributes?.deductible));
    const deductibleFormattedFromAPI = formatAmount(deductibleFromAPI);

    setDeductible(deductibleFromAPI);
    setDeductibleFormatted(deductibleFormattedFromAPI);

    // Personal Liability
    const personalLiability = policy?.included?.find(
      (object) => object?.relationships?.product_coverage?.data?.id === POLICY.PERSONAL_LIABILITY,
    );
    const personalLiabilityLimitFromAPI = Math.round(parseFloat(personalLiability?.attributes?.limit));
    const personalLiabilityLimitFormattedFromAPI = formatAmount(personalLiabilityLimitFromAPI);

    setPersonalLiabilityLimit(personalLiabilityLimitFromAPI);
    setPersonalLiabilityLimitFormatted(personalLiabilityLimitFormattedFromAPI);

    // Scheduled Property
    const coverageInsuredRisk = policy?.included?.find((object) => object?.type === 'coverage_insured_risk');
    const factorsFromAPI = coverageInsuredRisk?.attributes?.factors || {};

    setFactors(factorsFromAPI);

    // Customers and Additional Insured
    const additionalInsureds = policy?.included
      ?.filter(
        (object) => object?.type === 'policy_entity_relation' && object?.attributes?.role === 'additional_insured',
      )
      .map((object) => object?.relationships?.entity?.data?.id);
    const significantsFromAPI =
      policy?.included?.filter((object) => object.type === 'customer' && additionalInsureds.includes(object.id)) || [];

    setSignificants(significantsFromAPI);

    // Additional Policies
    const personalContentsChildren =
      policy?.included?.filter((object) => object?.relationships?.parent?.data?.id === personalContents?.id) || [];
    const newSelectedAddOns = {};
    personalContentsChildren.forEach((object) => {
      const key = coverageDictionary[object?.relationships?.product_coverage?.data?.id];
      if (key) {
        newSelectedAddOns[key] = { selected: true };
      }
    });
    setSelectedAddOns({
      ...selectedAddOns,
      ...newSelectedAddOns,
    });

    const addOnsFromAPI = {};
    const tempSelectedAddons = {
      ...selectedAddOns,
      ...newSelectedAddOns,
    };
    Object.entries(tempSelectedAddons).forEach(([key, value]) => {
      if (key !== 'undefined') {
        addOnsFromAPI[key] = { selected: value.selected };
      }
    });

    if (isPolicyLoaded) {
      getPricePreviews({
        personalContentsAmount: personalContentsLimitFromAPI,
        personalLiabilityAmount: personalLiabilityLimitFromAPI,
        deductibleAmount: deductibleFromAPI,
        valuableItemsData: factorsFromAPI,
        significantOthersData: significantsFromAPI,
        addOnsData: addOnsFromAPI,
      }).then(() => setAddOnLoading(false));
    }
  }, [policy]);

  const updatePolicyChanges = (newChanges) => {
    setPolicyChanges({ ...policyChanges, ...newChanges });
  };

  const getUpdatedQuote = async () => {
    const primaryNamedInsured = policy?.included
      ?.filter(
        (object) => object?.type === 'policy_entity_relation' && object?.attributes?.role === 'primary_named_insured',
      )
      .map((object) => object?.relationships?.entity?.data?.id);
    const primaryCustomer = policy?.included?.find(
      (object) => object?.type === 'customer' && primaryNamedInsured.includes(object.id),
    );
    const valuableItems = formatValuableItems(factors);

    const quoteId = policy?.data?.attributes?.quote_id;
    const { data: quote } = await nextApi.get(`/quote/${quoteId}`);
    const installmentPlans = quote?.data?.attributes?.installment_plans?.MONTH;

    const upcomingBillingPeriod = installmentPlans.find((month) => {
      const billingPeriod = DateTime.fromISO(month.billing_period);
      const dateTimeDiff = DateTime.local()
        .startOf('day')
        .diff(billingPeriod, 'day')
        .toObject().days;

      if (dateTimeDiff < 0) {
        return month;
      }
    });
    nextApi
      .post('/quote', {
        firstName: primaryCustomer?.attributes?.first_name,
        lastName: primaryCustomer?.attributes?.last_name,
        email: primaryCustomer?.attributes?.email,
        phoneNumber: primaryCustomer?.attributes?.phone,
        address: {
          addressOne: primaryCustomer?.attributes?.mailing_address1,
          addressTwo: primaryCustomer?.attributes?.mailing_address2,
          city: primaryCustomer?.attributes?.mailing_city,
          state: primaryCustomer?.attributes?.mailing_state,
          zip: primaryCustomer?.attributes?.mailing_zip,
        },
        moveInDate: upcomingBillingPeriod?.billing_period,
        termEndDate: policy?.data?.attributes?.term_end_date,
        personalContents: policyChanges?.corePolicies?.personalContents || personalContentsLimit,
        personalLiability: policyChanges?.corePolicies?.personalLiability || personalLiabilityLimit,
        deductible: policyChanges?.corePolicies?.deductible || deductible,
        addOns,
        valuableItems: policyChanges?.valuableItems || valuableItems,
        significantOthers: policyChanges?.significantOthers || formatSignificantOthers(significants),
        interestedParty,
      })
      .then((response) => {
        const updatedQuoteFromAPI = response?.data;
        updatedQuoteFromAPI.startOfNextBillingPeriod = upcomingBillingPeriod?.billing_period;
        setUpdatedQuote(updatedQuoteFromAPI);
      })
      .catch((err) => {
        toast.error('Something went wrong!', { position: 'bottom-right' });
      });
  };

  useEffect(() => {
    if (Object.keys(policyChanges).length > 0) {
      getUpdatedQuote();
    }
  }, [policyChanges]);

  useEffect(() => {
    const totalAddons = calculateTotalAddons();
    if (totalAddons > 0) setTotalAddOnCost(totalAddons);
    else setTotalAddOnCost(0);
  }, [addOns]);

  const calculateTotalAddons = () => {
    let totalAddons = 0;
    Object.values(addOns).forEach((addOn) => {
      if (typeof addOn.pricePreview !== 'undefined' && addOn.selected) {
        const addOnCost = Number(addOn.pricePreview);
        totalAddons += addOnCost;
      }
    });
    totalAddons = totalAddons.toFixed(2);
    return totalAddons;
  };

  const getPricePreviewsPayload = async ({
    personalContentsAmount,
    personalLiabilityAmount,
    deductibleAmount,
    valuableItemsData,
    significantOthersData,
  }) => {
    const moveInDate = DateTime.local().plus({ days: 1 });
    const primaryNamedInsured = policy?.included
      ?.filter(
        (object) => object?.type === 'policy_entity_relation' && object?.attributes?.role === 'primary_named_insured',
      )
      .map((object) => object?.relationships?.entity?.data?.id);
    const primaryCustomer = policy?.included?.find(
      (object) => object?.type === 'customer' && primaryNamedInsured.includes(object.id),
    );
    const response = await axios.post('/api/price-previews', {
      firstName: primaryCustomer?.attributes?.first_name,
      lastName: primaryCustomer?.attributes?.last_name,
      email: primaryCustomer?.attributes?.email,
      phoneNumber: primaryCustomer?.attributes?.phone,
      address: {
        addressOne: primaryCustomer?.attributes?.mailing_address1,
        addressTwo: primaryCustomer?.attributes?.mailing_address2,
        city: primaryCustomer?.attributes?.mailing_city,
        state: primaryCustomer?.attributes?.mailing_state,
        zip: primaryCustomer?.attributes?.mailing_zip,
      },
      moveInDate,
      personalContents: policyChanges?.corePolicies?.personalContents || personalContentsAmount,
      personalLiability: policyChanges?.corePolicies?.personalLiability || personalLiabilityAmount,
      deductible: policyChanges?.corePolicies?.deductible || deductibleAmount,
      valuableItems: policyChanges?.valuableItems || valuableItemsData,
      significantOthers: policyChanges?.significantOthers || formatSignificantOthers(significantOthersData),
      updatedQuote,
      addOns: selectedAddOns,
    });
    return response;
  };

  const getPricePreviews = async ({
    personalContentsAmount,
    personalLiabilityAmount,
    deductibleAmount,
    valuableItemsData,
    significantOthersData,
    addOnsData,
  }) => {
    try {
      setAddOnLoading(true);
      const response = await getPricePreviewsPayload({
        personalContentsAmount,
        personalLiabilityAmount,
        deductibleAmount,
        valuableItemsData,
        significantOthersData,
      });
      const priceEffect = response?.data?.priceEffect;
      const addOnsFromAPI = {};
      const tempAddOns = { ...priceEffect };
      Object.entries(tempAddOns).forEach(([key, value]) => {
        addOnsFromAPI[key] = { selected: addOnsData[key].selected, pricePreview: value.pricePreview };
      });
      setAddOns({
        ...addOns,
        ...addOnsFromAPI,
      });
      setAddOnLoading(false);
      return response;
    } catch (err) {
      setAddOnLoading(false);
      toast.error('Something went wrong', { position: 'bottom-right' });
    }
  };

  const toggleAddOn = (addOn) => {
    setSelectedAddOns({
      ...selectedAddOns,
      [addOn]: {
        selected: !selectedAddOns[addOn].selected,
      },
    });

    setAddOns({
      ...addOns,
      [addOn]: {
        selected: !addOns[addOn].selected,
        pricePreview: addOns[addOn].pricePreview,
      },
    });

    updatePolicyChanges({
      addOns: {
        ...addOns,
        [addOn]: {
          selected: !selectedAddOns[addOn].selected,
          pricePreview: addOns[addOn].pricePreview,
        },
      },
    });
  };

  const openCorePolicyModal = () => {
    setCorePolicyModalDisplay('flex');
  };

  const openValuableItemsModal = () => {
    setValuableItemsModalDisplay('flex');
  };

  const openSignificantOthersModal = () => {
    setSignificantOthersModalDisplay('flex');
  };

  const openInterestedPartyModal = () => setInterestedPartyModalDisplay('flex');
  const openCancelPolicyModal = () => {
    setCancelPolicyModalDisplay('flex');
  };

  const openSubmitClaimModal = () => {
    setSubmitClaimModalDisplay('flex');
  };

  const openCheckoutModal = () => {
    setCheckoutModalDisplay('flex');
  };

  let documentFileUrl = '';
  if (documents && documents?.data) {
    const document = documents?.data[0];
    documentFileUrl = document?.attributes?.file_url;
  }

  const policyStatus = policy?.data?.attributes?.status;

  const isPolicyEditable = policyActiveStatuses(policyStatus);

  return (
    <>
      <ToastContainer />
      <CorePolicyModal
        currentPolicy={{
          personalLiability: personalLiabilityLimit,
          personalContents: personalContentsLimit,
          deductible,
        }}
        policyChanges={policyChanges?.corePolicies}
        saveData={updatePolicyChanges}
        display={corePolicyModalDisplay}
        setDisplay={setCorePolicyModalDisplay}
      />
      <SignificantOthersModal
        formData={{ significantOthersArray: significants }}
        saveData={updatePolicyChanges}
        display={significantOthersModalDisplay}
        setDisplay={setSignificantOthersModalDisplay}
      />
      <InterestedPartyModal
        formData={interestedParty}
        saveData={(obj = {}) => {
          setInterestedParty({ ...interestedParty, ...obj });
        }}
        display={interestedPartyModalDisplay}
        setDisplay={setInterestedPartyModalDisplay}
      />
      <ValuableItemsModal
        formData={{ valuableItems: factors }}
        saveData={updatePolicyChanges}
        display={valuableItemsModalDisplay}
        setDisplay={setValuableItemsModalDisplay}
      />
      <CheckoutModal
        policyId={policyId}
        policyChanges={policyChanges}
        updatedQuote={updatedQuote}
        display={checkoutModalDisplay}
        interestedParty={interestedParty}
        setDisplay={setCheckoutModalDisplay}
        policyStatus={policyStatus}
        updateDisabled={!!(addOnLoading || loading)}
      />
      <CancelPolicyModal
        policyId={policyId}
        display={cancelPolicyModalDisplay}
        setDisplay={setCancelPolicyModalDisplay}
      />
      <SubmitClaimModal policy={policy} display={submitClaimModalDisplay} setDisplay={setSubmitClaimModalDisplay} />
      <div className="l-insurance">
        <ReactTooltip className="o-tooltip-theme" />
        <Head>
          <title>Insurance Policy: {addressString} | Lighthouse Insurance</title>
        </Head>
        <div className="o-dashboard-header o-policy-page__header">
          <div className="o-policy-page__header__left">
            <h1>{addressString || <Skeleton width="100%" />}</h1>
            <p className="o-dashboard-header__subhead">{customers || <Skeleton width={100} />}</p>
            <p className="o-policy-card__monthly-premium">
              {isNaN(monthlyPremium) ? <Skeleton width={100} /> : `$${monthlyPremium.toFixed(2)}/mo`}
            </p>
          </div>
          <div className="o-policy-page__menu-buttons">
            <Dropdown style={{ position: 'relative' }}>
              <DropdownTrigger>
                <button className="o-policy-page__hamburger-menu">
                  <img src="/static/assets/Icons/hamburger_dots.svg" alt="hamburger_dots" />
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
                {policy?.data?.attributes?.status !== 'cancel-pending' &&
                  policy?.data?.attributes?.status !== 'cancelled' &&
                  policy?.data?.attributes?.status !== 'void' && (
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
            <a href="/account/insurance">
              <button className="o-policy-page__hamburger-menu">
                <img src="/static/assets/Icons/exit.svg" />
              </button>
            </a>
          </div>
        </div>
        <div className="o-policy-summary-cards">
          <div className="o-policy-summary-card">
            <div className="o-policy-summary__core-policies">
              <div className="o-policy-summary__core-policy">
                <h2>
                  Personal Property{' '}
                  <img
                    className="o-info-circle"
                    src="/static/assets/Icons/info_circle.svg"
                    data-tip="This covers sudden direct accidental physical loss or damage to covered property owned by or rented"
                    data-effect="solid"
                  />
                </h2>
                <p>
                  Most apartments require at least $10,000. Covers property you own or rent. We suggest you purchase
                  enough to cover the full value of everything you own.
                </p>
                <div>
                  <b>
                    {isNaN(personalContentsLimit) ? (
                      <Skeleton width={100} />
                    ) : policyChanges?.corePolicies?.personalContents ? (
                      <div>
                        <div style={{ display: 'inline' }} />
                        {`$${personalContentsLimitFormatted}`}
                        <div style={{ display: 'inline', color: 'darkorange' }}>
                          &nbsp; ➔ &nbsp;
                          {`$${formatAmount(policyChanges?.corePolicies?.personalContents)}`}
                        </div>
                      </div>
                    ) : (
                      `$${personalContentsLimitFormatted}`
                    )}
                  </b>
                </div>
              </div>
              <div className="o-policy-summary__core-policy">
                <h2>
                  Personal Liability{' '}
                  <img
                    className="o-info-circle"
                    src="/static/assets/Icons/info_circle.svg"
                    data-tip="This covers damages for bodily injury or property damage caused by an occurrence covered by this policy for which an insured becomes legally liable."
                    data-effect="solid"
                  />
                </h2>
                <p>
                  Most apartments require approximately $100,000. Covers your liabilities that arise from bodily injury
                  or property damage.
                </p>
                <div>
                  <b>
                    {isNaN(personalLiabilityLimit) ? (
                      <Skeleton width={100} />
                    ) : policyChanges?.corePolicies?.personalLiability ? (
                      <div>
                        <div style={{ display: 'inline' }}>{`$${personalLiabilityLimitFormatted}`}</div>
                        <div style={{ display: 'inline', color: 'darkorange' }}>
                          &nbsp; ➔ &nbsp;
                          {`$${formatAmount(policyChanges?.corePolicies?.personalLiability)}`}
                        </div>
                      </div>
                    ) : (
                      `$${personalLiabilityLimitFormatted}`
                    )}
                  </b>
                </div>
              </div>
              <div className="o-policy-summary__core-policy">
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
                  lower deductible will increase the price of your policy but means you will pay less out of pocket in
                  the event of a claim.
                </p>
                <div>
                  <b>
                    {isNaN(personalLiabilityLimit) ? (
                      <Skeleton width={100} />
                    ) : policyChanges?.corePolicies?.deductible ? (
                      <div>
                        <div style={{ display: 'inline' }}>{`$${deductibleFormatted}`}</div>
                        <div style={{ display: 'inline', color: 'darkorange' }}>
                          &nbsp; ➔ &nbsp;
                          {`$${formatAmount(policyChanges?.corePolicies?.deductible)}`}
                        </div>
                      </div>
                    ) : (
                      `$${formatAmount(deductibleFormatted)}`
                    )}
                  </b>
                </div>
              </div>
            </div>
            {/* TO-DO: Implement editing policy after launch */}
            {isPolicyEditable && (
              <button className="o-policy-card__view-button" onClick={openCorePolicyModal}>
                <b>Edit policy</b>
              </button>
            )}
          </div>
          <div className="o-policy-summary-card">
            <h2>
              Valuable Items{' '}
              <img
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
              {loading && (
                <>
                  <Skeleton circle height={48} width={48} style={{ marginRight: '7px' }} />
                  <Skeleton circle height={48} width={48} />
                </>
              )}
              {policyChanges?.valuableItems
                ? Object.keys(policyChanges?.valuableItems).map((factor) => {
                    let backgroundColor = 'rgba(42, 52, 58, 0.06)';
                    if (!Object.keys(factors).includes(factor)) {
                      backgroundColor = 'rgb(255 140 0 / 50%)';
                    }
                    return (
                      <button
                        disabled={!isPolicyEditable}
                        key={`item-${factor}`}
                        onClick={openValuableItemsModal}
                        className="o-valuable-item-btn"
                        style={{ backgroundColor }}>
                        <img src={iconPath[factor]} />
                      </button>
                    );
                  })
                : Object.keys(factors).map((factor) => {
                    return (
                      <button
                        disabled={!isPolicyEditable}
                        key={`item-${factor}`}
                        onClick={openValuableItemsModal}
                        className="o-valuable-item-btn">
                        <img src={iconPath[factor]} />
                      </button>
                    );
                  })}
            </div>
            {/* TO-DO: Implement editing policy after launch */}
            {isPolicyEditable ? (
              <button disabled={!isPolicyEditable} className="o-card__add-button" onClick={openValuableItemsModal}>
                <img src="/static/assets/Icons/plus_mini.svg" /> <b>Edit items</b>
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="o-policy-list__secondary">
            {/* TO-DO: Implement interested party after launch */}
            <div className="o-policy-card o-policy-summary-card">
              <h2>Interested Party</h2>
              <p>
                Enter your landlord or other Interested Party’s info here. We’ll update them with your proof of
                insurance and keep them in the loop if you decided to move.
              </p>
              <div className="l-significants">
                {interestedParty?.interestedPartyFirstName && (
                  <div className="o-card__significant" key={interestedParty?.interestedPartyEmail}>
                    <button
                      disabled={!isPolicyEditable}
                      onClick={openInterestedPartyModal}
                      className="o-significant-btn"
                      type="button">
                      <img src="/static/assets/Icons/user.svg" alt="user" />
                    </button>
                    <button
                      disabled={!isPolicyEditable}
                      onClick={openInterestedPartyModal}
                      className="o-significant-btn__text"
                      type="button">
                      {interestedParty?.interestedPartyFirstName} {interestedParty?.interestedPartyLastName}
                    </button>
                  </div>
                )}
              </div>
              {!interestedParty?.interestedPartyFirstName && (
                <button
                  disabled={!isPolicyEditable}
                  className="o-card__add-button"
                  type="button"
                  onClick={openInterestedPartyModal}>
                  <img src="/static/assets/Icons/plus_mini.svg" alt="plus_mini" /> <b>Add Interested Party</b>
                </button>
              )}
            </div>
            <div className="o-policy-card o-policy-summary-card">
              <h2>Significant Others</h2>
              <p>Living with your spouse or significant other? Add them to your policy.</p>
              <div className="l-significants">
                {policyChanges?.significantOthers
                  ? Object.values(policyChanges?.significantOthers).map((significantOther) => {
                      return (
                        <div className="o-card__significant" key={significantOther?.email}>
                          <button
                            disabled={!isPolicyEditable}
                            onClick={openSignificantOthersModal}
                            className="o-significant-btn">
                            <img src="/static/assets/Icons/user.svg" />
                          </button>
                          <button
                            disabled={!isPolicyEditable}
                            onClick={openSignificantOthersModal}
                            className="o-significant-btn__text">
                            {significantOther?.firstName} {significantOther?.lastName}
                          </button>
                        </div>
                      );
                    })
                  : significants.map((significantOther) => {
                      return (
                        <div className="o-card__significant" key={significantOther?.id}>
                          <button
                            disabled={!isPolicyEditable}
                            onClick={openSignificantOthersModal}
                            className="o-significant-btn">
                            <img src="/static/assets/Icons/user.svg" />
                          </button>
                          <button
                            disabled={!isPolicyEditable}
                            onClick={openSignificantOthersModal}
                            className="o-significant-btn__text">
                            {significantOther?.attributes?.first_name} {significantOther?.attributes?.last_name}
                          </button>
                        </div>
                      );
                    })}
              </div>
              {/* TO-DO: Implement add more significants after launch */}
              {isPolicyEditable ? (
                <button
                  disabled={!isPolicyEditable}
                  className="o-card__add-button"
                  onClick={openSignificantOthersModal}>
                  <img src="/static/assets/Icons/plus_mini.svg" /> <b>Edit significant others</b>
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
        <div className="font-circular">
          <h2 className="o-additional-policy-header">Additional Policy</h2>
          <div className="o-additional-policy-table">
            <div className="o-additional-policy-table__row o-additiona-policy-table__header">
              <div className="o-additional-policy-table__item-label">Item</div>
              <div className="o-additional-policy-table__item-cost">Cost</div>
              <div className="o-additional-policy-table__item-toggle">Add-on</div>
            </div>
            {Object.entries(addOns).map((addOn) => {
              return (
                <div key={addOn[1].label} className="o-additional-policy-table__row">
                  <div className="o-additional-policy-table__item-label">
                    {defaultAddOns[addOn[0]].label}{' '}
                    <img
                      className="o-info-circle"
                      src="/static/assets/Icons/info_circle.svg"
                      data-tip={defaultAddOns[addOn[0]].description}
                      data-effect="solid"
                    />
                  </div>
                  <div className="o-additional-policy-table__item-cost">
                    {loading || addOnLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <span
                        className={
                          selectedAddOns[addOn[0]].selected ? 'o-price-effect-checked' : 'o-price-effect-unchecked'
                        }>
                        + ${addOn[1].pricePreview}
                      </span>
                    )}
                  </div>
                  <div className="o-additional-policy-table__item-toggle">
                    <div className="o-toggle-btn-container">
                      <input
                        type="checkbox"
                        id={addOn[0]}
                        className="toggle"
                        checked={selectedAddOns[addOn[0]].selected}
                        disabled={addOnLoading || loading || !isPolicyEditable}
                        onChange={toggleAddOn.bind(this, addOn[0])}
                      />
                      <label htmlFor={addOn[0]} className="toggle-btn" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isPolicyEditable && isPolicyChanged && (
        <div className="flex justify-center items-center mt-72">
          <ConfirmPolicyChange
            openCheckoutModal={openCheckoutModal}
            monthlyPremium={monthlyPremium}
            updatedTotalPremium={updatedQuote?.totalPremium}
            updateDisabled={!!(addOnLoading || loading)}
          />
        </div>
      )}
    </>
  );
}
