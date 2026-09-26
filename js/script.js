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
    this.addTitle();
    // startBtn.addEventListener("click", () => this.start());
    startBtn.addEventListener("click", () => {
      this.disableTable();
      this.start();
    });
    resetBtn.addEventListener("click", () => {
      this.reset();
    });
    addScreenBtn.addEventListener("click", () => this.addScreenBlock());
    this.validateScreens();
    inputRange.addEventListener("input", () => {
      this.putRollbackNumber();
      this.addPrices();
      this.showResult();
    });
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    // this.logger();
    // console.log(this);
    this.showResult();
  },

  reset: function () {
    this.resetData();
    this.resetScreenBlock();
    this.resetResults();
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    this.screens = [];
    screens = document.querySelectorAll(".screen");

    screens.forEach((item, index) => {
      const select = item.querySelector("select");
      const input = item.querySelector("input");
      const selectedName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
    this.validateScreens();
  },

  resetScreenBlock: function () {
    addScreenBtn.disabled = false;
    screens = document.querySelectorAll(".screen");
    screens.forEach((item, index) => {
      if (index === 0) {
        const select = item.querySelector("select");
        const input = item.querySelector("input");

        select.selectedIndex = 0;
        select.disabled = false;
        input.value = "";
        input.disabled = false;
      } else {
        item.remove();
      }
    });
  },

  resetData: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.screenCount = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },

  addServices: function () {
    itemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePercentPrice = 0;

    this.screenPrice = this.screens.reduce((sum, screen) => {
      return sum + screen.price;
    }, 0);

    this.screenCount = this.screens.reduce((sum, screen) => {
      return sum + screen.count;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.floor(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );
  },

  showResult: function () {
    totalInputs[0].value = this.screenPrice;
    totalInputs[1].value = this.screenCount;
    totalInputs[2].value = this.servicePricesPercent + this.servicePricesNumber;
    totalInputs[3].value = this.fullPrice;
    totalInputs[4].value = this.servicePercentPrice;
  },

  resetResults: function () {
    totalInputs[0].value = 0;
    totalInputs[1].value = 0;
    totalInputs[2].value = 0;
    totalInputs[3].value = 0;
    totalInputs[4].value = 0;

    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((item) => {
      item.disabled = false;
      item.checked = false;
    });

    inputRange.value = 0;
    rangeValue.textContent = "0%";
  },

  putRollbackNumber: function () {
    this.rollback = inputRange.value;
    rangeValue.textContent = inputRange.value + "%";
  },

  validateScreens: function () {
    let valid = true;
    screens = document.querySelectorAll(".screen");

    screens.forEach((item) => {
      item.addEventListener("input", this.validateScreens);
      const selectValue = item.querySelector("select").value;
      const inputValue = item.querySelector("input").value;

      if (selectValue == "" || inputValue == "") {
        valid = false;
      }
    });

    startBtn.disabled = !valid;
  },

  disableTable: function () {
    screens = document.querySelectorAll(".screen");
    const checkboxes = document.querySelectorAll("input[type=checkbox]");

    screens.forEach((item) => {
      const select = item.querySelector("select");
      const input = item.querySelector("input");

      select.disabled = true;
      input.disabled = true;
    });

    checkboxes.forEach((item) => {
      item.disabled = true;
    });

    addScreenBtn.disabled = true;
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  logger: function () {
    console.log(this.screens);
    console.log(this.screenPrice);
    console.log(this.allServicePrices);
    console.log(this.servicePercentPrice);
  },
};

appData.init();
