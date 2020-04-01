// import pubsub from "./pubsub.js";
import { pubsub } from "./pubsub.js";

export default class ItemsScreen {
  constructor() {
    this.itemList = [];
  }

  render = container => {
    const template = document.querySelector("#addItemsTemplate");
    const form = template.content.cloneNode(true);
    form.querySelector("button").addEventListener("click", this.handleAddItem);
    container.appendChild(form);
  };

  handleAddItem = event => {
    event.preventDefault();
    const submitButton = document.querySelector(".addItems-input");
    const val = submitButton.value;
    submitButton.value = "";
    console.log(val);
    // debugger;
    // const mediator = new pubsub();
    // mediator.publish("itemAdd", val);
    pubsub.publish("itemAdded", val);
    console.log(`Items Screen: Just itemAdd ${val}`);
  };
}
