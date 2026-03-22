const token = localStorage.getItem('token');

async function createGuest() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert('Nombre y email son obligatorios');
    return;
  }

  const res = await apiRequest('/guests', 'POST', { name, email }, token);
  alert(`Código generado: ${res.code}`);
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  loadGuests();
}

async function loadGuests() {
  const guests = await apiRequest('/guests', 'GET', null, token);
  const list = document.getElementById('guestList');
  list.innerHTML = '';

  guests.forEach(g => {
    const li = document.createElement('li');
    li.className = 'py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2';
    li.innerHTML = `
      <div>
        <p class="text-white font-medium">${g.name}</p>
        <p class="text-gray-400 text-xs">Código: ${g.invitation_code} · ${g.email || 'sin email'}</p>
      </div>
      <div class="flex gap-2">
        <button class="px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/15 hover:border-white/40" onclick="getLink('${g.invitation_code}')">Link</button>
        <button class="px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/15 hover:border-white/40" onclick="getQR('${g.invitation_code}')">QR</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function getLink(code) {
  const res = await apiRequest(`/guests/link/${code}`, 'GET', null, token);
  navigator.clipboard?.writeText(res.link);
  alert(`Link copiado: ${res.link}`);
}

async function getQR(code) {
  const res = await apiRequest(`/guests/qr/${code}`, 'GET', null, token);
  const modal = document.getElementById('qrModal');
  const img = document.getElementById('qrImage');
  const codeText = document.getElementById('qrCodeText');
  img.src = res.qr;
  codeText.textContent = `Código: ${code}`;
  modal.classList.remove('hidden');
}

// Modal handlers
const modalEl = document.getElementById('qrModal');
const closeBtn = document.getElementById('qrClose');

closeBtn?.addEventListener('click', () => modalEl.classList.add('hidden'));
modalEl?.addEventListener('click', (e) => {
  if (e.target === modalEl) modalEl.classList.add('hidden');
});

loadGuests();
