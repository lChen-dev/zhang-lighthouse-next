import { AxiosInstance } from 'axios';

import { Lease, Property, AcceptedOffer } from '@models/index';

export default class LeaseService {
  public static async fetchLeases(
    client: AxiosInstance,
    deep = false,
  ): Promise<Lease[]> {
    const { data } = await client.get<Lease[]>('/leases');
    if (!deep) return data;
    return Promise.all(this.getDetailedLeaseData(data, client));
  }

  public static getDetailedLeaseData(
    leases: Lease[],
    client: AxiosInstance,
  ): Promise<Lease>[] {
    return leases.map<Promise<Lease>>(async (lease) => {
      const { data } = await client.get<Property>(
        `/properties/${lease.propertyId}`,
      );

      let acceptedOffer;
      try {
        acceptedOffer = (
          await client.get<AcceptedOffer>(`/leases/${lease.id}/accepted_offer`)
        ).data;
      } catch (err) {
        acceptedOffer = undefined;
      }

      const newLease: Lease = {
        ...lease,
        property: data,
        acceptedOffer,
      };

      if (!newLease.acceptedOffer) delete newLease.acceptedOffer;
      return newLease;
    });
  }
}
