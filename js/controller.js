import * as model from "./model.js";

const controlMuscles = function () {
  const id = window.location.hash.slice(1);

  if (!id) return;

  //0) update muscle preview view
  console.log(id);
};

const init = function () {
  controlMuscles();
  console.log("dupa");
};
init();
