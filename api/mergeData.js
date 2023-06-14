import { getSingleCritic } from './criticData';
import { getSingleTaco } from './tacoData';

const viewCriticDetails = (criticFirebaseKey) => new Promise((resolve, reject) => {
  getSingleCritic(criticFirebaseKey)
    .then((criticObject) => {
      getSingleTaco(criticObject.taco_id)
        .then((tacoObject) => {
          resolve({ tacoObject, ...criticObject });
        });
    }).catch((error) => reject(error));
});

const viewTacoDetails = (tacoFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTaco(tacoFirebaseKey)
    .then((tacoObject) => {
      getSingleTaco(tacoObject)
        .then((criticObject) => {
          resolve({ criticObject, ...tacoObject });
        });
    }).catch((error) => reject(error));
});

// const viewTacoDetails = (tacoFirebaseKey) => new Promise((resolve, reject) => {
//   Promise.all([getSingleTaco(tacoFirebaseKey), getTacoCritic(profileFirebaseKey)])
//     .then(([profileObject, profileExpenseArray]) => {
//       resolve({ ...profileObject, expense: profileExpenseArray });
//     }).catch((error) => reject(error));
// });

export { viewTacoDetails, viewCriticDetails };
