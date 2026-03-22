const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function loadGuest() {
  if (!code) {
    showError();
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
    
    document.getElementById("welcome").innerText = `Hola ${guest.name} 👋`;
  } catch (error) {
    console.error('Error al cargar invitado:', error);
    showError();
  }
}

function showError() {
  document.getElementById("errorScreen").style.display = "block";
  document.getElementById("formScreen").style.display = "none";
}

function showForm() {
  document.getElementById("errorScreen").style.display = "none";
  document.getElementById("formScreen").style.display = "block";
}

document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());

  // Convertir guests_count a número
  data.guests_count = parseInt(data.guests_count);

  try {
    const res = await apiRequest(`/guests/rsvp/${code}`, "POST", data);
    alert("¡Confirmación guardada! Gracias por confirmar tu asistencia 🎉");
    window.location.href = "/";
  } catch (error) {
    console.error('Error al confirmar RSVP:', error);
    alert("Error al guardar la confirmación. Por favor intenta de nuevo.");
  }
});

loadGuest();