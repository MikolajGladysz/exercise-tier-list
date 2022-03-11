import { AJAX } from "./helpers.js";

export const state = {
  muscle: {},
  exercises: {},
};

export const loadMuscle = async function (id) {
  try {
    const data = await AJAX(`./json/muscles/${id}.json`);
    state.muscle = data;
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

const createExerciseObject = function (data) {
  const exercises = [];

  //1) loop thru all data array elements
  for (let i = 0; i < data.length; i++) {
    // In my data structure, exercise has muscles array which differnt muscles names.
    // Every array has 2 value: tier (S-E) and score. The reason for this is most exercises
    //work on more then one muslce part. If you do sqats, u mainly target quadriceps but also abs and calves

    //Following this logic I want to get only score and tier of muscle, that matches id. To do it, first
    //2) stringify from json, to look matching muscle part
    const muscles = JSON.stringify(data[i].muscles).split(",");
    let muscleInfo = "";
    const id = "biceps";

    //3) search for id in muscles array, then returnig this element plus element above to have complete dataset of tier and score
    muscles.forEach((el, i) => {
      const ret =
        el.search(id) === -1
          ? ""
          : `${el.substring(id.length + 3)},${muscles[i + 1]}`;
      if (ret !== "") {
        //4) Switching to JSON after finding matching element
        muscleInfo = JSON.parse(ret);
      }
    });

    //5) creating JSON object of exercise
    exercises.push({
      difficulty: data[i].difficulty,
      name: data[i].name,
      imgUrl: data[i].imgUrl,
      isolation: data[i].isolation,
      overview: data[i].overview,
      progression: data[i].progression,
      variations: data[i].variations,
      tier: muscleInfo.tier,
      points: muscleInfo.points,
    });
  }

  return exercises;
};

export const loadExercises = async function (id) {
  try {
    //1) downloading list of exercises to avoid looping thru all exercises
    const list = await AJAX(`./json/exercises/list/biceps-list.json`);
    const exercisesArr = [];
    //2) adding all exercises from list to array
    for (let i = 0; i < list.length; i++) {
      exercisesArr.push(await AJAX(`./json/exercises/${list[i]}.json`));
    }

    //3) Setting state so other modules can use exercises data
    state.exercises = createExerciseObject(exercisesArr, id);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
