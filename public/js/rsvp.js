const params = new URLSearchParams(window.location.search);
const initialCode = params.get('code') || document.getElementById('guestCode').value || '';

const codeForm = document.getElementById('codeForm');
const rsvpForm = document.getElementById('rsvpForm');
const codeText = document.getElementById('codeText');
const guestNameEl = document.getElementById('guestName');
const errorScreen = document.getElementById('errorScreen');
const successScreen = document.getElementById('successScreen');

async function loadGuest(code) {
  if (!code) return;
  try {
    const guest = await apiRequest(`/guests/${code}`);
    guestNameEl.textContent = guest.name;
    document.getElementById('guestCode').value = code;
    codeText.textContent = code;
    codeForm?.classList.add('hidden');
    rsvpForm?.classList.remove('hidden');
    errorScreen.classList.add('hidden');
  } catch (err) {
    errorScreen.classList.remove('hidden');
  }
}

codeForm?.addEventListener('submit', e => {
  e.preventDefault();
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  loadGuest(code);
});

rsvpForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const code = document.getElementById('guestCode').value;
  data.guests_count = parseInt(data.guests_count || '1', 10);

  try {
    await apiRequest(`/guests/rsvp/${code}`, 'POST', data);
    successScreen.classList.remove('hidden');
    errorScreen.classList.add('hidden');
    rsvpForm.reset();
  } catch (err) {
    errorScreen.textContent = 'No pudimos guardar tu confirmación. Intenta de nuevo.';
    errorScreen.classList.remove('hidden');
  }
});

loadGuest(initialCode);
