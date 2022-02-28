import * as model from "./model.js";

import muscleView from "./views/muscleView.js";

const controlMuscles = function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  //0) update muscle preview view
};

const init = function () {
  controlMuscles();
  muscleView.hideMuscleParts();
};
init();
