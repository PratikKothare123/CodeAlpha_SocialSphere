import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('socialsphere_token');
    if (!token) {
      setLoading(false);
      return;
    }

    authApi.me()
      .then(({ data }) => setUser(data.user))
      .catch(() => localStorage.removeItem('socialsphere_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    localStorage.setItem('socialsphere_token', data.token);
    setUser(data.user);
    toast.success('Welcome back');
  };

  const signup = async (payload) => {
    const { data } = await authApi.signup(payload);
    localStorage.setItem('socialsphere_token', data.token);
    setUser(data.user);
    toast.success('Account created');
  };

  const logout = () => {
    localStorage.removeItem('socialsphere_token');
    setUser(null);
    toast.success('Logged out');
  };

  const value = useMemo(() => ({ user, setUser, loading, login, signup, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

