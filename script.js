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
      font-size: ${this.fontSize};`;

    element.textContent = "Текст";

    document.body.append(element);
  };
};

const newElem = new DomElement(".block", "200px", "300px", "lightblue", "24px");

newElem.createElement();
