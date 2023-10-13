const signout = document.getElementById("signout");

signout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("status", "disconnected");

  window.location = `${window.location.origin}/index.html`;
});
