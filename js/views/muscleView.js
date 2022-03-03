import View from "./view.js";

class MuscleView extends View {
  _parentElement = document.querySelector(".mscl-prev");
  _errorMessage = "Could not load an image";
  _message = "";

  _muscleFrontImg = document.querySelector(".mscl-front");
  _muscleBackImg = document.querySelector(".mscl-back");

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

    if (e.target.parentElement !== musclePart) {
      window.location.hash = "";
      this._id = "";
      this._parentElement.classList.add("hidden");
      this._highlightMuscle();
    }
  }
  _hideMuscleParts() {
    //decide if id matches front muscle group to determine with side should be rendered
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
      "quads",
      "claves",
    ];

    if (muscleFront.some((val) => val === this._id))
      this._muscleBackImg.classList.add("hidden");
    else this._muscleFrontImg.classList.add("hidden");
  }

  _generateMarkup() {
    return `
        <img src="./img/preview/biceps.jpg" alt="biceps" />
            <h2 class="prev-title">Biceps</h2>
            <div class="accordion-content">
              <h3>Muscle structure</h3>
              <div class="expand hidden">XD</div>
            </div>
            <div class="accordion-content">
              <h3>Function</h3>
              <div class="expand">
                <span
                  >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nulla suscipit iusto incidunt harum sed veniam voluptates
                  reiciendis sapiente nemo cupiditate?</span
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

    document.body.addEventListener("click", this._resetView.bind(this));
  }

  addHandler(handler) {
    window.addEventListener("load", handler);
    window.addEventListener("hashchange", handler);
  }

  showPreview(isHash = true) {
    //show muscle preview window
    if (isHash) this._parentElement.classList.remove("hidden");
    else this._parentElement.classList.add("hidden");
  }
}
export default new MuscleView();
