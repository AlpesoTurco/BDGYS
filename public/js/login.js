async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Ingresa usuario y contraseña');
    return;
  }

  try {
    const res = await apiRequest('/auth/login', 'POST', { username, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      window.location.href = '/admin';
    } else {
      alert('Credenciales inválidas');
    }
  } catch (err) {
    alert('Error de acceso');
  }
}
