const signinButton = document.getElementById("signin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let intervalId;

function chrono(minutes, context, outputElement) {
  let totalSeconds = minutes * 60;

  function updateDisplay() {
    let remainingSeconds = totalSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    let minuteDisplay = (minutes < 10 ? "0" : "") + minutes;
    let secondDisplay = (seconds < 10 ? "0" : "") + seconds;

    outputElement.textContent = `${minuteDisplay}:${secondDisplay}`;

    if (totalSeconds === 0) {
      clearInterval(intervalId);
      context.style.display = "none";
      localStorage.setItem("tryTimes", 0);
      signinButton.disabled = false;
    } else {
      totalSeconds--;
    }
  }

  if (intervalId) {
    clearInterval(intervalId);
  }

  updateDisplay();

  intervalId = setInterval(updateDisplay, 100);
}

function showNotification(title, message, type = "standard") {
  const notification = document.getElementById("notification");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");

  notificationTitle.innerHTML = title;

  if (type === "timer") {
    notification.style.display = "block";
    chrono(5, notification, notificationMessage);
  } else if (type === "bloqued") {
    notificationMessage.innerHTML = message;
    notification.style.display = "block";
  } else {
    notificationMessage.innerHTML = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }
}

function getUserInfos() {
  return JSON.parse(localStorage.getItem("user-infos"));
}

function checkConnexion(email, password) {
  const userInfos = getUserInfos();
  const userEmail = userInfos.email;
  const userPassword = userInfos.oldPassword;

  if (email !== userEmail || password !== userPassword) {
    let tryTimes = 0;

    if (localStorage.getItem("tryTimes"))
      tryTimes = parseInt(localStorage.getItem("tryTimes"));

    localStorage.setItem("tryTimes", tryTimes + 1);
    tryTimes = parseInt(localStorage.getItem("tryTimes"));

    if (tryTimes === 5) {
      showNotification(
        "Compte bloqué",
        "Ooops!!! Votre compte est temporairement bloqué.",
        "bloqued"
      );
    } else if (tryTimes === 6) {
      const secret = prompt("La question secrète: ");

      if (secret !== "Lacy") {
        signinButton.disabled = true;
        showNotification(
          "Compte bloqué",
          "Ooops!!! Votre compte est temporairement bloqué.",
          "timer"
        );
      } else {
        const notification = document.getElementById("notification");
        notification.style.display = "none";
        localStorage.setItem("tryTimes", 0);
      }
    } else {
      showNotification(
        "Connexion",
        "Ooops!!! La combinaison identifiant/mot de passe est incorrecte.",
        "standard"
      );
    }
  } else {
    window.location = `dashboard.html`;
    localStorage.setItem("tryTimes", 0);
    localStorage.setItem("status", "connected");
  }
}

if (!localStorage.getItem("user-infos")) {
  localStorage.setItem("status", "disconnected");
  localStorage.setItem(
    "user-infos",
    JSON.stringify({
      email: "user@gmail.com",
      oldPassword: "123456",
    })
  );
}

let tryTimes = 0;

if (localStorage.getItem("tryTimes"))
  tryTimes = parseInt(localStorage.getItem("tryTimes"));

if (tryTimes >= 6) {
  signinButton.disabled = true;
  showNotification(
    "Compte bloqué",
    "Ooops!!! Votre compte est temporairement bloqué.",
    "timer"
  );
}

signinButton.addEventListener("click", (e) => {
  e.preventDefault();

  let tryTimes = 0;

  if (localStorage.getItem("tryTimes"))
    tryTimes = parseInt(localStorage.getItem("tryTimes"));

  if (tryTimes > 6) {
    localStorage.setItem("tryTimes", 0);
  }
  checkConnexion(email.value, password.value);
});
