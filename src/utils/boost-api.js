import axios from 'axios';
import { DateTime } from 'luxon';
import qs from 'qs';
import { REPLACING_EXISTING_POLICY } from '@utils/policy-helpers';
import { backendApi } from './http';

import { sentryCaptureException } from './sentry';

// Every API call needs an auth token. Get an auth token with our API credentials.
// https://docs.sandbox.boostinsurance.io/#tag/authentication
export const getAuthToken = async () => {
  // Get the auth token with our API credentials
  const authToken = await axios.post(
    `${process.env.BOOST_API_BASE_URL}/auth/oauth2/token`,
    qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.BOOST_CLIENT_ID,
      client_secret: process.env.BOOST_CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return authToken;
};

// Get a quote
// https://docs.sandbox.boostinsurance.io/#operation/getQuote
export const getQuote = async (quoteId) => {
  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/quotes/${quoteId}`,
      method: 'get',
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Boost API: unable to get quote',
        error,
      });
    });

  return response?.data;
};

// Modifies a specified quote with the provided data.
// https://docs.sandbox.boostinsurance.io/#operation/modifyQuote
export const getUpdatedQuote = async (formData) => {
  // If the move in date is in the past, set the subscription to run immediately
  let moveInDate = DateTime.fromISO(formData?.moveInDate);
  const dateTimeDiff = DateTime.local()
    .startOf('day')
    .diff(moveInDate, 'day')
    .toObject().days;

  if (dateTimeDiff >= 0) {
    moveInDate = DateTime.local(); // Set the new start to today
  }

  const termEndDate = moveInDate.plus({ years: 1 });

  const address = {
    address1: formData?.address?.addressOne,
    address2: formData?.address?.addressTwo,
    city: formData?.address?.city,
    state: formData?.address?.state,
    zip: formData?.address?.zip,
  };

  const coreRequestObject = {
    data: {
      type: 'quote',
      attributes: {
        policy_state: address.state,
        effective_date: `${moveInDate.toFormat('yyyy-LL-dd')}T00:00:00.000000`,
        term_end_date: `${termEndDate.toFormat('yyyy-LL-dd')}T00:00:00.000000`,
      },
      relationships: {
        entity_relations: {
          data: [
            {
              type: 'quote_entity_relation',
              lid: 'lid-entity-rel-primary',
            },
          ],
        },
        coverages: {
          data: [
            {
              type: 'coverage',
              lid: 'lid-coverage-personal-liability',
            },
            {
              type: 'coverage',
              lid: 'lid-coverage-personal-contents',
            },
          ],
        },
        product: {
          data: {
            type: 'product',
            id: process.env.BOOST_PRODUCT_ID,
          },
        },
        insured_risks: {
          data: [
            {
              type: 'insured_risk',
              lid: 'lid-insured-risk-1',
            },
          ],
        },
      },
    },
    included: [
      {
        type: 'customer',
        lid: 'lid-customer-primary',
        attributes: {
          entity_type: 'person',
          first_name: formData?.firstName,
          last_name: formData?.lastName,
          email: formData?.email,
          phone: formData?.phoneNumber,
          mailing_address: address,
          billing_address: address,
        },
      },
      {
        type: 'quote_entity_relation',
        lid: 'lid-entity-rel-primary',
        attributes: {
          role: 'primary_named_insured',
          metadata: {},
          physical_address: address,
        },
        relationships: {
          entity: {
            data: {
              lid: 'lid-customer-primary',
              type: 'customer',
            },
          },
        },
      },
      {
        type: 'coverage',
        lid: 'lid-coverage-personal-liability',
        attributes: {
          limit: formData?.personalLiability?.toFixed(2),
        },
        relationships: {
          product_coverage: {
            data: {
              type: 'product_coverage',
              id: process.env.BOOST_PERSONAL_LIABILITY_COVERAGE_ID,
            },
          },
        },
      },
      {
        type: 'coverage',
        lid: 'lid-coverage-personal-contents',
        attributes: {
          deductible: formData?.deductible?.toFixed(2),
          limit: formData?.personalContents?.toFixed(2),
          metadata: {
            enhancement_type: 'silver',
          },
        },
        relationships: {
          product_coverage: {
            data: {
              type: 'product_coverage',
              id: process.env.BOOST_PERSONAL_CONTENTS_COVERAGE_ID,
            },
          },
          children: {
            data: [],
          },
        },
      },
      {
        type: 'insured_risk',
        lid: 'lid-insured-risk-1',
        attributes: {
          factors: {
            is_insurance_required: true,
            residence_type: formData?.residenceType,
          },
        },
      },
    ],
  };

  // Get the index of the personal contents object and store it in a variable for later use
  let personalContentsIndex;
  coreRequestObject.included.forEach((object, index) => {
    if (object.lid === 'lid-coverage-personal-contents') {
      personalContentsIndex = index;
    }
  });

  // Check if there are add ons. If there are, add them to the core request object
  if (formData?.addOns) {
    const addOns = Object.entries(formData?.addOns);
    const PERSONAL_CONTENT_ADDON_IDS = {
      replacementCost: process.env.BOOST_REPLACEMENT_COST_COVERAGE_ID,
      waterDamage: process.env.BOOST_WATER_DAMAGE_COVERAGE_ID,
      theft: process.env.BOOST_THEFT_COVERAGE_ID,
      earthquake: process.env.BOOST_EARTHQUAKE_COVERAGE_ID,
      identityFraud: process.env.BOOST_IDENTITY_FRAUD_COVERAGE_ID,
    };

    // Collect all the enabled add ons into an easy to use array
    const enabledAddOns = addOns
      .filter((addOn) => addOn[1].selected)
      .map((addOn) => {
        const addOnKey = addOn[0];
        const coverage = {
          type: 'coverage',
          lid: `lid-coverage-${addOnKey}`,
          attributes: {
            metadata: {},
          },
          relationships: {
            product_coverage: {
              data: {
                type: 'product_coverage',
                id: PERSONAL_CONTENT_ADDON_IDS[addOnKey],
              },
            },
          },
        };

        if (addOnKey === 'identityFraud') {
          const attributes = {
            limit: '15000.00',
            metadata: {},
          };
          coverage.attributes = attributes;
        }

        return coverage;
      });

    if (enabledAddOns) {
      // To add an "add on", you need to push it to both the "included" array
      // and to the children object for the personal contents object.
      const children = {
        data: [],
      };

      enabledAddOns.forEach((enabledAddOn) => {
        coreRequestObject.included.push(enabledAddOn);

        children.data.push({
          type: 'coverage',
          lid: enabledAddOn.lid,
        });
      });

      coreRequestObject.included[personalContentsIndex].relationships.children = children;
    }
  }

  // Check if there are valuable items. If there are, add them to the core request object
  if (formData?.valuableItems) {
    const valuableItems = Object.values(formData?.valuableItems);
    const scheduledPropertyCoverage = {
      type: 'coverage',
      lid: 'lid-scheduled-property',
      attributes: {
        metadata: {},
      },
      relationships: {
        product_coverage: {
          data: {
            type: 'product_coverage',
            id: process.env.BOOST_SCHEDULED_PROPERTY_COVERAGE_ID,
          },
        },
        insured_risk: {
          data: {
            type: 'coverage_insured_risk',
            lid: 'lid-coverage-insured-risk',
          },
        },
      },
    };

    const coverageInsuredRisk = {
      type: 'coverage_insured_risk',
      lid: 'lid-coverage-insured-risk',
      attributes: {
        factors: {},
      },
    };

    valuableItems.forEach((item) => {
      coverageInsuredRisk.attributes.factors[item.value] = item.limit;
    });

    coreRequestObject.included.push(scheduledPropertyCoverage);
    coreRequestObject.included.push(coverageInsuredRisk);
    coreRequestObject.included[personalContentsIndex].relationships.children.data.push({
      type: 'coverage',
      lid: 'lid-scheduled-property',
    });
  }

  // Check if there are significant others. If there are, add them to the core request object
  if (formData?.significantOthers) {
    const significantOthers = Object.values(formData?.significantOthers);
    significantOthers.forEach((significantOther, index) => {
      const customer = {
        type: 'customer',
        lid: `lid-significant-other-${index + 1}`,
        attributes: {
          entity_type: 'person',
          first_name: significantOther?.firstName,
          last_name: significantOther?.lastName,
          email: significantOther?.email,
          mailing_address: address,
          billing_address: address,
        },
      };

      const quoteEntityRelation = {
        type: 'quote_entity_relation',
        lid: `lid-entity-rel-additional-${index + 1}`,
        attributes: {
          role: 'additional_insured',
          metadata: {},
          physical_address: address,
        },
        relationships: {
          entity: {
            data: {
              lid: `lid-significant-other-${index + 1}`,
              type: 'customer',
            },
          },
        },
      };

      coreRequestObject.included.push(customer);
      coreRequestObject.included.push(quoteEntityRelation);
      coreRequestObject.data.relationships.entity_relations.data.push({
        type: 'quote_entity_relation',
        lid: `lid-entity-rel-additional-${index + 1}`,
      });
    });
  }

  // If there is a "proposed add on", add it to the core request object.
  // This is usually only used when requesting a price preview
  if (formData?.proposedAddOn && formData?.proposedAddOn.type === 'coverage') {
    coreRequestObject.included.push(formData?.proposedAddOn);
    coreRequestObject.included[personalContentsIndex].relationships.children.data.push({
      type: 'coverage',
      lid: formData?.proposedAddOn.lid,
    });
  }

  // Finally, if a quote id already exists, perform a PATCH. Otherwise, perform a POST
  let method = 'post';
  let url = `${process.env.BOOST_API_BASE_URL}/quotes`;
  if (formData?.quoteId) {
    method = 'patch';
    url = `${process.env.BOOST_API_BASE_URL}/quotes/${formData?.quoteId}`;
    coreRequestObject.data.id = formData?.quoteId;
    delete coreRequestObject.data.relationships.product;
  }

  // Get the user's quote with a newly acquired access token
  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url,
      method,
      data: coreRequestObject,
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Boost API: unable to get updated quote',
        error,
        data: { formData },
      });
    });

  return response?.data;
};

// Issues a new policy from the given quote.
// https://docs.sandbox.boostinsurance.io/#operation/postPolicy
export const issuePolicy = async (quoteId) => {
  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/policies`,
      method: 'post',
      data: {
        data: {
          type: 'policy',
          attributes: {
            installment_plan: 'MONTH',
          },
          relationships: {
            quote: {
              data: {
                type: 'quote',
                id: quoteId,
              },
            },
          },
        },
      },
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Boost API: unable to issue policy',
        error,
      });
    });

  return response?.data;
};

// Retrieves the most recent version of the requested policy given the policy ID.
// https://docs.sandbox.boostinsurance.io/#operation/getPolicy
export const getPolicy = async (policyId) => {
  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/policies/${policyId}`,
      method: 'get',
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Boost API: unable to get policy',
        error,
      });
    });

  return response?.data;
};

// Retrieves all Documents for the supplied policy id.
// https://docs.sandbox.boostinsurance.io/#operation/listPolicyDocuments
export const getPolicyDocuments = async (policyId) => {
  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/policies/${policyId}/documents`,
      method: 'get',
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((error) => {
      sentryCaptureException({
        info: 'Boost API: unable to get policy documents',
        error,
      });
    });

  return response?.data;
};

// Cancels an in-force policy. Terminates the policy and its associated coverages on the specified date.
// https://docs.sandbox.boostinsurance.io/#operation/cancelPolicy
export const cancelPolicy = async (
  policyId,
  replacingExistingPolicy, // true if we are updating policy, false if we are cancelling policy
  reason = 'insured_requested',
  description = 'The insured has requested to cancel policy.',
  requestedCancellationDate
) => {
  const policy = await getPolicy(policyId);

  let requestedCancellationDateLuxon;
  if (requestedCancellationDate) {
    requestedCancellationDateLuxon = DateTime.fromISO(requestedCancellationDate);
  } else {
    requestedCancellationDateLuxon = DateTime.local();
  }
  const effectiveDateString = policy?.data?.attributes?.effective_date;
  const effectiveDate = DateTime.fromISO(effectiveDateString);

  let url = '';
  let requestObject = {};
  let method = '';

  // If the move in date is in the future, void the policy instead of cancel
  // https://docs.sandbox.boostinsurance.io/#operation/putStatus
  const dateTimeDiff = DateTime.local()
    .startOf('day')
    .diff(effectiveDate, 'day')
    .toObject().days;
  if (dateTimeDiff <= 0) {
    url = `${process.env.BOOST_API_BASE_URL}/policies/${policyId}/status`;
    requestObject = {
      data: {
        type: 'policy',
        id: policyId,
        attributes: {
          status: 'void',
        },
      },
    };
    method = 'put';
  } else {
    url = `${process.env.BOOST_API_BASE_URL}/policies/${policyId}`;
    requestObject = {
      data: {
        type: 'policy',
        id: policyId,
        attributes: {
          reason,
          requested_cancellation_date: `${requestedCancellationDateLuxon.toFormat('yyyy-LL-dd')}T00:00:00.000000`,
          description,
        },
      },
    };
    method = 'delete';
  }

  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url,
      method,
      data: requestObject,
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .catch((err) => {
      sentryCaptureException({
        info: 'Boost API: unable to update policies info',
        error: err,
      });
    });
  // Only cancel policy when user triggers
  if (!isPolicyUpdated) {
    try {
      await backendApi.post(`/insurance-policies/cancel-policy-notification/?policyId=${policyId}`);
    } catch (err) {
      sentryCaptureException({
        info: 'Boost API: unable to send cancel policy notification',
        error: err,
      });
    }
  }
  return response?.data;
};

export const submitClaim = async (
  { policyId, insuredRiskId, dateOfLoss, lossDescription, contactPhone, contactEmail },
  cookie
) => {
  const requestObject = {
    data: {
      type: 'claim',
      attributes: {
        date_of_loss: dateOfLoss,
        reported_date: `${DateTime.local().toFormat('yyyy-LL-dd')}T00:00:00.000000+0000`,
      },
      relationships: {
        claim_parts: {
          data: [
            {
              type: 'claim_part',
              lid: 'claim-part-1',
            },
          ],
        },
        policy: {
          data: {
            type: 'policy',
            id: policyId,
          },
        },
        insured_risk: {
          data: {
            type: 'insured_risk',
            id: insuredRiskId,
          },
        },
      },
    },
    included: [
      {
        type: 'claim_part',
        lid: 'claim-part-1',
        attributes: {
          metadata: {
            loss_description: lossDescription,
            contact_phone: contactPhone,
            contact_email: contactEmail,
          },
        },
      },
    ],
  };

  const authToken = await getAuthToken();
  const response = await axios
    .request({
      url: `${process.env.BOOST_API_BASE_URL}/claims`,
      method: 'post',
      data: requestObject,
      headers: {
        'Boost-User': process.env.BOOST_USER,
        Authorization: `Bearer ${authToken?.data?.access_token}`,
        'Content-Type': 'application/vnd.api+json',
        'Boost-Version': '2021-03-02',
      },
    })
    .catch((err) => {
      sentryCaptureException({
        info: 'Boost API: Unable to store claim in boost api',
        error: err,
      });
    });
  try {
    const resp = await backendApi.request({
      url: '/insurance-policies/store-claim',
      method: 'post',
      data: {
        policyId,
        claim: lossDescription,
      },
      headers: { cookie },
    });
    await backendApi.post(`/insurance-policies/submit-policy-claim-notification/?policyId=${policyId}`);
  } catch (error) {
    sentryCaptureException({
      info: 'Boost API: unable top store claim info',
      error,
      data: {
        policyId,
        claim: lossDescription,
      },
    });
  }
  return response?.data;
};

// Cancels an in-force policy with a non-continue. Creates a brand new policy that starts from the next billing period
// https://docs.sandbox.boostinsurance.io/#operation/cancelPolicy
// https://docs.sandbox.boostinsurance.io/#operation/postPolicy
export const updatePolicy = async (currentPolicyId, quoteId, startOfNextBillingPeriod) => {
  await cancelPolicy(
    currentPolicyId,
    REPLACING_EXISTING_POLICY.EDIT,
    'non_continue',
    'The insured has requested to update their policy at the start of their next billing period.',
    startOfNextBillingPeriod
  );
  const issuedPolicy = await issuePolicy(quoteId);
  return issuedPolicy?.data;
};
