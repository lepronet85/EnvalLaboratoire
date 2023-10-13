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

const boltChart = document.getElementById("bolt-chart");
const dropletChart = document.getElementById("droplet-chart");

const ctxs = [boltChart, dropletChart];

for (let i = 0; i < ctxs.length; i++) {
  new Chart(ctxs[i], {
    type: "doughnut",
    data: {
      labels: !i ? ["Positive", "Negative"] : ["Negative", "Positive"],
      datasets: [
        {
          data: !i ? [91, 9] : [50, 50],
          backgroundColor: !i
            ? ["white", "rgba(255, 255, 255, 0.2)"]
            : ["#1897a8", "rgba(24, 151, 168, 0.2)"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      circumference: 300,
      cutout: "80%",
      rotation: 210,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

const barCtx = document.getElementById("bar");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: [
      "JAN",
      "FEV",
      "MARS",
      "AVRIL",
      "MAI",
      "JUIN",
      "JUL",
      "AOUT",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [8, 7, 10, 5, 9, 3, 6, 7, 7, 7, 7, 7],
        borderWidth: 1,
        backgroundColor: "rgba(255, 255, 255)",
        hoverBackgroundColor: "#4A96A6",
        barPercentage: 0.6,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
          drawBorder: false,
        },
        grid: {
          display: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          color: "rgb(255, 255, 255)",
          tickColor: "transparent",
        },
        border: {
          display: false,
        },
      },
    },
  },
});
