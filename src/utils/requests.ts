import useSWR, { ConfigInterface, keyInterface, responseInterface } from 'swr';
import { AxiosError } from 'axios';
import { authed, backendApi, nextApi } from '@utils/http';
import { useErrors } from '@hooks/errors';
import { useEffect } from 'react';

/**
 * Type to help configure the types for the SWR config interface type used when making
 * an SWR request.
 */
export type SWRConfig<Data = any, ErrData = Data> = ConfigInterface<Data, AxiosError<ErrData>>;

/**
 * Type to help configure the types for the SWR response interface type used when making
 * an SWR request.
 */
export type SWRResponse<Data = any, ErrData = Data> = responseInterface<Data, AxiosError<ErrData>>;

export type MapperFn<Resp = any, Data = Resp> = (data: Resp) => Data | Promise<Data>;

/**
 * A fetcher used for the fetcher function in SWR requests. The transform function is
 * used to transform the response data into the appropriate output data.
 * @param mapperFn The function to transform the response data
 */
export function authFetcher<Resp = any, Data = Resp>(mapperFn: MapperFn<Resp, Data>) {
  return (url: string) => authed.get<Resp>(url).then((res) => mapperFn(res.data));
}

export function backendApiFetcher<Resp = any, Data = Resp>(mapperFn: MapperFn<Resp, Data>) {
  return (url: string) => nextApi.get<Resp>(url).then((res) => mapperFn(res.data));
}

export type SWRAuthedConfig<Data = any> = SWRConfig<Data> & { hideErrorPopup?: boolean };

/**
 * A wrapper function for the SWR hook to use the generic typings for Axios and to globally
 * handle errors.
 */
export function useSWRAuthed<Resp = any, Data = Resp>(
  key: keyInterface,
  mapperFn: MapperFn<Resp, Data>,
  config?: SWRAuthedConfig<Data>,
): SWRResponse<Data> {
  const { addError } = useErrors();
  const resp = useSWR<Data, AxiosError<Data>>(key, authFetcher<Resp, Data>(mapperFn), config);

  useEffect(() => {
    if (resp.error && !config?.hideErrorPopup) addError(resp.error);
  }, [resp.error, addError, config]);

  return resp;
}

/**
 * A wrapper function for the SWR hook to use the generic typings for Axios and to globally
 * handle errors.
 */
export function useSWRBackendApi<Resp = any, Data = Resp>(
  key: keyInterface,
  mapperFn: MapperFn<Resp, Data>,
  config?: SWRAuthedConfig<Data>,
): SWRResponse<Data> {
  const { addError } = useErrors();
  const resp = useSWR<Data, AxiosError<Data>>(key, backendApiFetcher<Resp, Data>(mapperFn), config);

  useEffect(() => {
    if (resp.error && !config?.hideErrorPopup) addError(resp.error);
  }, [resp.error, addError, config]);

  return resp;
}
