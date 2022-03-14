import View from "./view.js";

class TierListView extends View {
  _parentElement = document.querySelector(".mscl-tier");
  _errorMessage = "Could not load an image";
  _message = "";

  _clearModal() {
    document.querySelector(".modal").innerHTML = "";
  }
  _generateMarkup() {
    //Empty tier list table
    return `
    <div id="sTier" class="tier-row flexBlock">
      <span class="tier-letter">S</span>
    </div>
    <div id="aTier" class="tier-row flexBlock">
      <span class="tier-letter">A</span>
    </div>
    <div  id="bTier" class="tier-row flexBlock">
      <span class="tier-letter">b</span>
    </div>
    <div  id="cTier" class="tier-row flexBlock">
      <span class="tier-letter">c</span>
    </div>
    <div  id="dTier" class="tier-row flexBlock">
      <span class="tier-letter">d</span>
    </div>
    <div  id="eTier" class="tier-row flexBlock">
      <span class="tier-letter">e</span> 
    </div>
   <a href="#"><div class="back">Back</div></a>`;
  }
  _generateItemMarkup(item) {
    //Markup for preview of exercise (image and title). Used in tier lis and modal vidow in variations section
    return `<section class="tier-item" data-id="${item.id}">
    <img
      src="./img/item_img/biceps/biceps_curl.jpg"
      alt="biceps curl"
      class="item-img"
    />
    <h2 class="item-title">${item.name}</h2>
  </section>`;
  }
  _generateStatBarMarkup(val) {
    //Markup for stat bar at the bottom of modal
    let markup = `<div class="stat-bar flexBlock">`;
    for (let i = 1; i < 6; i++) {
      //difficulty ranges from 1 to 5. Stat bar is divided into 5 parts, this function sets opacity to 0, according to input value
      markup += `<span style='opacity:${i > val ? 0 : 1}'>Level: ${i}</span>`;
    }
    markup += `</div><span>${
      ["Very low", "Low", "Moderate", "High", "Very High"][val - 1]
    }</span>`;

    return markup;
  }
  _generateModalMarkup(item) {
    //Modal window markup

    this._clearModal();

    //0) before generating modal itself, first create varation items preview, that gona be displayed in variation section
    const variations = item.variations
      .map((el) => this._data.find((e) => e.id === el))
      .filter((n) => n);

    //0.1) map every item.variation entry,
    //0.2) search _data for exercise, where id mathes item.variation element
    //0.3) filter answer, to clear array out of empty elements
    let variationMarkup = "";

    variations.forEach((e) => {
      variationMarkup += this._generateItemMarkup(e);
    });

    const tierLetter = ["s", "a", "b", "c", "d", "e"][item.tier];

    const markup = `<section class="modal-con" style="border-top: 8px solid var(--${tierLetter}-tier);">
    <span class="top-letter" style="background:var(--${tierLetter}-tier);">${tierLetter.toUpperCase()}</span>
    <h2 class="modal-title">${item.name}</h2>
    <div class="flexBlock">
      <img
        src="./img/modal/biceps/biceps_curl.gif"
        alt="biceps curl gif"
        class="modal-img"
      />
      <section class="modal-content">
        <div class="accordion">
          <div class="content-box">
            <div class="label"> Overview</div>
            <div class="content">
            <span>
            ${item.overview}  
          </span>
            </div>
          </div>
          <div class="content-box">
            <div class="label"> Variation</div>
            <div class="content">
            <div class="modal-variation flexBlock">
            ${variationMarkup}
            </div>
            </div>
          </div>
          <div class="content-box">
            <div class="label"> Exercise Statistics</div>
            <div class="content">
            <div class="modal-stats flexBlock">
            <div>
              <h3>Difficulty</h3>
     ${this._generateStatBarMarkup(item.difficulty)}
            </div>
            <div>
              <h3>Isolation</h3>
     ${this._generateStatBarMarkup(item.isolation)}
            </div>
            <div>
              <h3>Progression</h3>
     ${this._generateStatBarMarkup(item.progression)}
            </div>
          </div>
            </div>
          </div>
        </div>
        
        
      </section>
    </div>
  </section>`;

    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    modal.insertAdjacentHTML("afterbegin", markup);
  }

  _populateTierList() {
    //Add items to tierlist, in appropiate positions

    //0) get all rows of table
    const tierRows = document.querySelectorAll(".tier-row");
    this._data.forEach((el) => {
      //1) generate markup and inset it in every row
      tierRows[el.tier].insertAdjacentHTML(
        "beforeend",
        this._generateItemMarkup(el)
      );
    });
  }

  hideView() {
    this._parentElement.classList.add("hidden");
  }
  _hideModal(e) {
    if (e.target.closest(".modal-con")) return;
    this.classList.add("hidden");
  }
  _showModal(e) {
    // document.querySelector(".modal").classList.remove("hidden");

    //0) see if clicked target is .tier-item. If no, return
    if (!e.target.closest(".tier-item")) return;

    //1) get dataset value of clicked element
    const dataSet = e.target.closest(".tier-item").dataset.id;

    // Search for exercise in this._data, where id matches dataset
    const exercise = this._data.find((el) => el.id === dataSet);

    this._generateModalMarkup(exercise);
    Array.from(document.querySelectorAll(".modal-con .tier-item")).forEach(
      (el) => {
        el.addEventListener("click", this._showModal.bind(this));
      }
    );

    document
      .querySelector(".modal")
      .addEventListener("click", this._triggerAccordion);
    document.querySelector(".modal").addEventListener("click", this._hideModal);
  }

  init() {
    //show view
    this._parentElement.classList.remove("hidden");

    this._populateTierList();

    this._parentElement.addEventListener("click", this._showModal.bind(this));

    // console.log(tierItems);
  }
}
export default new TierListView();
