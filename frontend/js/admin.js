const token = localStorage.getItem("token");

async function createGuest() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const res = await apiRequest(
    "/guests",
    "POST",
    { name, email },
    token
  );

  alert(`Código generado: ${res.code}`);
  loadGuests();
}

async function loadGuests() {
  const guests = await apiRequest("/guests", "GET", null, token);

  const list = document.getElementById("guestList");
  list.innerHTML = "";

  guests.forEach(g => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${g.name} - ${g.invitation_code}
      <button onclick="getLink('${g.invitation_code}')">Link</button>
      <button onclick="getQR('${g.invitation_code}')">QR</button>
    `;

    list.appendChild(li);
  });
}

async function getLink(code) {
  const res = await apiRequest(`/guests/link/${code}`, "GET", null, token);
  alert(res.link);
}

async function getQR(code) {
  const res = await apiRequest(`/guests/qr/${code}`, "GET", null, token);

  const img = document.createElement("img");
  img.src = res.qr;

  document.body.appendChild(img);
}

loadGuests();