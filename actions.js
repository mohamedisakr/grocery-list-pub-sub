export function showSuccessAction(element, text) {
  element.classList.add("success");
  element.innerText = text;
  setTimeout(() => element.classList.remove("success"), 3000);
}

export function showAlertAction(element, text) {
  element.classList.add("alert");
  element.innerText = text;
  setTimeout(() => element.classList.remove("alert"), 3000);
}
