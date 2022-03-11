import View from "./view.js";

class TierListView extends View {
  _parentElement = document.querySelector(".mscl-tier");
  _errorMessage = "Could not load an image";
  _message = "";

  _muscleFrontImg = document.querySelector(".mscl-front");
  _muscleBackImg = document.querySelector(".mscl-back");
  _sectionTitle = document.querySelector(".section-title");
  _id = "";

  _generateMarkup() {
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
    <div class="back">Back</div>`;
  }

  _populateTierList() {
    const sTier = document.querySelector("#sTier");
    const aTier = document.querySelector("#aTier");
    const bTier = document.querySelector("#bTier");
    const cTier = document.querySelector("#cTier");
    const dTier = document.querySelector("#dTier");
    const eTier = document.querySelector("#eTier");

    sTier.insertAdjacentHTML("beforeend", `<span>DUPA</span>`);
    sTier.insertAdjacentHTML("beforeend", `<span>DUPA</span>`);
    sTier.insertAdjacentHTML("beforeend", `<span>DUPA</span>`);
    sTier.insertAdjacentHTML("beforeend", `<span>DUPA</span>`);

    this._data.forEach((el) => {
      console.log(el);
      console.log(el.tier);
    });
  }

  hideView() {
    this._parentElement.classList.add("hidden");
  }

  init() {
    this._parentElement.classList.remove("hidden");

    this._populateTierList();
  }
}
export default new TierListView();
