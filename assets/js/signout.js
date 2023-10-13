const signout = document.getElementById("signout");

signout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("status", "disconnected");

  window.location = `index.html`;
});
