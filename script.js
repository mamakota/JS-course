let title = "Project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 10;
let rollback = 20;
let fullPrice = 30;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(
  "Процент отката посреднику за работу " + fullPrice * (rollback / 10),
);
