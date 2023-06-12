import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * All API request can go directly to backend API. Session cookie is stored and used for auth
 */
export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  withCredentials: true,
});

/**
 * All API request can go directly to backend API. Session cookie is stored and used for auth
 */
export const unAuthedbackendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60,
});

/**
 * All API requests using the NextJS API pages
 */
export const nextApi = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

/**
 * Unauthenticated requests can go directly to backend API
 * @deprecated
 */
export const unAuthed = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

/**
 * Authenticated requests must be proxied through api route
 * @deprecated
 */
export const authed = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export const createHttpClient = (cookie?: string, config: AxiosRequestConfig = {}): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    withCredentials: true,
    headers: { cookie },
    ...config,
  });
};
