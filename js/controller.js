import * as model from "./model.js";

import muscleView from "./views/muscleView.js";

const controlMuscles = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  //   muscleView.highlightMuscle(id);
  muscleView.init(id);

  console.log(id);
  if (id !== "") {
    muscleView.showPreview(true);
    muscleView.render("XDDD");
  } else muscleView.showPreview(false);
};

const init = function () {
  muscleView.addHandler(controlMuscles);
};
init();
