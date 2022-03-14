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

  _triggerAccordion(e) {
    const accordions = Array.from(
      // document.querySelectorAll(".mscl-prev .accordion-content h3")
      document.querySelectorAll(".accordion-content")
    );
    // //0)Check if click is inside any accordion. If so, toggle 'colapse' class to content and 'active' class to arrow
    if (e.target.closest(".content-box")) {
      e.target.closest(".content-box").classList.toggle("active");
    }
  }
  renderSpinner(el) {
    const markup = `
    <div class="loader">
    <div class="square"></div>
    <div class="square"></div>
    <div class="square last"></div>
    <div class="square clear"></div>
    <div class="square"></div>
    <div class="square last"></div>
    <div class="square clear"></div>
    <div class="square"></div>
    <div class="square last"></div>
  </div>
    `;
    this._clear();
    el.insertAdjacentHTML("afterbegin", markup);
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
