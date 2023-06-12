import { AxiosInstance } from 'axios';

import { Bank } from '@models/index';

export default class BankService {
  public static async fetchActiveBank(client: AxiosInstance): Promise<Bank | null> {
    let bank;
    try {
      const { data, status } = await client.get<Bank>('/banks/active');
      bank = status >= 400 ? null : data;
    } catch (err) {
      bank = null;
    }
    return bank;
  }
}
