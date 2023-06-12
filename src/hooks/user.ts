import { SWRAuthedConfig, SWRResponse, useSWRBackendApi } from '@utils/requests';
import { User } from '@models/User';

export function useFetchUser(config?: SWRAuthedConfig<User>): SWRResponse<User> {
  return useSWRBackendApi<User, User>('/users/me', (data) => data, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    hideErrorPopup: true,
    ...config,
  });
}
