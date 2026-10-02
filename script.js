"use strict";

const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.createElement = function () {
    let element;

    if (selector[0] === ".") {
      element = document.createElement("div");
      element.className = this.selector.slice(1);
    } else if (selector[0] === "#") {
      element = document.createElement("p");
      element.id = this.selector.slice(1);
    }

    element.style.cssText = ` 
      height: ${this.height};
      width: ${this.width};
      background-color: ${this.bg};
      font-size: ${this.fontSize};
      position: absolute;`;

    document.body.append(element);
    return element;
  };
};

const newElem = new DomElement(".block", "100px", "100px", "lightblue", "24px");

const square = newElem.createElement();

document.addEventListener("keydown", (e) => {
  // console.log(e);
  // console.log(square);
  let top = square.offsetTop;
  let left = square.offsetLeft;

  console.log(top, left);
  if (e.key === "ArrowUp") {
    square.style.top = top - 10 + "px";
  }
  if (e.key === "ArrowDown") {
    square.style.top = top + 10 + "px";
  }
  if (e.key === "ArrowLeft") {
    square.style.left = left - 10 + "px";
  }
  if (e.key === "ArrowRight") {
    square.style.left = left + 10 + "px";
  }
});
