import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import useBank from '@hooks/useBank';
import { User } from '@models/index';
import { nextApi } from '@utils/http';
import { colors } from '@styles/theme';
import { useErrors } from '@hooks/errors';

import { RightArrowIcon } from '../../shared/Icons';

interface Props {
  user: User;
  linkToken: string;
}
export default function PlaidBankVerifier({ user, linkToken }: Props): JSX.Element {
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
        await nextApi.post('/banks/active/verify', body, { timeout: 10_000 });
        setBank(await (await nextApi.get('/banks/active')).data);
      } catch (err) {
        addError(err);
      }
      setLoading(false);
    },
    [addError, setLoading, setBank, givenName, familyName, email],
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  } as any); // `any` needed since react-plaid-link fails to add `selectAccount` to type

  // Bank has already been selected, show bank info
  return (
    <button
      type="button"
      onClick={(): void => open()}
      disabled={!ready || loading}
      className="font-bold text-orange rounded-sm py-2 px-4 flex flex-row items-center">
      <span className={!loading ? 'mr-1' : ''}>{!loading ? 'Verify' : <LoadingSpinner color={colors.orange} />}</span>
      {!loading && <RightArrowIcon />}
    </button>
  );
}
