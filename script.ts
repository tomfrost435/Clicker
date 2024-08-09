let cookiesAmount: number = 0;
let cookiesGain: number = 0;
let clickPower: number = 1;

interface Upgrade {
  power: number;
  cost: number;
  amount: number;
}

const upgradeDict: { [key: string]: Upgrade } = {
  cursor: { power: 1, cost: 10, amount: 0 },
  grandma: { power: 5, cost: 50, amount: 0 },
  farm: { power: 10, cost: 100, amount: 0 },
  mine: { power: 25, cost: 200, amount: 0 },
  factory: { power: 50, cost: 500, amount: 0 },
};

function l(id: string): HTMLElement {
  return document.getElementById(id)!;
}

function updateCookies(): void {
  l("cookie-amount").innerText = `${Math.round(cookiesAmount)}`;
}

function cookiesClick(): void {
  cookiesAmount += clickPower;
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
