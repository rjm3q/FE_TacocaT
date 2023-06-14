import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import viewCriticDetails from '../../api/mergeData';

export default function ViewCritic() {
  const [criticDetails, setCriticDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCriticDetails(firebaseKey).then(setCriticDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-black mt-5 details">
          <h2>
            {/* change passthru calls to taco versions */}
            {criticDetails.shopeName}
            {criticDetails.ownerName}
            {criticDetails.category}
          </h2>
        </div>
      </div>
      <br />
      <Link href="/crtitcs/newCritic" passHref>
        <Button variant="primary">Add a review</Button>
      </Link>
    </>
  );
}
