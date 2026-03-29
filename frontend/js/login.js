async function login(event) {
  if (event) event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const button = event?.target?.querySelector("button[type='submit']");
  if (button) button.disabled = true;

  try {
    const res = await apiRequest("/auth/login", "POST", { username, password });
    localStorage.setItem("token", res.token);
    window.location.href = "/admin";
  } catch (err) {
    alert(err.message || "Error de login");
  } finally {
    if (button) button.disabled = false;
  }
}
