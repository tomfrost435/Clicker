var cookiesAmount = 0;
var cookiesGain = 0;
var upgradeDict = {
    cursor: { power: 0.1, cost: 15, amount: 0 },
    grandma: { power: 1, cost: 100, amount: 0 },
    farm: { power: 8, cost: 1100, amount: 0 },
    mine: { power: 47, cost: 1200, amount: 0 },
    factory: { power: 260, cost: 130000, amount: 0 },
};
function l(id) {
    return document.getElementById(id);
}
function updateCookies() {
    l("cookie-amount").innerText = "".concat(Math.round(cookiesAmount));
}
function cookiesClick() {
    cookiesAmount += 1;
    updateCookies();
}
function buyUpgrade(upgradeId) {
    var upgrade = upgradeDict[upgradeId];
    if (cookiesAmount >= upgrade.cost) {
        cookiesAmount -= upgrade.cost;
        cookiesGain += upgrade.power;
        upgrade.amount += 1;
        upgrade.cost = Math.round(upgrade.cost * 1.15);
        updateCookies();
        l("cookie-gain").innerText = "per second: ".concat(cookiesGain);
        l("".concat(upgradeId, "-amount")).innerText = "".concat(upgrade.amount);
        l("".concat(upgradeId, "-cost")).innerText = "".concat(upgrade.cost);
    }
}
function main() {
    document.addEventListener("DOMContentLoaded", function () {
        var bakeryName = l("bakery-name");
        bakeryName.addEventListener("click", function () {
            l("bakery-name-popup").style.display = "flex";
        });
        var cookieButton = l("cookie-button");
        cookieButton.addEventListener("click", cookiesClick);
        var upgrades = document.getElementsByClassName("upgrade");
        var _loop_1 = function (i) {
            var upgrade = upgrades[i];
            upgrade.addEventListener("click", function () {
                buyUpgrade(upgrade.id);
            });
        };
        for (var i = 0; i < upgrades.length; i++) {
            _loop_1(i);
        }
        updateCookies();
        l("cookie-gain").innerText = "per second: ".concat(cookiesGain);
    });
    setInterval(function () {
        cookiesAmount += cookiesGain;
        updateCookies();
    }, 1000);
}
main();
