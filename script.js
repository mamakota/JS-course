"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Название");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Тип1,Тип2",
    );

    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
      let temp;
      do {
        temp = +prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(temp));

      sum += +temp;
    }
    return sum;
  },

  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function (string) {
    let trimString = string.trim();
    return trimString[0].toUpperCase() + trimString.slice(1);
  },

  getRollbackMessage: function (price) {
    switch (true) {
      case price >= 30000:
        return "Даем скидку в 10%";
      case price >= 15000 && price < 30000:
        return "Даем скидку в 5%";
      case price >= 0 && price < 15000:
        return "Скидка не предусмотрена";
      case price < 0:
        return "Что то пошло не так";
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle(appData.title);
    appData.logger();
  },

  logger: function () {
    for (let item in appData) {
      console.log(item);
    }
  },
};

appData.start();
