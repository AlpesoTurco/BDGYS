let code = new URLSearchParams(window.location.search).get('code');

function showCodeScreen() {
  document.getElementById('codeScreen').style.display = 'flex';
  document.getElementById('errorScreen').style.display = 'none';
  document.getElementById('formScreen').style.display = 'none';
  const input = document.getElementById('codeInput');
  if (input) input.focus();
}

function showError() {
  document.getElementById('codeScreen').style.display = 'none';
  document.getElementById('errorScreen').style.display = 'flex';
  document.getElementById('formScreen').style.display = 'none';
}

function showForm() {
  document.getElementById('codeScreen').style.display = 'none';
  document.getElementById('errorScreen').style.display = 'none';
  document.getElementById('formScreen').style.display = 'flex';
}

function submitCode() {
  const input = document.getElementById('codeInput');
  const val = (input?.value || '').trim();
  if (!val) return;
  code = val;
  loadGuest();
}

async function loadGuest() {
  if (!code) {
    showCodeScreen();
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/guests/${code}`);
    if (!res.ok) {
      showError();
      return;
    }
    const guest = await res.json();
    showForm();
    document.getElementById('welcome').innerText = `Hola ${guest.name} 👋`;
  } catch (error) {
    console.error('Error al cargar invitado:', error);
    showError();
  }
}

const formEl = document.getElementById('rsvpForm');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());
  data.guests_count = parseInt(data.guests_count, 10);
  try {
    await apiRequest(`/guests/rsvp/${code}`, 'POST', data);
    alert('¡Confirmación guardada! Gracias por confirmar tu asistencia 🎉');
    window.location.href = '/';
  } catch (error) {
    console.error('Error al confirmar RSVP:', error);
    alert(error.message || 'Error al guardar la confirmación');
  }
});

loadGuest();
