import React from 'react';
import { backendApi } from '@utils/http';
import { User } from '@models/User';

interface ContextProps {
  user: null | User;
}
export const UserContext = React.createContext<ContextProps>({
  user: null,
});

/**
 * use to update current global var and fetch session from /api/me
 */
export const fetchUser = async () => {
  try {
    const { data: user } = await backendApi.get('/users/me');
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const UserProvider = ({ value, children }: { value: ContextProps; children: any }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

// hook to get values of current session provider
export const useUser = () => React.useContext(UserContext);
