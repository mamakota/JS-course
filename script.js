"use strict";

class Employee {
  constructor(firstName, lastName, age, organization, hasChildren, position) {
    this.id = Math.floor(Math.random() * 1000000);
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
    this._organization = organization;
    this._hasChildren = hasChildren;
    this._position = position;
  }

  getFirstName() {
    return this._firstName;
  }

  getLastName() {
    return this._lastName;
  }

  getAge() {
    return this._age;
  }

  getOrganization() {
    return this._organization;
  }

  getHasChildren() {
    return this._hasChildren;
  }

  getPosition() {
    return this._position;
  }

  setFirstName(value) {
    this._firstName = value;
  }

  setLastName(value) {
    this._lastName = value;
  }

  setAge(value) {
    this._age = value;
  }

  setOrganization(value) {
    this._organization = value;
  }

  setHasChildren(value) {
    this._hasChildren = value;
  }

  setPosition(value) {
    this._position = value;
  }
}

class Mechanic extends Employee {
  constructor(
    firstName,
    lastName,
    age,
    organization,
    hasChildren,
    position,
    category,
    specialization,
  ) {
    super(firstName, lastName, age, organization, hasChildren, position);

    this._category = category;
    this._specialization = specialization;
  }

  getCategory() {
    return this._category;
  }
  getSpecialization() {
    return this._specialization;
  }

  setCategory(value) {
    this._category = value;
  }
  setSpecialization(value) {
    this._specialization = value;
  }
}

class Driver extends Employee {
  constructor(
    firstName,
    lastName,
    age,
    organization,
    hasChildren,
    position,
    licenseCategory,
    experience,
  ) {
    super(firstName, lastName, age, organization, hasChildren, position);

    this._licenseCategory = licenseCategory;
    this._experience = experience;
  }

  getLicenseCategory() {
    return this._licenseCategory;
  }
  getExperience() {
    return this._experience;
  }

  setLicenseCategory(value) {
    this._licenseCategory = value;
  }
  setExperience(value) {
    this._experience = value;
  }
}

function setLocalStorage() {
  localStorage.setItem("list", JSON.stringify(employees));
  console.log(employees);
}

function getLocalStorage() {
  const data = localStorage.getItem("list");

  if (!data) {
    return [];
  }

  const dataToObject = JSON.parse(data);

  const dataThroughConstructors = dataToObject.map((item) => {
    if (item._position === "mechanic") {
      const obj = new Mechanic(
        item._firstName,
        item._lastName,
        item._age,
        item._organization,
        item._hasChildren,
        item._position,
        item._category,
        item._specialization,
      );

      obj.id = item.id;
      return obj;
    }

    if (item._position === "driver") {
      const obj = new Driver(
        item._firstName,
        item._lastName,
        item._age,
        item._organization,
        item._hasChildren,
        item._position,
        item._licenseCategory,
        item._experience,
      );

      obj.id = item.id;
      return obj;
    }

    return item;
  });

  console.log(dataThroughConstructors);
  return dataThroughConstructors;
}

const form = document.querySelector("#employeeForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const age = document.querySelector("#age");
const organization = document.querySelector("#organization");
const hasChildren = document.querySelector("#hasChildren");
const employeePosition = document.querySelector("#employeePosition");
const mechanicFields = document.querySelector("#mechanicFields");
const category = document.querySelector("#category");
const specialization = document.querySelector("#specialization");
const driverFields = document.querySelector("#driverFields");
const licenseCategory = document.querySelector("#licenseCategory");
const experience = document.querySelector("#experience");
const employeeTableBody = document.querySelector("#employeeTableBody");
let employees = getLocalStorage();
console.log(employees);

employeePosition.addEventListener("change", function () {
  mechanicFields.classList.add("hidden");
  driverFields.classList.add("hidden");
  category.required = false;
  specialization.required = false;
  licenseCategory.required = false;
  experience.required = false;

  if (this.value === "mechanic") {
    mechanicFields.classList.remove("hidden");
    category.required = true;
    specialization.required = true;
  }

  if (this.value === "driver") {
    driverFields.classList.remove("hidden");
    licenseCategory.required = true;
    experience.required = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let employee;
  const firstNameVal = firstName.value;
  const lastNameVal = lastName.value;
  const ageVal = age.value;
  const organizationVal = organization.value;
  const hasChildrenVal = hasChildren.checked;
  const employeePositionVal = employeePosition.value;

  if (employeePositionVal === "mechanic") {
    const categoryVal = category.value;
    const specializationVal = specialization.value;

    employee = new Mechanic(
      firstNameVal,
      lastNameVal,
      ageVal,
      organizationVal,
      hasChildrenVal,
      employeePositionVal,
      categoryVal,
      specializationVal,
    );
  }

  if (employeePositionVal === "driver") {
    const licenseCategoryVal = licenseCategory.value;
    const experienceVal = experience.value;

    employee = new Driver(
      firstNameVal,
      lastNameVal,
      ageVal,
      organizationVal,
      hasChildrenVal,
      employeePositionVal,
      licenseCategoryVal,
      experienceVal,
    );
  }

  employees.push(employee);
  render();
  setLocalStorage();
  form.reset();
});

function render() {
  employeeTableBody.innerHTML = "";
  employees.forEach((item) => {
    const tr = document.createElement("tr");
    console.log(item);

    const itemCategory =
      item.getPosition() === "mechanic" ? item.getCategory() : "  ";
    const itemSpecialization =
      item.getPosition() === "mechanic" ? item.getSpecialization() : "  ";
    const itemLicenseCategory =
      item.getPosition() === "driver" ? item.getLicenseCategory() : "  ";
    const itemExperience =
      item.getPosition() === "driver" ? item.getExperience() : "  ";

    tr.innerHTML = `
      <td>${item.getFirstName()}</td>
      <td>${item.getLastName()}</td>
      <td>${item.getAge()}</td>
      <td>${item.getOrganization()}</td>
      <td>${item.getHasChildren()}</td>
      <td>${item.getPosition()}</td>
      <td>${itemCategory}</td>
      <td>${itemSpecialization}</td>
      <td>${itemLicenseCategory}</td>
      <td>${itemExperience}</td>
      <td><button class="delete-btn" id="${item.id}">Удалить</button></td>
    `;

    employeeTableBody.append(tr);
  });

  document.querySelectorAll(".delete-btn").forEach((item) => {
    item.addEventListener("click", function () {
      const itemId = item.id;
      const index = employees.findIndex((employee) => {
        employee.id === itemId;
      });
      employees.splice(index, 1);
      render();
      setLocalStorage();
    });
  });
}

render();
