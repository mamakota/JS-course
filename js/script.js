"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const addScreenBtn = document.querySelector(".screen-btn");
const itemsPercent = document.querySelectorAll(".other-items.percent");
const itemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector(".rollback span.range-value");
const totalInputs = Array.from(document.getElementsByClassName("total-input"));
let screens = document.querySelectorAll(".screen");

const appData = {
  screens: [],
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    addScreenBtn.addEventListener("click", appData.addScreenBlock);
    appData.validateScreens();
    inputRange.addEventListener("input", function () {
      appData.putRollbackNumber();
      appData.addPrices();
      appData.showResult();
    });
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.getServicePercentPrices();
    // appData.logger();
    console.log(appData);
    appData.showResult();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    appData.screens = [];
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (item, index) {
      const select = item.querySelector("select");
      const input = item.querySelector("input");
      const selectedName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectedName,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    appData.validateScreens();
  },

  addServices: function () {
    itemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    appData.fullPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicePercentPrice = 0;

    appData.screenPrice = appData.screens.reduce(function (sum, screen) {
      return sum + screen.price;
    }, 0);

    appData.screenCount = appData.screens.reduce(function (sum, screen) {
      return sum + screen.count;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice = Math.floor(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },

  showResult: function () {
    totalInputs[0].value = appData.screenPrice;
    totalInputs[1].value = appData.screenCount;
    totalInputs[2].value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalInputs[3].value = appData.fullPrice;
    totalInputs[4].value = appData.servicePercentPrice;
  },

  putRollbackNumber: function () {
    appData.rollback = inputRange.value;
    rangeValue.textContent = inputRange.value + "%";
  },

  validateScreens: function () {
    let valid = true;
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (item) {
      item.addEventListener("input", appData.validateScreens);
      const selectValue = item.querySelector("select").value;
      const inputValue = item.querySelector("input").value;

      if (selectValue == "" || inputValue == "") {
        valid = false;
      }
    });

    startBtn.disabled = !valid;
  },

  logger: function () {
    console.log(appData.screens);
    console.log(appData.screenPrice);
    console.log(appData.allServicePrices);
    console.log(appData.servicePercentPrice);
  },
};

appData.init();
