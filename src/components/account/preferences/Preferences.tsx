import React, { useEffect, useState } from 'react';

import InputField from '@components/shared/InputField';
import { nextApi } from '@utils/http';
import { useErrors } from '@hooks/errors';
import { CheckIcon } from '@components/shared/Icons';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import { B2, H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import PhoneNumber from '@components/shared/signup-flow/PhoneNumber';
import { useAuth } from 'context/auth/index';
import '../../shared/signup-flow/css/signup.css';

const Preferences: React.FC = () => {
  const { addError } = useErrors();
  const { user, login } = useAuth();
  console.log({ user });
  const [firstName, setFirstName] = useState(user?.givenName);
  const [lastName, setLastName] = useState(user?.familyName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [savingInfo, setSavingInfo] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.givenName);
    setLastName(user.familyName);
    setEmail(user.email);
    setPhone(user.phoneNumber);
  }, [user]);

  /** Makes a request to backend to update current user's information */
  const updateUserInfo = async (): Promise<void> => {
    setSavingInfo(true);
    await nextApi.patch('/users/me', { firstName, lastName, email, phoneNumber: phone }).catch(addError);
    login({
      ...user,
      givenName: firstName,
      familyName: lastName,
      email,
      phoneNumber: phone,
      emailVerified: email === user?.email,
      phoneVerified: phone === user?.phoneNumber,
    });
    setSavingInfo(false);
  };

  const infoDirty =
    firstName !== user?.givenName ||
    lastName !== user?.familyName ||
    email !== user?.email ||
    phone !== user?.phoneNumber;
  return (
    <div className="px-4 xl:px-12">
      <H2 className="mt-0 lg:mt-8">Account settings</H2>
      <B2 className="mb-10">Change your settings here.</B2>
      <div className="w-full xl:max-w-4xl bg-white border border-gray-lighter rounded-sm p-4 xl:p-6 box-border">
        <h2 className="font-bold text-green-darkest text-lg">My Profile</h2>
        <div className="flex flex-col sm:flex-row mt-2 gap-4">
          <div className="flex-1">
            <InputField label="First Name" onChange={setFirstName} value={firstName} name="firstName" />
          </div>
          <div className="flex-1">
            <InputField label="Last Name" onChange={setLastName} value={lastName} name="lastName" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-2 gap-4">
          <div className="flex-1">
            <label htmlFor="phoneNumber">
              <B2 className="mb-1">Phone</B2>
              <PhoneNumber onChange={setPhone} initialValue={phone} name="phoneNumber" className="p-2" />
            </label>
            {user?.phoneNumber && !user?.phoneVerified && (
              <p className="text-yellow-600 text-sm">Phone has not been verified</p>
            )}
          </div>
          <div className="flex-1">
            <InputField label="Email" onChange={setEmail} value={email} name="email" type="email" />
            {user?.email && !user?.emailVerified && (
              <p className="text-yellow-600 text-sm">Email has not been verified</p>
            )}
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-8">
          <ButtonCta
            className="flex-1 sm:flex-none justify-center"
            onClick={updateUserInfo}
            disabled={!infoDirty || savingInfo}
            icon={savingInfo ? LoadingSpinner : CheckIcon}
            iconPos="right">
            {savingInfo ? 'Saving...' : 'Save Changes'}
          </ButtonCta>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
