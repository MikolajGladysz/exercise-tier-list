import * as model from "./model.js";

import muscleView from "./views/muscleView.js";
import tierListView from "./views/tierListView.js";

const controlViews = async function () {
  // 0) getting id from hash. Id is an array with first part, that is muscle name and other, that is tierlist
  window.location.hash = window.location.hash.replace("%20", "");
  const id = window.location.hash.slice(1).trim().split("/");

  //1)reseting view
  tierListView.hideView();

  //Whole app view depends on hash. For now there are 3 possibilities:

  //2.1) there is no hash, muscle front and back image should be displayed
  if (id[0] === "") {
    muscleView.showMuscleImage();
    muscleView.hidePreview();
  }
  //2.2) Hash is only one element array, that means preview window should be displayed
  else if (id.length === 1) {
    muscleView.renderSpinner(document.querySelector(".mscl-prev"));
    await model.loadMuscle(id[0]);
    muscleView.render(model.state.muscle);

    muscleView.init(id[0]);
    muscleView.showPreview();
  }
  //2.3) Hash is [muscle name]/ tierlist, that means user clicked on 'go to tier list' button, and such tierlist should be displayed
  else if (id.length === 2) {
    muscleView.hideView();

    await model.loadExercises(id);

    tierListView.render(model.state.exercises);

    tierListView.init();
  }
};

const init = function () {
  //Changing hash and loading page are only cases, when something on page should change
  window.addEventListener("hashchange", controlViews);
  window.addEventListener("load", controlViews);
};
init();
