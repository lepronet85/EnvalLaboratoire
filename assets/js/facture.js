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

const tbody = document.querySelector("tbody");

function showTableFactures(data) {
  tbody.innerHTML = "";
  data.forEach((facture) => {
    tbody.innerHTML += `
          <tr>
          <td class="teste-1">${facture.facture}</td>
          <td>${facture.laboratoire}</td>
          <td class="teste">${facture.date}</td>
          <td class="teste2">
            <a href="suividetail.html?facture=${facture.id}">Voir</a>
          </td>
        </tr>
          `;
  });
}

const sortElements = document.querySelectorAll(".sort-element");

sortElements.forEach((sortElement, index) => {
  let reverse = false;
  sortElement.addEventListener("click", function () {
    reverse = !reverse;
    if (index === 0) {
      const sortedData = data.sort((a, b) =>
        !reverse ? a.facture - b.facture : b.facture - a.facture
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "inline";
      sortElements[1].children[0].children[0].style.display = "none";
      sortElements[2].children[0].children[0].style.display = "none";
    } else if (index === 1) {
      const sortedData = data.sort((a, b) =>
        !reverse
          ? a.laboratoire.localeCompare(b.laboratoire)
          : b.laboratoire.localeCompare(a.laboratoire)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "none";
      sortElements[1].children[0].children[0].style.display = "inline";
      sortElements[2].children[0].children[0].style.display = "none";
    } else if (index === 2) {
      const sortedData = data.sort((a, b) =>
        !reverse ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "none";
      sortElements[1].children[0].children[0].style.display = "none";
      sortElements[2].children[0].children[0].style.display = "inline";
    }
  });
});

const searchBar = document.getElementById("search");

searchBar.addEventListener("input", function (e) {
  e.preventDefault();

  const sortedData = data.filter(
    (facture) =>
      facture.facture.includes(this.value) ||
      facture.laboratoire.toLowerCase().includes(this.value)
  );
  showTableFactures(sortedData);
});

showTableFactures(data);
