function getUserInfos() {
  return JSON.parse(localStorage.getItem("user-infos"));
}

const status = localStorage.getItem("status");

if (status === "disconnected") window.location = `index.html`;

const profileAvatar = document.getElementById("profile-avatar");
const userInfos = getUserInfos();

if (userInfos)
  profileAvatar.src = userInfos.avatar ?? "assets/images/avatar.jpg";
else profileAvatar.src = "assets/images/avatar.jpg";

const tbody = document.querySelector("tbody");

function showTableFactures(data) {
  tbody.innerHTML = "";
  data.forEach((lot) => {
    tbody.innerHTML += `
          <tr>
          <td class="teste-1">${lot.lot}</td>
          <td>${lot.state}</td>
          <td class="teste">${lot.date}</td>
          <td class="teste">${lot.report}</td>
          <td class="teste2">
            <a href="suividetail.html?lot=${lot.id}">Voir</a>
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
        !reverse ? a.lot.localeCompare(b.lot) : b.lot.localeCompare(a.lot)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "inline";
      sortElements[1].children[0].children[0].style.display = "none";
      sortElements[2].children[0].children[0].style.display = "none";
      sortElements[3].children[0].children[0].style.display = "none";
    } else if (index === 1) {
      const sortedData = data.sort((a, b) =>
        !reverse
          ? a.state.localeCompare(b.state)
          : b.state.localeCompare(a.state)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "none";
      sortElements[1].children[0].children[0].style.display = "inline";
      sortElements[2].children[0].children[0].style.display = "none";
      sortElements[3].children[0].children[0].style.display = "none";
    } else if (index === 2) {
      const sortedData = data.sort((a, b) =>
        !reverse ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "none";
      sortElements[1].children[0].children[0].style.display = "none";
      sortElements[2].children[0].children[0].style.display = "inline";
      sortElements[3].children[0].children[0].style.display = "none";
    } else if (index === 3) {
      const sortedData = data.sort((a, b) =>
        !reverse
          ? a.report.localeCompare(b.report)
          : b.report.localeCompare(a.report)
      );
      showTableFactures(sortedData);
      sortElements[0].children[0].children[0].style.display = "none";
      sortElements[1].children[0].children[0].style.display = "none";
      sortElements[2].children[0].children[0].style.display = "none";
      sortElements[3].children[0].children[0].style.display = "inline";
    }
  });
});

const searchBar = document.getElementById("search");

searchBar.addEventListener("input", function (e) {
  e.preventDefault();

  const sortedData = data.filter(
    (lot) =>
      lot.lot.includes(this.value) ||
      lot.state.toLowerCase().includes(this.value) ||
      lot.report.toLowerCase().includes(this.value)
  );
  showTableFactures(sortedData);
});

showTableFactures(data);
