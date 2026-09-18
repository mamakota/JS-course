"use strict";

let title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 20;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

let fullPrice;
let allServicePrices;
let servicePercentPrice;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
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
};

const getAllServicePrices = function (service1, service2) {
  return service1 + service2;
};

function getFullPrice(price, servicePrice) {
  return price + servicePrice;
}

const getTitle = function (string) {
  let trimString = string.trim();
  return trimString[0].toUpperCase() + trimString.slice(1);
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return fullPrice - fullPrice * (rollback / 100);
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость работы " + servicePercentPrice);
