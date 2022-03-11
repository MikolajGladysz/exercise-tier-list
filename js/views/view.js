export default class View {
  _data;

  render(data) {
    //0) check is data exsist and is array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage(undefined, ture);

    this._data = data;
    //1)generating markup
    const markup = this._generateMarkup();

    //2)clear view and insert markup
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        Loading...
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message, isError = false) {
    if (isError) message = this._errorMessage;
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
