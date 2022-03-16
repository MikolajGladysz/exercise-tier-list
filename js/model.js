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

const createExerciseObject = function (data, id) {
  const exercises = [];
  //1) loop thru all data array elements
  for (let i = 0; i < data.length; i++) {
    // In my data structure, exercise has muscles array which differnt muscles names.
    // Every array has 2 value: tier (S-E) and score. The reason for this is most exercises
    //work on more then one muslce part. If you do sqats, u mainly target quadriceps but also abs and calves

    //Following this logic I want to get only score and tier of muscle, that matches id.
    const muscleInfo = data[i].muscles[id];

    //2) creating JSON object of exercise
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
      id: data[i].id,
    });
  }

  return exercises;
};
const makeList = async () => {
  // in cmd
  // C:\Users\DELL\Documents\GitHub\recipes-mikolaj\exercise-tier-list\json\exercises
  //DIR /B /OG /ON > C:\USERS\DELL\DESKTOP\FILES.TXT

  //['barbell-curl.json', 'barbell-overhead-carry.json', 'cable-curl.json', 'cable-shrug.json', 'chin-up.json', 'concentration-curl.json', 'dumbbell-shrug.json', 'ez-bar-preacher-curl.json', 'facing-away-cable-curl.json', 'farmers-carry.json', 'kirk-shrug.json', 'one-hand-chin-up.json', 'pull-up.json', 'reverse-grip-barbell-curl.json', 'seated-barbell-curl.json', 'trap-bar-shrug.json', '']
  const files = `barbell-bench-press.json
  barbell-curl.json
  barbell-overhead-carry.json
  barbell-overhead-press.json
  barbell-row.json
  bicycle-crunch.json
  bottoms-up-kettlebell-press.json
  cable-curl.json
  cable-shrug.json
  chest-fly.json
  chin-up.json
  concentration-curl.json
  crunch.json
  deadlift.json
  dip.json
  dumbbell-bench-press.json
  dumbbell-lateral-raise.json
  dumbbell-shrug.json
  ez-bar-preacher-curl.json
  facing-away-cable-curl.json
  farmers-carry.json
  glute-bridge.json
  glute-ham-raises.json
  half-kneeling-landmine-press.json
  hip-thrust.json
  kirk-shrug.json
  landmine-row.json
  lat-pulldowns.json
  leaning-lateral-raise.json
  leg-extension.json
  leg-press.json
  leg-raises.json
  machine-fly.json
  one-hand-chin-up.json
  plank.json
  pull-up.json
  push-up.json
  reverse-grip-barbell-curl.json
  russian-twist.json
  seated-barbell-curl.json
  seated-calf-raise.json
  seated-dumbbell-shoulder-press.json
  side-leg-raises.json
  side-plank.json
  squat.json
  standing-calf-raise.json
  towel-pull-up.json
  trap-bar-shrug.json`;

  const filesarr = files.split(`
  `);
  // console.log(filesarr);
  let data = [];
  let dataEx = {};
  for (let i = 0; i < filesarr.length; i++) {
    console.log("starting" + i);
    data.push(await AJAX(`./json/exercises/${filesarr[i]}`));
    console.log(data);
  }
  data.forEach((el) => {
    Object.keys(el.muscles).forEach((e) => {
      dataEx[e] += `'${el.id}',`;
      dataEx[e].replace(`\\`, "");
    });
  });
  console.log("almost");
  console.log(dataEx);
};
export const loadExercises = async function (id) {
  // makeList();
  try {
    //1) downloading list of exercises to avoid looping thru all exercises
    const list = await AJAX(`./json/exercises/list/${id[0]}-list.json`);
    const exercisesArr = [];
    //2) adding all exercises from list to array
    for (let i = 0; i < list.length; i++) {
      exercisesArr.push(await AJAX(`./json/exercises/${list[i]}.json`));
    }
    //3) Setting state so other modules can use exercises data
    state.exercises = createExerciseObject(exercisesArr, id[0]);
  } catch (err) {
    // Temp error handling
    // console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};
