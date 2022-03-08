import { AJAX } from "./helpers.js";

export const state = {
  muscle: {},
};

const createMuscleObject = function (data) {
  const muscle = data;
  return muscle;
  // const { recipe } = data.data;
  // return {
  //   id: recipe.id,
  //   title: recipe.title,
  //   publisher: recipe.publisher,
  //   sourceUrl: recipe.source_url,
  //   image: recipe.image_url,
  //   servings: recipe.servings,
  //   cookingTime: recipe.cooking_time,
  //   ingredients: recipe.ingredients,
  //   ...(recipe.key && { key: recipe.key }),
  // };
};

export const loadMuscle = async function (id) {
  try {
    const data = await AJAX(`./json/muscles/${id}.json`);
    state.muscle = createMuscleObject(data);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
