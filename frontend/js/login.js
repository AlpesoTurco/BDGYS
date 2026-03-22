async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await apiRequest("/auth/login", "POST", {
    username,
    password
  });

  if (res.token) {
    localStorage.setItem("token", res.token);
    window.location.href = "admin.html";
  } else {
    alert("Error de login");
  }
}