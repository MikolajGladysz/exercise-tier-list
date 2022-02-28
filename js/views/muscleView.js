import View from "./view.js";

class MuscleView extends View {
  _parentElement = document.querySelector(".mscl-con");
  _errorMessage = "Could not load an image";
  _message = "";

  hideMuscleParts() {
    document.body.addEventListener("click", function (e) {
      const musclePart = e.target.closest(".mscl-img > a")?.parentElement;
      const muscleFront = document.querySelector(".mscl-front");
      const muscleBack = document.querySelector(".mscl-back");

      if (
        muscleBack.classList.contains("hidden") ||
        muscleFront.classList.contains("hidden")
      ) {
        if (e.target.parentElement !== musclePart) {
          muscleBack.classList.remove("hidden");
          muscleFront.classList.remove("hidden");
        }
      }

      if (!musclePart) return;
      if (musclePart.classList.contains("mscl-front"))
        muscleBack.classList.add("hidden");
      else muscleFront.classList.add("hidden");
    });
  }
}
export default new MuscleView();
