const books = document.querySelectorAll(".book");
const body = document.querySelector("body");
const links = document.querySelectorAll("h2 a");
const adv = document.querySelector(".adv");
const liInBook2 = books[0].querySelectorAll("li");
const liInBook5 = books[5].querySelectorAll("li");
const liInBook6 = books[2].querySelectorAll("li");
const liForBook6 = document.createElement("li");

console.log(books);

books[0].before(books[1]);
books[5].after(books[2]);
books[4].after(books[3]);
body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";
links[4].textContent = "Книга 3. this и Прототипы Объектов";
adv.remove();

liInBook2[3].after(liInBook2[6]);
liInBook2[6].after(liInBook2[8]);
liInBook2[9].after(liInBook2[2]);

liInBook5[1].after(liInBook5[9]);
liInBook5[4].after(liInBook5[2]);
liInBook5[7].after(liInBook5[5]);

liForBook6.textContent = "Глава 8: За пределами ES6";
liInBook6[8].after(liForBook6);
