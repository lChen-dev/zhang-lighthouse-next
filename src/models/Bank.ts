export interface Bank {
  id: string;
  userId: string;
  bankName: string;
  active: boolean;
  verificationStatus: string;
  accountLastFourDigits?: string; 
}
