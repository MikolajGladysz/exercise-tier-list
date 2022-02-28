import View from "./view.js";

class MuscleView extends View {
  _parentElement = document.querySelector(".mscl-con");
  _errorMessage = "Could not load an image";
  _message = "";

  highlightMuscle(id) {
    // 1) Get all muscle images
    const collection = document.querySelectorAll(".muscle");
    // 2) Check which muscle matech hash and setting it to active
    collection.forEach((el) => {
      el.classList.remove("active");
      if (el.alt.toLowerCase() === id) {
        el.classList.add("active");
      }
    });
  }

  addHandler(handler) {
    // document.body.addEventListener("click", handler)
    window.addEventListener("load", handler);
    window.addEventListener("hashchange", handler);

    document.body.addEventListener("click", this._hideMuscleParts.bind(this));
  }

  _hideMuscleParts(e) {
    if (!e) return;
    const musclePart = e.target.closest(".mscl-img > a")?.parentElement;
    const muscleFront = document.querySelector(".mscl-front");
    const muscleBack = document.querySelector(".mscl-back");

    // 0) check if click is outside of image, to reset view
    if (
      muscleBack.classList.contains("hidden") ||
      muscleFront.classList.contains("hidden")
    ) {
      if (e.target.parentElement !== musclePart) {
        muscleBack.classList.remove("hidden");
        muscleFront.classList.remove("hidden");
        window.location.hash = "";
        this.highlightMuscle("");
      }
    }

    if (!musclePart) return;

    // 1) Hidding muscle part, to make room for muslce preview window
    if (musclePart.classList.contains("mscl-front"))
      muscleBack.classList.add("hidden");
    else muscleFront.classList.add("hidden");
  }
}
export default new MuscleView();
