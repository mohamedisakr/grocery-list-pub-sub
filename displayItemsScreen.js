export default class ItemsHistory {
  render(container) {
    // console.log("Transactions Form initailized");
    const template = document.querySelector("#displayItemsTemplate");
    const displayItemsContainer = template.content.cloneNode(true);
    // const form =
    displayItemsContainer
      .querySelector("button")
      .addEventListener("click", this.handleClearAllItems);
    container.appendChild(displayItemsContainer);
  }

  handleClearAllItems(event) {
    console.log("Button clicked!!!");
  }
}
