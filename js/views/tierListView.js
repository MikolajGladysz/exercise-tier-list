import View from "./view.js";

class TierListView extends View {
  _parentElement = document.querySelector(".mscl-tier");
  _errorMessage = "Could not load an image";
  _message = "";

  _muscleFrontImg = document.querySelector(".mscl-front");
  _muscleBackImg = document.querySelector(".mscl-back");
  _sectionTitle = document.querySelector(".section-title");
  _id = "";

  hideView() {
    this._parentElement.classList.add("hidden");
  }

  init() {
    console.log("here");
    this._parentElement.classList.remove("hidden");
  }
}
export default new TierListView();
