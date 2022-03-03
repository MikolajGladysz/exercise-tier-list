import * as model from "./model.js";

import muscleView from "./views/muscleView.js";

const controlMuscles = function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  //0) initialization of muscle view
  muscleView.init(id);

  //1) check if muscle preview window should be rendered or not
  if (id !== "") {
    muscleView.showPreview(true);
    muscleView.render("XDDD");
  } else muscleView.showPreview(false);
};

const init = function () {
  muscleView.addHandler(controlMuscles);
};
init();
