import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getUserFromCookie, isSameUser, onVisibilityChangeText, setUserInCookie } from './util';

interface Props {
  children: React.ReactNode;
}

type AuthContextType = {
  user: any;
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (data: any) => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
  user: any;
}

const AuthProvider: React.FC<Props> = (props: Props) => {
  const { children, user: userFromProps } = props;
  const [user, setUser] = useState(userFromProps || getUserFromCookie());

  const contextValue: AuthContextType = {
    user,
    login: (_user: any) => {
      setUserInCookie(_user);
      setUser(_user);
    },
    logout: () => {
      setUserInCookie(null);
      setUser(null);
    },
  };

  const syncUserState = useCallback(() => {
    if (document.hidden) {
      return;
    }
    const userFromCookie = getUserFromCookie();
    if (!isSameUser(user, userFromCookie)) {
      setUser(userFromCookie);
    }
  }, [user, setUser]);

  useEffect(() => {
    const visibilityText = onVisibilityChangeText();
    document.addEventListener(visibilityText, syncUserState);
    return (): void => {
      document.removeEventListener(visibilityText, syncUserState);
    };
  }, [syncUserState]);

  useEffect(() => {
    setUser(userFromProps);
  }, [userFromProps]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

/** Uses the `AuthContext` to allow user management globally */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};
