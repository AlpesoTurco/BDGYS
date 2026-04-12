const params = new URLSearchParams(window.location.search);
const codeFromUrl = (params.get('code') || '').toUpperCase();

const screens = {
  code: document.getElementById('codeScreen'),
  error: document.getElementById('errorScreen'),
  form: document.getElementById('formScreen')
};

const codeInput = document.getElementById('codeInput');
const guestCodeInput = document.getElementById('guestCode');
const welcome = document.getElementById('welcome');
const codePill = document.getElementById('codePill');
const successAlert = document.getElementById('successAlert');
const rsvpForm = document.getElementById('rsvpForm');

function showScreen(target) {
  Object.entries(screens).forEach(([key, el]) => { if (el) el.style.display = key === target ? 'flex' : 'none'; });
}

function showCodeScreen() {
  showScreen('code');
  successAlert?.classList.add('hidden');
}

async function loadGuest(code) {
  if (!code) return;
  try {
    const guest = await apiRequest(`/guests/${code}`);
    welcome.textContent = `Hola ${guest.name || 'invitadx'}, completa tu confirmación`;
    guestCodeInput.value = code;
    codePill.textContent = `Código ${code}`;
    showScreen('form');
    successAlert?.classList.add('hidden');
  } catch (_err) {
    showScreen('error');
  }
}

function submitCode() {
  const code = (codeInput?.value || '').trim().toUpperCase();
  loadGuest(code);
}

async function handleSubmit(event) {
  event.preventDefault();
  const code = guestCodeInput.value;
  if (!code) return showScreen('error');

  const btn = rsvpForm.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  data.guests_count = parseInt(data.guests_count || '1', 10);

  try {
    await apiRequest(`/guests/rsvp/${code}`, 'POST', data);
    successAlert?.classList.remove('hidden');
    successAlert?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    rsvpForm.reset();
  } catch (err) {
    alert(err.message || 'No pudimos guardar tu confirmación. Intenta de nuevo.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Confirmar Asistencia'; }
  }
}

codeInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitCode(); } });
rsvpForm?.addEventListener('submit', handleSubmit);

// Cargar flujo inicial
if (codeFromUrl) {
  loadGuest(codeFromUrl);
} else {
  showScreen('code');
}

// Expose for inline handlers
window.submitCode = submitCode;
window.showCodeScreen = showCodeScreen;
