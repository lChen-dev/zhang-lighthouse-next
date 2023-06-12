/**
 * Boost product ID's
 */
export const POLICY = {
  PERSONAL_CONTENTS: 'f48e2e36-a98a-4c23-b5c1-c093c6fbbec5',
  PERSONAL_LIABILITY: '5f4dab5c-4321-411d-b0f0-19e8513dcc9c',
};

/**
 * Boost policy statuses
 */
export const POLICY_STATUS = {
  IN_FORCE: 'in-force',
  REINSTATED: 'reinstated',
  RENEWED: 'renewed',
  ISSUED: 'issued',
  CANCEL_PENDING: 'cancel-pending',
  CANCELLED: 'cancelled',
  VOID: 'void',
};

// Statuses that are valid for editing a policy
export const policyActiveStatuses = (status: string) =>
  status === POLICY_STATUS.IN_FORCE ||
  status === POLICY_STATUS.REINSTATED ||
  status === POLICY_STATUS.RENEWED ||
  status === POLICY_STATUS.ISSUED;

// Statuses that are invalid for editing a policy
export const policyInactiveStatuses = (status: string) =>
  status === POLICY_STATUS.CANCEL_PENDING || status === POLICY_STATUS.CANCELLED || status === POLICY_STATUS.VOID;

/**
 * Returns a policy that is not expired
 * @param policy
 */
export function isNotExpired(policy: any): boolean {
  return (
    policy?.data?.attributes?.status !== 'cancel-pending' &&
    policy?.data?.attributes?.status !== 'cancelled' &&
    policy?.data?.attributes?.status !== 'void'
  );
}

export function getDocumentLink(documents: any): string {
  if (documents && documents?.data) {
    const document = documents?.data[0];
    return document?.attributes?.file_url || '';
  }
  return '';
}

export const REPLACING_EXISTING_POLICY = {
  EDIT: 'true',
  CANCEL: 'false',
};
