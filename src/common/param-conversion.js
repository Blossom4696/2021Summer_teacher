import {autoCorrectRange} from "./constant";

export const convertExercise = (exercise) => {
    const {EautoCorrect} = exercise;
    exercise['EautoCorrect'] = autoCorrectRange[EautoCorrect].value;
}
