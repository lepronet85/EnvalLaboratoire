function getUserInfos() {
  return JSON.parse(localStorage.getItem("user-infos"));
}

const status = localStorage.getItem("status");

if (status === "disconnected")
  window.location = `${window.location.origin}/index.html`;

const profileAvatar = document.getElementById("profile-avatar");
const userInfos = getUserInfos();

if (userInfos)
  profileAvatar.src = userInfos.avatar ?? "assets/images/avatar.jpg";
else profileAvatar.src = "assets/images/avatar.jpg";

const lotId = parseInt(window.location.search.split("=")[1]);
const lot = data.find((lot) => lot.id === lotId);

document.getElementById("report").innerHTML = `Rapport: R-${lot.lot}`;
document.querySelector(
  "#report-title"
).innerHTML = `Rapport d'analyse (${lot.lot})`;
