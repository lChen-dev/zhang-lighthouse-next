import { createClient, Typeform } from '@typeform/api-client';

export const typeformClient = createClient({
  token: process.env.TYPEFORM_KEY,
});

export const CITY_INDEX = 'pDuNbmE9ovYM';

export const getCity = (response: any) => {
  const answers = response.items[0]?.answers || [];
  const cityAnswer = answers.find((a: any) => a.field.id === CITY_INDEX);
  return cityAnswer?.text?.match(/[- ]*(?<city>.+)/)?.groups?.city || '';
}

export const getResponseById = (responseId: string | string[]) => {
  return typeformClient.responses.list({
    uid: process.env.TYPEFORM_UID as string,
    ids: responseId,
  });
};
