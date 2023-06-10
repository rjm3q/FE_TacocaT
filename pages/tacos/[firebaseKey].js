// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
// import viewCriticDetails from '../../api/mergeData';
// // import { viewListDetails } from '../../api/mergedData';
// // import { getListTasks } from '../../api/taskData';
// // import TaskCard from '../../components/TaskCard';

// export default function ViewTaco() {
//   const [foodDetails, setFoodDetails] = useState({});
//   const router = useRouter();

//   const { firebaseKey } = router.query;

//   // change to viewTacoDetails later
//   useEffect(() => {
//     viewCriticDetails(firebaseKey).then(setFoodDetails);
//   }, [firebaseKey]);

//   return (
//     <>
//       <div className="d-flex">
//         <div className="mt-5" />
//         <div className="d-flex flex-column text-black mt-5 details">
//           <h2>
//             {/* change passthru calls to taco versions */}
//             {foodDetails.listTitle}
//             {foodDetails.favorite}
//           </h2>
//         </div>
//       </div>
//       <br />
//       <Link href="/list/newlist" passHref>
//         <Button variant="primary">Add A List</Button>
//       </Link>
//       <div className="d-flex flex-wrap">
//         {tasks.map((task) => (
//           <TaskCard key={task.firebaseKey} taskObj={task} onUpdate={getListTasks} />
//         ))}
//       </div>
//     </>
//   )
// }
