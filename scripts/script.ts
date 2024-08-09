let cookiesAmount: number = 0;
let cookiesGain: number = 0;

interface Upgrade {
  power: number;
  cost: number;
  amount: number;
}

const upgradeDict: { [key: string]: Upgrade } = {
  cursor: { power: 0.1, cost: 15, amount: 0 },
  grandma: { power: 1, cost: 100, amount: 0 },
  farm: { power: 8, cost: 1100, amount: 0 },
  mine: { power: 47, cost: 1200, amount: 0 },
  factory: { power: 260, cost: 130000, amount: 0 },
};

function l(id: string): HTMLElement {
  return document.getElementById(id)!;
}

function updateCookies(): void {
  l("cookie-amount").innerText = `${Math.round(cookiesAmount)}`;
}

function cookiesClick(): void {
  cookiesAmount += 1;
  updateCookies();
}

function buyUpgrade(upgradeId: string): void {
  const upgrade = upgradeDict[upgradeId];
  if (cookiesAmount >= upgrade.cost) {
    cookiesAmount -= upgrade.cost;
    cookiesGain += upgrade.power;
    upgrade.amount += 1;
    upgrade.cost = Math.round(upgrade.cost * 1.15);
    updateCookies();
    l("cookie-gain").innerText = `per second: ${cookiesGain}`;
    l(`${upgradeId}-amount`).innerText = `${upgrade.amount}`;
    l(`${upgradeId}-cost`).innerText = `${upgrade.cost}`;
  }
}

function main(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const bakeryName = l("bakery-name");
    bakeryName.addEventListener("click", () => {
      l("bakery-name-popup").style.display = "flex";
    });

    const cookieButton = l("cookie-button");
    cookieButton.addEventListener("click", cookiesClick);

    const upgrades = document.getElementsByClassName("upgrade");
    for (let i = 0; i < upgrades.length; i++) {
      const upgrade = upgrades[i] as HTMLElement;
      upgrade.addEventListener("click", () => {
        buyUpgrade(upgrade.id);
      });
    }

    updateCookies();
    l("cookie-gain").innerText = `per second: ${cookiesGain}`;
  });

  setInterval(() => {
    cookiesAmount += cookiesGain;
    updateCookies();
  }, 1000);
}

main();
