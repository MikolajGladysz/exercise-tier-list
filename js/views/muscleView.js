import View from "./view.js";

class MuscleView extends View {
  _parentElement = document.querySelector(".mscl-prev");
  _errorMessage = "Could not load an image";
  _message = "";

  _muscleFrontImg = document.querySelector(".mscl-front");
  _muscleBackImg = document.querySelector(".mscl-back");
  _sectionTitle = document.querySelector(".section-title");
  _id = "";

  _highlightMuscle() {
    //0) check if there is no id and muscle front and back should be rendered
    if (this._id === "") {
      this._muscleFrontImg.classList.remove("hidden");
      this._muscleBackImg.classList.remove("hidden");
    }

    // 1) Get all muscle part
    const collection = document.querySelectorAll(".muscle");

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
    const musclePart = e.target.closest(".mscl-img > a")?.parentElement;

    // 0) check if click is outside of image, to reset view
    if (
      e.target.parentElement !== musclePart &&
      !e.target.closest(".mscl-prev")
    ) {
      window.location.hash = "";
      this._id = "";
      this._sectionTitle.classList.remove("hidden");

      this._parentElement.classList.add("hidden");
      this._highlightMuscle();
    }
  }
  _triggerAccordion(e) {
    const accordions = Array.from(
      document.querySelectorAll(".mscl-prev .accordion-content h3")
    );

    //0)Check if click is inside any accordion. If so, toggle 'colapse' class to content and 'active' class to arrow
    if (accordions.some((val) => val === e.target)) {
      const content = e.target.closest(".accordion-content").children[1];
      content.classList.toggle("colapse");

      e.target
        .closest(".accordion-content")
        .children[0].children[0].classList.toggle("active");
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
    //   "claves",
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
      "claves",
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
            <div class="accordion-content">
              <h3>Muscle structure  <span class="arrow active">arrow</span></h3>
              <div class="expand"><span>${this._data.structure}</span></div>
            </div>
            <div class="accordion-content">
              <h3>Function  <span class="arrow">arrow</span></h3>
              <div class="expand colapse">
                <span
                  >${this._data.function}</span
                >
              </div>
            </div>
            <button class="tierlist-btn">Go to tier list!</button>
        `;
  }

  init(id) {
    //initialization
    this._id = id;

    this._highlightMuscle();
    this._hideMuscleParts();
    // const accord = document.querySelector(".mscl-prev .accordion-content h3");
    // accord.addEventListener("click", (e) => {
    //   console.log(e);
    // });
    this._parentElement.addEventListener("click", this._triggerAccordion);
    document.body.addEventListener("click", this._resetView.bind(this));
  }

  addHandler(handler) {
    window.addEventListener("load", handler);
    window.addEventListener("hashchange", handler);
  }

  showPreview(isHash = true) {
    //show muscle preview window
    if (isHash) {
      this._sectionTitle.classList.add("hidden");
      this._parentElement.classList.remove("hidden");
    } else {
      this._sectionTitle.classList.remove("hidden");
      this._parentElement.classList.add("hidden");
    }
  }
}
export default new MuscleView();
