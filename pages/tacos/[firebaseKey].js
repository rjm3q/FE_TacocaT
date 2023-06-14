import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewTacoDetails } from '../../api/mergeData';

// import { viewListDetails } from '../../api/mergedData';
// import { getListTasks } from '../../api/taskData';
// import TaskCard from '../../components/TaskCard';

export default function ViewFood() {
  const [foodDetails, setFoodDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  // change to viewTacoDetails later
  useEffect(() => {
    viewTacoDetails(firebaseKey).then(setFoodDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-black mt-5 details">
          <h2>
            {/* change passthru calls to taco versions */}
            {foodDetails.shopeName}
            {foodDetails.ownerName}
            {foodDetails.category}
          </h2>
        </div>
      </div>
      <br />
      <Link href="/tacos/newTaco" passHref>
        <Button variant="primary">Add Food Place</Button>
      </Link>
    </>
  );
}
