const API_URL = "http://localhost:3000/api";

async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    options.headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_URL}${endpoint}`, options);

  const contentType = res.headers.get('content-type') || '';
  let payload;
  try {
    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      const text = await res.text();
      payload = { message: text || 'Respuesta vacía' };
    }
  } catch (e) {
    payload = { message: 'Error al procesar la respuesta' };
  }

  if (!res.ok) {
    const message = payload?.message || `Error ${res.status}`;
    throw new Error(message);
  }

  return payload;
}
