// page controls
const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const submit = document.querySelector(".addItems-submit");

const list = document.querySelector(".grocery-list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

// event listeners
submit.addEventListener("click", addItem);
document.addEventListener("DOMContentLoaded", displayGroceryList);
clear.addEventListener("click", clearAllItems);
list.addEventListener("click", removeCurrentItem);

// functions
// Add new item
function addItem(event) {
  event.preventDefault();
  let val = input.value;
  if (val === "") {
    showAlertAction(addItemsAction, "Please add grocery item");
  } else {
    createItem(val);
    updateStorage(val);
    showSuccessAction(addItemsAction, `${val} added successfully to the list`);
  }
}

// add new grocery item
function createItem(val) {
  const groceryItem = document.createElement("div");
  groceryItem.classList.add("grocery-item");
  groceryItem.innerHTML = `
    <h4 class="grocery-item__title">${val.toLowerCase()}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>`;
  list.appendChild(groceryItem);
}

// Dispaly list from local storage
function displayGroceryList() {
  let groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  if (groceryList.length === 0) {
    showSuccessAction(displayItemsAction, "No items. Please add one");
  } else {
    // loop through each item and call createItem function for each item
    groceryList.forEach(item => createItem(item));
  }
}

// clear all grocery list items
function clearAllItems() {
  localStorage.removeItem("groceryList");
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    showAlertAction(displayItemsAction, "All items deleted");
    items.forEach(item => list.removeChild(item));
  } else {
    showSuccessAction(displayItemsAction, "No items. Please add one");
  }
}
/*
    <div class="grocery-item">
      <h4 class="grocery-item__title">item</h4>
      <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
      </a>
    </div> 
*/
function removeCurrentItem(event) {
  event.preventDefault();
  // console.log(event.target);
  const link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    const text = link.previousElementSibling.innerHTML;
    // console.log(text);
    const groceryItem = event.target.parentElement.parentElement;
    list.removeChild(groceryItem);
    showSuccessAction(displayItemsAction, `${text} remove from list`);
    removetItemFromStorage(text);
  }
}
let lst = ["Level", "up", "your", "coding", "skills"];
lst = lst.filter(item => item !== "level");

function showSuccessAction(element, text) {
  // set class to success
  element.classList.add("success");
  // set text
  element.innerText = text;
  // show it for 3 seconds
  setTimeout(() => {
    element.classList.remove("success");
  }, 3000);
  input.value = "";
}

function showAlertAction(element, text) {
  // set class to success
  element.classList.add("alert");
  // set text
  element.innerText = text;
  // show it for 3 seconds
  setTimeout(() => {
    element.classList.remove("alert");
  }, 3000);
  input.value = "";
}

// update local storage
function updateStorage(val) {
  let groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  groceryList.push(val.toLowerCase());
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function removetItemFromStorage(val) {
  let groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  groceryList = groceryList.filter(
    item => item.toLowerCase() !== val.toLowerCase()
  );
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}
