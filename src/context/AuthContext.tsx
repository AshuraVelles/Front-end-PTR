import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  auth0Token: string | null;
  login: (user: User, auth0Token: string) => void;
  logout: () => void;
}

interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: Array<any>;
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setaccessToken] = useState<string | null>(null);
  const [auth0Token, setAuth0Token] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth0Token = localStorage.getItem('auth0Token');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setaccessToken(parsedUser.stsTokenManager.accessToken);
      console.log('Retrieved accessToken from localStorage:', parsedUser.stsTokenManager.accessToken);
    }
    if (storedAuth0Token) {
      setAuth0Token(storedAuth0Token);
      console.log('Retrieved auth0Token from localStorage:', storedAuth0Token);
    }
  }, []);

  const login = (userData: User, auth0Token: string) => {
    console.log('Storing accessToken:', userData.stsTokenManager.accessToken);
    console.log('Storing auth0Token:', auth0Token);
    setUser(userData);
    setaccessToken(userData.stsTokenManager.accessToken);
    setAuth0Token(auth0Token);

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('auth0Token', auth0Token);
    localStorage.setItem('accessToken', userData.stsTokenManager.accessToken);
  };

  const logout = () => {
    setUser(null);
    setaccessToken(null);
    setAuth0Token(null);

    localStorage.removeItem('user');
    localStorage.removeItem('auth0Token');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, auth0Token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
