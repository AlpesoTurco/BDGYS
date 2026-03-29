function goToRSVP() {
  const code = document.getElementById('code').value.trim();
  if (!code) return showToast('Ingresa tu código', true);
  window.location.href = `rsvp.html?code=${code}`;
}
