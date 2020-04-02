// import pubsub from "./pubsub.js";
import { pubsub } from "./pubsub.js";

export default class ItemsHistory {
  constructor() {
    // localStorage.setItem("groc", JSON.stringify(this.itemList));
    this.itemList = localStorage.getItem("groc")
      ? JSON.parse(localStorage.getItem("groc"))
      : [];
    // console.log(`local storage : ${localStorage.getItem("groc")}`);
    // console.log(this.itemList);
  }

  render = container => {
    // console.log("Transactions Form initailized");
    const template = document.querySelector("#displayItemsTemplate");
    const displayItemsContainer = template.content.cloneNode(true);

    // add click event listener to clear all list item button
    // const clearButton = document.querySelector(".displayItems-clear");
    // clearButton.addEventListener('click',this.handleClearAllItems)
    displayItemsContainer
      .querySelector("button")
      .addEventListener("click", this.handleClearAllItems);

    // add click event listener to list item
    const ul = displayItemsContainer.querySelector("ul");
    ul.addEventListener("click", this.handleItemDeleted);
    // console.log(ul);

    container.appendChild(displayItemsContainer);
    this.displayItems(this.itemList);
    // const mediator = new pubsub();
    // mediator.subscribe("itemAdd", this.handleItemAdded);
    pubsub.subscribe("itemAdded", this.handleItemAdded);
  };

  handleItemAdded = val => {
    console.log(`Item History: I hear that ${val} was added`);
    // debugger;
    // add the new item to the list
    // See if local storage working perfectly
    this.itemList.push(val);
    localStorage.setItem("groc", JSON.stringify(this.itemList));

    //tell everyone that an actor has been added to the list
    console.log("Item History: itemUpdated the list");
    // const mediator = new pubsub();
    // mediator.publish("itemUpdated", this.itemList);

    pubsub.publish("itemUpdated", val); //this.itemList

    // re-display the item list
    this.displayItems(this.itemList);
  };

  handleItemDeleted = event => {
    // get the current (clicked) item
    const currentItem = event.target.closest("li");

    // get the text
    const val = currentItem.textContent;

    // remove the removed element text from the array
    this.itemList = this.itemList.filter(
      item => item.toLowerCase() !== val.toLowerCase()
    );

    // update local storage
    localStorage.setItem("groc", JSON.stringify(this.itemList));

    // remove the HTML element from the DOM
    currentItem.parentElement.removeChild(currentItem);

    // publish itemDeleted event
    pubsub.publish("itemDeleted", this.itemList);
  };

  displayItems = list => {
    const groceryList = document.querySelector(".grocery-list");
    groceryList.innerHTML = "";
    console.log(list);

    let df = document.createDocumentFragment();
    list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      df.appendChild(li);
    });
    groceryList.appendChild(df);
  };

  handleClearAllItems = event => {
    // clear all list items
    const listItemElements = [...document.querySelectorAll("li")];
    console.log(listItemElements);
    listItemElements.forEach(item => item.parentElement.removeChild(item));

    // clear local storage
    localStorage.removeItem("groc");
  };
}
