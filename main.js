import ItemsHistory from "./displayItemsScreen.js";
import ItemsScreen from "./itemsScreen.js";

document.addEventListener("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad(event) {
  const container = document.querySelector("main");
  //   console.log(container);

  const itemsScreen = new ItemsScreen();
  itemsScreen.render(container);

  const displayItemsScreen = new ItemsHistory();
  displayItemsScreen.render(container);
  //   console.log(displayItemsScreen);
}
