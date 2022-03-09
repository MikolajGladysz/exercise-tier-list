import * as model from "./model.js";

import muscleView from "./views/muscleView.js";
import tierListView from "./views/tierListView.js";

const controlMuscles = async function () {
  const id = window.location.hash.slice(1).split("/")[0];
  if (!id) return;
  if (window.location.hash.slice(1).split("/")[1] !== "tierlist") {
    tierListView.hideView();

    //0) initialization of muscle view
    muscleView.init(id);

    //1) check if muscle preview window should be rendered or not
    if (id !== "") {
      muscleView.showPreview(true);
      await model.loadMuscle(id);
      muscleView.render(model.state.muscle);
    } else muscleView.showPreview(false);

    muscleView.goToTierList();
  }
  if (window.location.hash.slice(1).split("/")[1] === "tierlist") {
    tierListView.init();
    muscleView.hideView();
  }
};
const controlViews = function () {
  console.log(window.location.hash);
};

const init = function () {
  window.addEventListener("hashchange", controlViews);
  muscleView.addHandler(controlMuscles);
};
init();
