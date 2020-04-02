// import pubsub from "./pubsub.js";
import { pubsub } from "./pubsub.js";
import { showSuccessAction, showAlertAction } from "./actions.js";

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
    const itemTextInput = document.querySelector(".addItems-input");
    const val = itemTextInput.value;
    itemTextInput.value = "";
    // console.log(val);
    // show actions based one input value
    const action = document.querySelector(".addItems-action");
    if (val === "") {
      showAlertAction(action, "Please add grocery item");
      return;
    } else {
      showSuccessAction(
        action,
        `${val} added to the grocery list successfully`
      );
    }
    // debugger;
    // const mediator = new pubsub();
    // mediator.publish("itemAdd", val);
    // this.itemList.push(val);
    // localStorage.setItem("groc", JSON.stringify(this.itemList));
    pubsub.publish("itemAdded", val);
    console.log(`Items Screen: Just itemAdd ${val}`);
  };
}
