const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'token';
const USER_KEY = 'authUser';
const UNAUTHORIZED_EVENT = 'auth:unauthorized';

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function storeSession(authResponse) {
  localStorage.setItem(TOKEN_KEY, authResponse.token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      id: authResponse.id,
      username: authResponse.username,
      email: authResponse.email,
    }),
  );
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function getErrorMessage(response, fallback) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const error = await response.json().catch(() => null);
    return error?.message || error?.error || fallback;
  }

  const text = await response.text();
  return text || fallback;
}

export async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401) {
    clearSession();
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new Error('Tu sesion expiro. Inicia sesion de nuevo.');
  }

  if (!response.ok) {
    const message = await getErrorMessage(response, 'Error en la peticion');
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function loginRequest(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.usuario,
      password: credentials.contrasena,
    }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, 'Credenciales invalidas');
    throw new Error(message);
  }

  return response.json();
}

export async function getCourses() {
  return request('/courses');
}

export async function createCourse(data) {
  const user = getStoredUser();

  return request('/courses', {
    method: 'POST',
    body: JSON.stringify({
      name: data.nombre,
      description: data.descripcion,
      code: data.code ?? `MJJ-${Date.now()}`,
      credits: data.credits ?? 3,
      teacherId: data.teacherId ?? user?.id,
    }),
  });
}
