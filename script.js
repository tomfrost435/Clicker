let cookiesAmount = 0;
let cookiesGain = 0;
let clickPower = 1;
let upgradeDict = {
  cursor: { power: 1, cost: 10, amount: 0 },
  grandma: { power: 5, cost: 50, amount: 0 },
  farm: { power: 10, cost: 100, amount: 0 },
  mine: { power: 25, cost: 200, amount: 0 },
  factory: { power: 50, cost: 500, amount: 0 },
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("cookie-button")
    .addEventListener("click", cookiesClick);

  const upgrades = document.querySelectorAll(".upgrade");
  upgrades.forEach((div) => {
    div.addEventListener("click", function () {
      buyUpgrade(div.id);
    });
  });

  updateCookies();
  document.getElementById(
    "cookie-gain"
  ).innerText = `per second: ${cookiesGain}`;
});

function cookiesClick() {
  cookiesAmount += clickPower;
  updateCookies();
}

function buyUpgrade(upgradeId) {
  let upgrade = upgradeDict[upgradeId];
  if (cookiesAmount >= upgrade.cost) {
    cookiesAmount -= upgrade.cost;
    cookiesGain += upgrade.power;
    upgrade.amount += 1;
    upgrade.cost = Math.round(upgrade.cost * 1.15);
    updateCookies();
    document.getElementById(
      "cookie-gain"
    ).innerText = `per second: ${cookiesGain}`;
    document.getElementById(`${upgradeId}-amount`).innerText = upgrade.amount;
    document.getElementById(`${upgradeId}-cost`).innerText = upgrade.cost;
  }
}

function updateCookies() {
  document.getElementById("cookie-amount").innerText =
    Math.round(cookiesAmount);
}

setInterval(() => {
  cookiesAmount += cookiesGain;
  updateCookies();
}, 1000);
