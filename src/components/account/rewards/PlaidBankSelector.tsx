import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import useBank from '@hooks/useBank';
import { User } from '@models/index';
import { nextApi } from '@utils/http';
import { useErrors } from '@hooks/errors';
import { B2 } from '@components/shared/Typography';
import { ChangeIcon } from '@components/shared/Icons';

interface Props {
  user: User;
  linkToken: string;
}
export default function PlaidBankSelector({ user, linkToken }: Props): JSX.Element {
  const { addError } = useErrors();
  const { givenName, familyName, email } = user;
  const [loading, setLoading] = useState(false);
  const { bank, setBank } = useBank();

  const onSuccess = useCallback(
    async (token, metadata) => {
      setLoading(true);

      try {
        const body = {
          token,
          metadata,
          firstName: givenName,
          lastName: familyName,
          email,
        };
        await nextApi.post('/banks/active', body, { timeout: 10_000 });
        setBank(await (await nextApi.get('/banks/active')).data);
      } catch (err) {
        addError(err);
      }
      setLoading(false);
    },
    [addError, setLoading, setBank, givenName, familyName, email]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  } as any); // `any` needed since react-plaid-link fails to add `selectAccount` to type

  const text = bank ? (
    <div className="text-green-active flex items-center cursor-pointer">
      <ChangeIcon />
      <span className="text-green-active ml-2 font-circular">Change</span>
    </div>
  ) : (
    <div className="text-green-active flex items-center cursor-pointer">
      <span className="text-green-active ml-2 font-circular">Connect</span>
    </div>
  );

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <B2 className="text-green-active font-bold cursor-pointer m-0" onClick={() => open()}>
          {text}
        </B2>
      )}
    </>
  );
}
