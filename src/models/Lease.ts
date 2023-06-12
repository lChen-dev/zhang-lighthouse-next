import { Property } from './Property';
import { AcceptedOffer } from './AcceptedOffer';

export interface Lease {
  id: string;
  userId: string;
  propertyId: string;
  startDate: string;
  leaseLength: number;
  monthlyRent: number;
  totalRent: number;
  monthlyRewardAmount?: number;
  lumpRewardAmount?: number;
  commission: number;
  createdAt?: string;
  updatedAt?: string;

  // Computed Fields
  property?: Property;
  acceptedOffer?: AcceptedOffer;
}
