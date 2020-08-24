"use strict";

let tabs = document.querySelectorAll(".tabs-block__tab");
const mainBlocks = document.querySelectorAll(".main-block__wrapper");
const inputBlock = document.querySelector(".input-block");

let addHidden = function () {
  for (let mainBlock of mainBlocks) {
    mainBlock.classList.add("hidden");
  }
  for (let tab of tabs) {
    tab.classList.remove("current-tab");
  }
};

addHidden();

tabs[0].classList.add("current-tab");
mainBlocks[0].classList.remove("hidden");

for (let tab of tabs) {
  tab.onclick = function () {
    addHidden();

    tab.classList.add("current-tab");
    mainBlocks[tab.dataset.type].classList.remove("hidden");

    if (tab.dataset.type == 0) {
      inputBlock.classList.remove("hidden");
    } else {
      inputBlock.classList.add("hidden");
    }
  };
}
//переключает вкладки

let itemsList;
let items;
const form = document.querySelector(".input-block__form");
const input = document.querySelector("#add-interest");

let setLocalItems = (items) => {
  let arr = [];
  for (let item of items) {
    arr.push(item.textContent);
  }
  arr = JSON.stringify(arr);
  localStorage.setItem("items", arr);
};

let getItemsList = () => {
  itemsList = document.querySelector(".interests-list");
};

let getItems = () => {
  items = document.querySelectorAll(".interests-list__item");
};

let addItemsClick = () => {
  getItems();
  for (let item of items) {
    item.onclick = function () {
      item.remove();
      getItems();
      setLocalItems(items);
    };
  }
};

function addNewItem() {
  getItemsList();
  let newItem = document.createElement("li");
  newItem.classList.add("interests-list__item");
  newItem.textContent = input.value;
  input.value = "";
  itemsList.prepend(newItem);
  addItemsClick();
  setLocalItems(items);
}

form.onsubmit = function (evt) {
  evt.preventDefault();
  addNewItem();
};

addItemsClick();

let getLokalItems = () => {
  let arr = JSON.parse(localStorage.getItem("items"));

  if (arr !== null) {
    getItemsList();
    while (itemsList.lastChild) {
      itemsList.removeChild(itemsList.lastChild);
    }
    for (let ar of arr) {
      let newItem = document.createElement("li");
      newItem.classList.add("interests-list__item");
      newItem.textContent = ar;
      itemsList.append(newItem);
      addItemsClick();
    }
  }
};

getLokalItems();
//делает вот это вот все с интересами

let infoValues = document.querySelectorAll(".info-value");

for (let infoValue of infoValues) {
  if (localStorage.getItem(infoValue.id)) {
    infoValue.textContent = localStorage.getItem(infoValue.id);
  }
}
//проверяет localStorage

document.onclick = function (element) {
  if (element.target.classList.contains("info-value")) {
    let hiddenElement = element.target;
    hiddenElement.classList.add("hidden");
    let parent = element.target.parentNode;
    let input = document.createElement("input");
    input.value = element.target.textContent;
    parent.append(input);
    input.focus();
    input.onblur = function () {
      if (hiddenElement.textContent !== input.value) {
        let inputValue = input.value;
        localStorage.setItem(hiddenElement.id, inputValue);
      }
      hiddenElement.textContent = input.value;
      input.remove();
      hiddenElement.classList.remove("hidden");
    };
  }
};
//делает поля для редактирования информации
