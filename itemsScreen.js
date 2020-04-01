export default class ItemsScreen {
  render(container) {
    // console.log("Transactions Form initailized");
    const template = document.querySelector("#addItemsTemplate");
    const form = template.content.cloneNode(true);
    // form.addEventListener("submit", this.handleAddItem);
    form.querySelector("button").addEventListener("click", this.handleAddItem);
    container.appendChild(form);
  }
  handleAddItem(event) {
    event.preventDefault();
    console.log("handleAddItem clicked!!!");
  }
}
