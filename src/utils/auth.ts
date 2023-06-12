import { NextApiRequest } from 'next';
import { backendApi } from '@utils/http';
import { User } from '@models/User';

export async function validateSession(req: NextApiRequest): Promise<string | null> {
  try {
    const { data } = await backendApi.post('/auth/validate', {}, { headers: { cookie: req.headers.cookie } });
    return data.userId;
  } catch (e) {
    return null;
  }
}

export function getUserObject(): User | null {
  if (!window) return null;

  try {
    const record = window.localStorage.getItem('UserObject') || '{}';
    const user = JSON.parse(record);
    if (isValidUser(user)) {
      return user;
    }
  } catch (e) {
    // pass
  }

  return null;
}

export function isValidUser(user: User | null): boolean {
  return user !== null;
}
