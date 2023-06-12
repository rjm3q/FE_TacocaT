import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCritic } from '../../../api/criticData';
import CriticForm from '../../../components/forms/CriticForm';

export default function EditCritic() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCritic(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CriticForm obj={editItem} />);
}
