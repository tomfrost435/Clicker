let currency = 0;
let cps = 0;
const upgrades = {
  cursor: { power: 1, count: 0 },
  grandma: { power: 5, count: 0 },
  farm: { power: 10, count: 0 },
};

function increaseCurrency() {
  currency++;
  document.getElementById("numberDisplay").innerText = Math.round(currency);
}

function buyUpgrade(upgradeId) {
  const upgrade = upgrades[upgradeId];
  if (upgrade) {
    upgrade.count++;
    cps += upgrade.power;
    document.getElementById(`${upgradeId}Count`).innerText = upgrade.count;
  }
}

function updateCurrency() {
  currency += cps;
  document.getElementById("numberDisplay").innerText = Math.round(currency);
}

setInterval(updateCurrency, 1000);
