const status = localStorage.getItem("status");

if (status === "disconnected")
  window.location = `${window.location.origin}/index.html`;

const easyMDE = new EasyMDE();

const fileInput = document.getElementById("file-input");
const editImageButton = document.getElementById("edit-photo");
const avatar = document.getElementById("avatar");
const profileAvatar = document.getElementById("profile-avatar");
const removeAvatarButton = document.getElementById("remove-photo");
const save = document.getElementById("save");
const username = document.getElementById("name");
const email = document.getElementById("email");
const bio = document.getElementById("markdown-editor");
const modalContainer = document.getElementById("modal-container");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");
const savePassword = document.getElementById("save-password");
const editPassword = document.getElementById("edit-password");

function getUserInfos() {
  return JSON.parse(localStorage.getItem("user-infos"));
}

const userInfos = getUserInfos();

if (userInfos) {
  avatar.src = userInfos.avatar ?? "assets/images/avatar.jpg";
  profileAvatar.src = userInfos.avatar ?? "assets/images/avatar.jpg";
  username.value = userInfos.username ?? "";
  email.value = userInfos.email ?? "";
  bio.value = userInfos.bio ?? "";
} else {
  avatar.src = "assets/images/avatar.jpg";
  profileAvatar.src = "assets/images/avatar.jpg";
}

// Écoutez le clic sur le bouton
editImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

// Gérez le changement de fichier sélectionné
fileInput.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0];
  const userInfos = getUserInfos();

  if (selectedFile) {
    // Affichez l'image sélectionnée
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      avatar.src = e.target.result;
      avatar.style.display = "block";
      profileAvatar.src = e.target.result;
      profileAvatar.style.display = "block";
      localStorage.setItem(
        "user-infos",
        JSON.stringify({
          ...userInfos,
          avatar: e.target.result,
        })
      );
    };
    fileReader.readAsDataURL(selectedFile);

    showNotification(
      "Modification de l'avatar",
      "Votre photo a été ajoutée avec succès."
    );
  }
});

removeAvatarButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userInfos = getUserInfos();
  delete userInfos.avatar;
  localStorage.setItem("user-infos", JSON.stringify(userInfos));
  avatar.src = "assets/images/avatar.jpg";
  profileAvatar.src = "assets/images/avatar.jpg";
  showNotification(
    "Suppression de l'avatar",
    "Votre photo a été supprimée avec succès."
  );
});

function showNotification(title, message) {
  const notification = document.getElementById("notification");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");

  notificationTitle.innerHTML = title;

  notificationMessage.innerHTML = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

save.addEventListener("click", (e) => {
  e.preventDefault();
  const userInfos = getUserInfos();
  localStorage.setItem(
    "user-infos",
    JSON.stringify({
      ...userInfos,
      username: username.value,
      email: email.value,
      bio: bio.value,
    })
  );

  showNotification(
    "Données personnelles",
    "La mise à jour a été effectuée avec succès."
  );
});

editPassword.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
});

modalContainer.addEventListener("click", function (e) {
  if (e.target.id === this.id) {
    modalContainer.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

savePassword.addEventListener("click", (e) => {
  e.preventDefault();

  const userInfos = getUserInfos();

  if (
    oldPassword.value === "" ||
    newPassword.value === "" ||
    confirmPassword.value === ""
  ) {
    showNotification(
      "Modification de mot de passe",
      "Tous les champs doivent être remplis"
    );
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    showNotification(
      "Modification de mot de passe",
      "Erreur de correspondance entre les mots de passe"
    );
    return;
  }

  if (userInfos.oldPassword) {
    if (oldPassword.value === userInfos.oldPassword) {
      localStorage.setItem(
        "user-infos",
        JSON.stringify({
          ...userInfos,
          oldPassword: newPassword.value,
        })
      );
      showNotification(
        "Modification de mot de passe",
        "Mot de passe modifié avec succès."
      );
      modalContainer.style.display = "none";
      document.body.style.overflow = "auto";
      oldPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    } else {
      showNotification(
        "Modification de mot de passe",
        "Ancien mot de passe incorrect"
      );
    }
  }
});
