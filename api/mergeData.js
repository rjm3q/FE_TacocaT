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

// const viewTacoDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleList(listFirebaseKey)
//     .then((listObject) => {
//       getSingleList(listObject.board_id)
//         .then((boardObject) => {
//           resolve({ boardObject, ...listObject });
//         });
//     }).catch((error) => reject(error));
// });

export default viewCriticDetails;
