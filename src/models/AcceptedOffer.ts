export interface AcceptedOffer {
  id: string;
  leaseId: string;
  startDate: string;
  numberOfMonths: number;
  monthlyAmount: number;
  createdAt?: string;
  updatedAt?: string;
}
