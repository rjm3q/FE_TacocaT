import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTaco } from '../../../api/tacoData';
import FoodForm from '../../../components/forms/FoodForm';

export default function EditFood() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTaco(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<FoodForm obj={editItem} />);
}
