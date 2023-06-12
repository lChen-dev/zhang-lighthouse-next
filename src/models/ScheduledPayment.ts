export interface ScheduledPayment {
  id: string;
  bankId: string;
  offerId: string;
  amount: number;
  date: string;
  note?: string;
  status: string | null;
}

export enum PaymentStatus {
  SCHEDULED = 'scheduled',
  PENDING = 'pending',
  PROCESSED = 'processed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
