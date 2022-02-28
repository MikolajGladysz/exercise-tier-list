import * as model from "./model.js";

import muscleView from "./views/muscleView.js";

const controlMuscles = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  //   muscleView.highlightMuscle(id);
  muscleView.highlightMuscle(id);
};

const init = function () {
  muscleView.addHandler(controlMuscles);
};
init();
