"use strict";

class First {
  hello() {
    console.log("Привет я метод родителя!");
  }
}

class Second extends First {
  hello() {
    // console.log("Начало 2");
    super.hello();
    console.log("А я наследуемый метод!");
  }
}

class Third extends Second {
  hello() {
    super.hello();
    console.log("Метод 3");
  }
}

const temp = new Third();
temp.hello();
