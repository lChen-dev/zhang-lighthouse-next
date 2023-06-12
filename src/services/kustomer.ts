import axios from 'axios';

export default class Kustomer {
  private static readonly client = axios.create({
    baseURL: 'https://api.kustomerapp.com/v1',
    timeout: 5000,
  });

  static async sendUserSignUpFormHook(data?: any): Promise<void> {
    await Kustomer.client.post(
      `/hooks/form/${process.env.KUSTOMER_ORG_ID}/${process.env.KUSTOMER_USER_SIGN_UP_HASH}`,
      data,
    );
  }

  static async sendGuidedSearchFormHook(data?: any): Promise<void> {
    await Kustomer.client.post(
      `/hooks/form/${process.env.KUSTOMER_ORG_ID}/${process.env.KUSTOMER_GUIDED_SEARCH_HASH}`,
      data,
    );
  }
}
