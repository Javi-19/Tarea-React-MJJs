import { useCallback, useEffect, useMemo, useState } from 'react';
import { clearSession, getStoredUser, loginRequest, storeSession } from '../api/client.js';
import { AuthContext } from './authContext.js';

const TOKEN_KEY = 'token';
const UNAUTHORIZED_EVENT = 'auth:unauthorized';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (usuario, contrasena) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginRequest({ usuario, contrasena });
      const jwt = response?.token;

      if (!jwt) {
        throw new Error('Respuesta sin token');
      }

      storeSession(response);
      setToken(jwt);
      setUser(getStoredUser());
      return response;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
      setError('Tu sesion expiro. Inicia sesion de nuevo.');
    };

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      loading,
      error,
      login,
      logout,
    }),
    [token, user, loading, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
