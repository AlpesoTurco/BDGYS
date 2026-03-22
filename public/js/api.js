const API_URL = '/api';

async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (token) {
    options.headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Error en la solicitud');
  }
  return res.json();
}
