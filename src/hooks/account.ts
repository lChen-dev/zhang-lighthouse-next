import { MapperFn, SWRAuthedConfig, SWRConfig, SWRResponse, useSWRBackendApi } from '@utils/requests';
import { Lease } from '@models/Lease';
import { nextApi } from '@utils/http';
import LeaseService from '@services/lease.service';
import { ScheduledPayment } from '@models/ScheduledPayment';
import { Property } from '@models/Property';

export function useFetchLeases(deep = false, config?: SWRConfig<Lease[]>): SWRResponse<Lease[]> {
  let mapper: MapperFn<Lease[]> = (leases) => leases;
  if (deep) {
    mapper = (leases) => Promise.all(LeaseService.getDetailedLeaseData(leases, nextApi));
  }
  return useSWRBackendApi<Lease[]>('/leases', mapper, config);
}

export function useFetchScheduledPayments(config?: SWRConfig<ScheduledPayment[]>): SWRResponse<ScheduledPayment[]> {
  return useSWRBackendApi<ScheduledPayment[]>('/scheduled_payments', (sp) => sp, config);
}

export function useWishlists(config?: SWRAuthedConfig<Property[]>): SWRResponse<Property[]> {
  return useSWRBackendApi<Property[]>('/users/wishlist', (property) => property, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    ...config,
  });
}
