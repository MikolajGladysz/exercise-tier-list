import View from "./view.js";

class MuscleView extends View {
  _parentElement = document.querySelector(".mscl-prev");
  _errorMessage = "Could not load an image";
  _message = "";

  _muscleFrontImg = document.querySelector(".mscl-front");
  _muscleBackImg = document.querySelector(".mscl-back");
  _sectionTitle = document.querySelector(".section-title");
  _id = "";
  _listener = false;

  hideView() {
    this._parentElement.classList.add("hidden");
    document.querySelector(".mscl-con").classList.add("hidden");
    this._sectionTitle.classList.add("hidden");
    // document.body.removeEventListener("click", this._resetView, false);
    // console.log("removed");
  }
  hidePreview() {
    this._parentElement.classList.add("hidden");
    this._highlightMuscle();
  }
  _highlightMuscle() {
    // 1) Get all muscle part
    const collection = document.querySelectorAll(".muscle");
    this._id = window.location.hash.slice(1).split("/")[0];
    // 2) Check which muscle matech hash and setting it to active
    collection.forEach((el) => {
      el.classList.remove("active");
      if (el.alt.toLowerCase() === this._id) {
        el.classList.add("active");
      }
    });
  }

  _resetView(e) {
    if (!e) return;
    if (window.location.hash.slice(1).split("/").length === 2) return;
    const musclePart = e.target.closest(".mscl-img > a")?.parentElement;
    // 0) check if click is outside of image, to reset view
    if (
      e.target.parentElement !== musclePart &&
      !e.target.closest(".mscl-prev")
    ) {
      //1) to reset view simpy change hash to empty
      window.location.hash = "";
    }
  }

  _hideMuscleParts() {
    // const muscleBack = [
    //   "shoulders",
    //   "traps",
    //   "triceps",
    //   "lats",
    //   "forearms",
    //   "glutes",
    //   "ham",
    //   "calves",
    // ];
    const muscleFront = [
      "shoulders",
      "traps",
      "chest",
      "biceps",
      "forearms",
      "oblique",
      "abs",
      "quadriceps",
      "calves",
    ];

    //0)reset muscle visibility

    this._muscleFrontImg.classList.remove("hidden");
    this._muscleBackImg.classList.remove("hidden");

    //1)decide if id matches front muscle group to determine with side should be rendered

    if (muscleFront.some((val) => val === this._id))
      this._muscleBackImg.classList.add("hidden");
    else this._muscleFrontImg.classList.add("hidden");
  }

  _generateMarkup() {
    return `
        <img src="${this._data.imgURL}" alt="${this._data.name}" />
            <h2 class="prev-title">${
              this._data.name[0].toUpperCase() + this._data.name.slice(1)
            }</h2>
            
            <div class="accordion">
              <div class="content-box">
                <div class="label"> Muscle Structure</div>
                <div class="content">
                  <span>${this._data.structure}</span>
                </div>
              </div>
              <div class="content-box">
                <div class="label"> Function</div>
                <div class="content">
                  <span>${this._data.function}</span>
                </div>
              </div>
            </div>
            <button class="tierlist-btn">Go to tier list!</button>
        `;
  }

  init(id) {
    //initialization
    this._listener = false;

    this._id = id;
    this._hideMuscleParts();
    this._highlightMuscle();

    //checking if listener is added to avoid couple listeners
    if (!this._listener) {
      this._parentElement.addEventListener("click", this._triggerAccordion);
      document.body.addEventListener("click", this._resetView, false);
      this._listener = true;

      //handle clicking on 'go to tierlist" button
      const btn = this._parentElement.querySelector(".tierlist-btn");
      btn.addEventListener("click", () => {
        window.location.hash = this._data.name.toLowerCase() + "/tierlist";
      });
    }
  }

  showPreview() {
    //show muscle preview window
    this._sectionTitle.classList.add("hidden");
    this._parentElement.classList.remove("hidden");
    document.querySelector(".mscl-con").classList.remove("hidden");
  }
  showMuscleImage() {
    //show muscle front, muscle back and .mscl-con container
    document.querySelector(".mscl-con").classList.remove("hidden");

    this._muscleBackImg.classList.remove("hidden");
    this._muscleFrontImg.classList.remove("hidden");
  }
}
export default new MuscleView();
