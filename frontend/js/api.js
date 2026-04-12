// Usar el mismo origen en lugar de localhost evita fallas al abrir desde otro dispositivo o dominio.
const API_URL = `${window.location.origin}/api`;

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
    // Si hay problema de autenticación, limpiar token y redirigir a login
    if (res.status === 401 || res.status === 403) {
      try { localStorage.removeItem('token'); } catch (_e) {}
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    throw new Error(message);
  }

  return payload;
}
